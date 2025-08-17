const API_BASE_URL = 'http://localhost:8000';

// Cache for API responses
const apiCache = new Map<string, { data: any; timestamp: number; ttl: number }>();

// Request deduplication
const pendingRequests = new Map<string, Promise<any>>();

// Cache TTL in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// Helper function to generate cache key
const generateCacheKey = (endpoint: string, params?: any): string => {
  if (params) {
    return `${endpoint}:${JSON.stringify(params)}`;
  }
  return endpoint;
};

// Helper function to get cached data
const getCachedData = (key: string): any | null => {
  const cached = apiCache.get(key);
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data;
  }
  if (cached) {
    apiCache.delete(key); // Remove expired cache
  }
  return null;
};

// Helper function to set cached data
const setCachedData = (key: string, data: any, ttl: number = CACHE_TTL): void => {
  apiCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  });
};

// Helper function to clear cache
const clearCache = (pattern?: string): void => {
  if (pattern) {
    // Clear cache entries matching pattern
    for (const key of apiCache.keys()) {
      if (key.includes(pattern)) {
        apiCache.delete(key);
      }
    }
  } else {
    // Clear all cache
    apiCache.clear();
  }
};

export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle token expiry
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth';
        throw new Error('Session expired. Please log in again.');
      }
      
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // Enhanced request with caching and deduplication
  async cachedRequest(endpoint: string, options: RequestInit = {}, ttl?: number) {
    const cacheKey = generateCacheKey(endpoint, options);
    
    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    
    // Check if request is already pending
    if (pendingRequests.has(cacheKey)) {
      return pendingRequests.get(cacheKey);
    }
    
    // Make the request
    const requestPromise = this.request(endpoint, options);
    pendingRequests.set(cacheKey, requestPromise);
    
    try {
      const data = await requestPromise;
      // Cache the successful response
      setCachedData(cacheKey, data, ttl);
      return data;
    } finally {
      // Remove from pending requests
      pendingRequests.delete(cacheKey);
    }
  },

  // Authentication endpoints
  async login(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    return response.json();
  },

  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name?: string;
  }) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Document analysis
  async analyzeDocument(formData: FormData) {
    const token = localStorage.getItem('token');
    console.log('analyzeDocument called, token:', token ? 'present' : 'missing');
    
    if (!token) {
      throw new Error('No authentication token found. Please log in first.');
    }
    
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('analyzeDocument error:', response.status, errorData);
      throw new Error(errorData.detail || `Document analysis failed: ${response.status}`);
    }

    const result = await response.json();
    
    // Clear cache after new analysis to ensure fresh data
    clearCache('dashboard_analytics');
    
    return result;
  },

  // Chat/RAG
  async askQuestion(documentId: number, question: string) {
    return this.request('/ask', {
      method: 'POST',
      body: JSON.stringify({
        document_id: documentId,
        question: question,
      }),
    });
  },

  // Get user documents
  async getDocuments() {
    return this.cachedRequest('/documents', {}, 2 * 60 * 1000); // 2 minutes cache
  },

  // Get analysis by document ID
  async getAnalysis(documentId: number) {
    return this.cachedRequest(`/analysis/${documentId}`, {}, 5 * 60 * 1000); // 5 minutes cache
  },

  // Get current user info
  async getCurrentUser() {
    return this.cachedRequest('/me', {}, 10 * 60 * 1000); // 10 minutes cache
  },

  // Dashboard analytics for Interactive Charts (with aggressive caching)
  async getDashboardAnalytics() {
    return this.cachedRequest('/analytics/dashboard', {}, 5 * 60 * 1000); // 5 minutes cache
  },

  // Data Tables endpoints (with caching)
  async getTableDocuments() {
    return this.cachedRequest('/tables/documents', {}, 5 * 60 * 1000);
  },
  async getTableRules() {
    return this.cachedRequest('/tables/rules', {}, 5 * 60 * 1000);
  },
  async getTableProCons() {
    return this.cachedRequest('/tables/procons', {}, 5 * 60 * 1000);
  },

  // Merge analysis across multiple documents
  async mergeAnalysis(documentIds: number[]) {
    return this.request('/merge-analysis', {
      method: 'POST',
      body: JSON.stringify({ document_ids: documentIds }),
    });
  },

  // Cache management
  clearCache,
  getCachedData,
  setCachedData,
  
  // Get cache statistics
  getCacheStats() {
    return {
      size: apiCache.size,
      keys: Array.from(apiCache.keys()),
      pendingRequests: pendingRequests.size
    };
  }
}; 