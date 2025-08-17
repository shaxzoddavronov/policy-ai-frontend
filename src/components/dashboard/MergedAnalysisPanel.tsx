import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, TrendingDown, Lightbulb, BarChart3 } from 'lucide-react';

interface MergedAnalysisData {
  combined_pros: string[];
  combined_cons: string[];
  overlapping_issues: string[];
  combined_improvements: string[];
}

interface MergedAnalysisPanelProps {
  selectedCount: number;
  data: MergedAnalysisData;
  onClose: () => void;
}

export const MergedAnalysisPanel: React.FC<MergedAnalysisPanelProps> = ({
  selectedCount,
  data,
  onClose
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <BarChart3 className="h-6 w-6 mr-2" />
                Merged Analysis Results
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Combined analysis of {selectedCount} selected documents
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-700 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Combined Advantages ({data.combined_pros.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.combined_pros.map((pro, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{pro}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-700 flex items-center">
              <TrendingDown className="h-5 w-5 mr-2" />
              Combined Limitations ({data.combined_cons.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.combined_cons.map((con, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{con}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-orange-700">
            Overlapping Issues & Common Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {data.overlapping_issues.map((issue, index) => (
              <div key={index} className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <p className="text-gray-700">{issue}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-700 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            Shared Improvement Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.combined_improvements.map((strategy, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {index + 1}
                  </span>
                </div>
                <p className="text-gray-700">{strategy}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
