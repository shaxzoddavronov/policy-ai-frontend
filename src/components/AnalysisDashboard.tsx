
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MindMapVisualization } from '@/components/MindMapVisualization';
import { RuleDetailModal } from '@/components/RuleDetailModal';
import { ContextualAIAssistant } from '@/components/ContextualAIAssistant';
import { 
  ArrowLeft, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb,
  Network,
  List,
  MessageCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalysisDashboardProps {
  data: any;
  onReset: () => void;
  documentId: string | null;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ data, documentId, onReset }) => {
  console.log('AnalysisDashboard data:', data);
  console.log('AnalysisDashboard documentId:', documentId);
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'mindmap' | 'assistant'>('list');
  const [previousViewMode, setPreviousViewMode] = useState<'list' | 'mindmap' | 'assistant'>('list');

  // Function to handle opening the modal
  const handleOpenModal = (rule: any) => {
    setPreviousViewMode(viewMode); // Store current view mode
    setSelectedRule(rule);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedRule(null);
    setViewMode(previousViewMode); // Restore previous view mode
  };

  // Function to handle view mode changes
  const handleViewModeChange = (newViewMode: 'list' | 'mindmap' | 'assistant') => {
    setViewMode(newViewMode);
    // Only update previous view mode if we're not in a modal
    if (!selectedRule) {
      setPreviousViewMode(newViewMode);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onReset}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className="text-gray-600">{data.summary}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'assistant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleViewModeChange('assistant')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            AI Yordamchi
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleViewModeChange('list')}
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
          <Button
            variant={viewMode === 'mindmap' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleViewModeChange('mindmap')}
          >
            <Network className="h-4 w-4 mr-2" />
            Mind Map
          </Button>
        </div>
      </div>

      {/* Analysis Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Rules Found</p>
                <p className="text-2xl font-bold">{data.rules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Pros</p>
                <p className="text-2xl font-bold">
                  {data.rules.reduce((acc: number, rule: any) => acc + rule.pros.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Total Cons</p>
                <p className="text-2xl font-bold">
                  {data.rules.reduce((acc: number, rule: any) => acc + rule.cons.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Improvements</p>
                <p className="text-2xl font-bold">
                  {data.rules.reduce((acc: number, rule: any) => acc + rule.improvements.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Categorization */}
      {data.categorization && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Document Categorization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-6 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 font-medium mb-1">Topic</p>
                <p className="text-sm font-semibold text-blue-800">{data.categorization.topic || 'N/A'}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-600 font-medium mb-1">Title</p>
                <p className="text-sm font-semibold text-green-800">{data.categorization.title || 'N/A'}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-600 font-medium mb-1">Sector</p>
                <p className="text-sm font-semibold text-purple-800">{data.categorization.sector || 'N/A'}</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-orange-600 font-medium mb-1">Complexity</p>
                <p className="text-sm font-semibold text-orange-800">{data.categorization.complexity || 'N/A'}</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-xs text-red-600 font-medium mb-1">Sentiment</p>
                <p className="text-sm font-semibold text-red-800">{data.categorization.sentiment || 'N/A'}</p>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <p className="text-xs text-indigo-600 font-medium mb-1">Category</p>
                <p className="text-sm font-semibold text-indigo-800">{data.categorization.category || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      {viewMode === 'list' ? (
        <div className="space-y-6">
          {data.rules.map((rule: any) => (
            <Card key={rule.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{rule.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{rule.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenModal(rule)}
                  >
                    View Details
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pros */}
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Pros ({rule.pros.length})
                    </h4>
                    <div className="space-y-2">
                      {rule.pros.slice(0, 2).map((pro: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{pro}</p>
                        </div>
                      ))}
                      {rule.pros.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{rule.pros.length - 2} more advantages
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cons */}
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Cons ({rule.cons.length})
                    </h4>
                    <div className="space-y-2">
                      {rule.cons.slice(0, 2).map((con: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{con}</p>
                        </div>
                      ))}
                      {rule.cons.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{rule.cons.length - 2} more limitations
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Improvement Preview */}
                {rule.improvements.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-blue-700 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Improvement Strategies Available
                      </h4>
                      <Badge variant="secondary">
                        {rule.improvements.length} suggestions
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : viewMode === 'mindmap' ? (
        <Card>
          <CardContent className="p-6">
            <MindMapVisualization 
              data={data} 
              onNodeClick={(node) => {
                handleOpenModal(node);
              }}
            />
          </CardContent>
        </Card>
      ) : (
        viewMode === 'assistant' && documentId ? (
          <Card>
            <CardContent className="p-6">
              <ContextualAIAssistant rule={selectedRule || data.rules[0]} documentId={documentId} />
            </CardContent>
          </Card>
        ) : viewMode === 'assistant' ? (
          <Card>
            <CardContent className="p-6 text-red-600">
              Hujjat ID topilmadi. Iltimos, hujjatni qayta yuklang.
            </CardContent>
          </Card>
        ) : null
      )}

      {/* Rule Detail Modal */}
      {selectedRule && (
        <RuleDetailModal
          rule={selectedRule}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
