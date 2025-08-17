# Policy AI Frontend

A modern React-based frontend for the Policy AI platform, built with TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with shadcn/ui components
- **Authentication**: JWT-based authentication with protected routes
- **Document Upload**: Drag & drop PDF upload and URL input
- **Interactive Analysis**: Multiple view modes (List, Mind Map, AI Assistant)
- **Modal System**: Detailed rule analysis with proper state management
- **Real-time Chat**: Contextual AI assistant for document Q&A
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching
- **Lucide React** for icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 Recent Updates

### v2.0.0 (Latest)
- ✅ **Fixed Modal Behavior**: View Details modal now properly restores previous view mode
- ✅ **Improved State Management**: Better handling of view mode transitions
- ✅ **Enhanced User Experience**: Seamless navigation between different views
- ✅ **Bug Fixes**: Resolved issues with modal state management

### Modal Behavior Fix
- **Problem**: Clicking "View Details" and closing the modal would switch to AI Assistant view
- **Solution**: Implemented proper state tracking to restore the previous view mode
- **Result**: Users now stay in their original view (List/Mind Map) after closing the modal

## 🎯 Key Components

### AnalysisDashboard
- **Multiple View Modes**: List, Mind Map, AI Assistant
- **Modal Integration**: Detailed rule analysis with proper state management
- **Statistics Overview**: Rules, Pros, Cons, Improvements counters

### FileUploadSection
- **Drag & Drop**: PDF file upload
- **URL Input**: Direct URL analysis
- **Progress Indicators**: Real-time upload and analysis status

### ContextualAIAssistant
- **Real-time Chat**: Ask questions about uploaded documents
- **Predefined Questions**: Quick access to common queries
- **Citation Support**: References to source documents

### MindMapVisualization
- **Interactive SVG**: Clickable nodes for rule details
- **Visual Hierarchy**: Clear representation of policy structure
- **Responsive Design**: Adapts to different screen sizes

## 🔄 State Management

The application uses React's built-in state management with proper patterns:

```typescript
// View mode management with history
const [viewMode, setViewMode] = useState<'list' | 'mindmap' | 'assistant'>('list');
const [previousViewMode, setPreviousViewMode] = useState<'list' | 'mindmap' | 'assistant'>('list');

// Modal state management
const [selectedRule, setSelectedRule] = useState<any>(null);
```

## 🎨 UI/UX Features

- **Consistent Design**: shadcn/ui component library
- **Responsive Layout**: Mobile-first approach
- **Smooth Transitions**: CSS transitions and animations
- **Accessibility**: ARIA labels and keyboard navigation
- **Dark Mode Ready**: Theme support (can be extended)

## 🔐 Authentication Flow

1. **Login/Register**: User authentication via JWT
2. **Protected Routes**: Automatic redirection for unauthenticated users
3. **Token Management**: Automatic token refresh and logout
4. **Session Persistence**: Local storage for user sessions

## 📱 Responsive Design

- **Desktop**: Full-featured interface with all view modes
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with simplified navigation

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Efficient image handling
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: React Query for efficient data caching

## 🧪 Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔗 API Integration

The frontend communicates with the backend API at `http://localhost:8000`:

- **Authentication**: `/register`, `/token`, `/me`
- **Document Analysis**: `/analyze`, `/documents`, `/analysis/{id}`
- **AI Chat**: `/ask` for contextual Q&A

## 🐛 Troubleshooting

### Common Issues

1. **Modal not closing properly**
   - Fixed in v2.0.0 with proper state management
   - Ensure you're using the latest version

2. **View mode switching unexpectedly**
   - Now properly tracks and restores previous view modes
   - Modal interactions no longer affect view mode

3. **Authentication issues**
   - Check that the backend is running on port 8000
   - Verify JWT token is being sent in requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
