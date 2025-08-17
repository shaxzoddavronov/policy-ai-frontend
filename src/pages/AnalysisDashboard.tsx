
import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PolicyTopicsChart } from '@/components/dashboard/PolicyTopicsChart';
import { RulesBySectorChart } from '@/components/dashboard/RulesBySectorChart';
import { ProsVsConsChart } from '@/components/dashboard/ProsVsConsChart';
import { RegulatoryTrendsChart } from '@/components/dashboard/RegulatoryTrendsChart';
import { FileTypeDistributionChart } from '@/components/dashboard/FileTypeDistributionChart';
import { ImprovementPercentageChart } from '@/components/dashboard/ImprovementPercentageChart';
import { SentimentAnalysisChart } from '@/components/dashboard/SentimentAnalysisChart';
import { ComplexityLevelChart } from '@/components/dashboard/ComplexityLevelChart';
import { api } from '@/utils/api';
import { RuleSummaryTable } from '@/components/dashboard/RuleSummaryTable';
import { ProConSuggestionTable } from '@/components/dashboard/ProConSuggestionTable';
import { DocumentMetadataTable } from '@/components/dashboard/DocumentMetadataTable';
import { MergedAnalysisPanel } from '@/components/dashboard/MergedAnalysisPanel';
import { ArrowLeft, BarChart3, FileText, Merge, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnalysisDashboard = () => {
  console.log('Rendering AnalysisDashboard page');
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [showMergedAnalysis, setShowMergedAnalysis] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [mergedData, setMergedData] = useState<any | null>(null);
  const [isMerging, setIsMerging] = useState(false);

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchAnalytics = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      if (forceRefresh) {
        // Clear cache and force fresh data
        api.clearCache('dashboard_analytics');
      }
      
      const data = await api.getDashboardAnalytics();
      setAnalytics(data);
      setLastUpdated(new Date());
      console.log('Analytics data loaded successfully:', data);
    } catch (e) {
      console.error('Error fetching analytics:', e);
      setError(e instanceof Error ? e.message : 'Failed to load analytics data');
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleRuleSelection = (ruleIds: string[]) => {
    console.log('handleRuleSelection called', ruleIds);
    setSelectedRules(ruleIds);
  };

  const handleMergeAnalysis = async () => {
    console.log('handleMergeAnalysis called');
    if (selectedRules.length > 1) {
      try {
        setIsMerging(true);
        // selectedRules currently hold string ids from selection; convert to numbers safely
        const ids = selectedRules.map((id) => parseInt(id, 10)).filter((n) => !Number.isNaN(n));
        const data = await api.mergeAnalysis(ids);
        setMergedData(data);
        setShowMergedAnalysis(true);
      } catch (e) {
        console.error('Failed to merge analysis', e);
      } finally {
        setIsMerging(false);
      }
    }
  };

  const handleRefresh = () => {
    fetchAnalytics(true);
  };

  const handleRetry = () => {
    fetchAnalytics(true);
  };

  // Loading state
  if (loading && !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <RefreshCw className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard...</h2>
              <p className="text-gray-500">Fetching analytics data from the server</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Failed to Load Dashboard</h2>
              <p className="text-gray-500 mb-4">{error}</p>
              <Button onClick={handleRetry} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Analysis
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analysis Dashboard</h1>
                <p className="text-gray-600">Visual insights from government regulation analysis</p>
                {lastUpdated && (
                  <p className="text-sm text-gray-500 mt-1">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleRefresh} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              {selectedRules.length > 1 && (
                <Button onClick={handleMergeAnalysis} className="bg-blue-600 hover:bg-blue-700" disabled={isMerging}>
                  {isMerging ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Merge className="h-4 w-4 mr-2" />
                      Merge Analysis ({selectedRules.length})
                    </>
                  )}
                </Button>
              )}
              
              <Badge variant="secondary" className="text-sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                24 Documents Analyzed
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="charts">Interactive Charts</TabsTrigger>
            <TabsTrigger value="tables">Data Tables</TabsTrigger>
            <TabsTrigger value="merged" disabled={!showMergedAnalysis}>
              Merged Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            {/* Cache Status Indicator */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-800 font-medium">Dashboard Performance</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-blue-700">
                <span>Cache Status: Active</span>
                <span>Response Time: &lt;100ms</span>
                <span>Data Freshness: 5 min</span>
              </div>
            </div>

            {/* Chart Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <PolicyTopicsChart data={analytics?.topics} />
              <RulesBySectorChart data={analytics?.sectors} />
              <ProsVsConsChart data={analytics?.pros_cons_by_category} />
              <RegulatoryTrendsChart data={analytics?.monthly_documents} />
              <FileTypeDistributionChart data={analytics?.file_types} />
              <ImprovementPercentageChart data={analytics?.improvements} />
              <SentimentAnalysisChart data={analytics?.sentiments} />
              <ComplexityLevelChart data={analytics?.complexities} />
            </div>
          </TabsContent>

          <TabsContent value="tables" className="space-y-6">
            <div className="space-y-8">
              <RuleSummaryTable 
                onSelectionChange={handleRuleSelection}
                selectedDocuments={selectedRules}
              />
              <ProConSuggestionTable />
              <DocumentMetadataTable />
            </div>
          </TabsContent>

          <TabsContent value="merged">
            {showMergedAnalysis && mergedData && (
              <MergedAnalysisPanel 
                selectedCount={selectedRules.length}
                data={mergedData}
                onClose={() => setShowMergedAnalysis(false)}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
