
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExecutiveSummary } from '@/components/ExecutiveSummary';
import { PolicyImprovementGenerator } from '@/components/PolicyImprovementGenerator';
import { 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  CheckCircle,
  ArrowRight,
  FileText,
  Zap
} from 'lucide-react';

interface RuleDetailModalProps {
  rule: any;
  onClose: () => void;
}

export const RuleDetailModal: React.FC<RuleDetailModalProps> = ({ rule, onClose }) => {
  return (
    <Dialog open={!!rule} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{rule.title}</DialogTitle>
          <p className="text-gray-600">{rule.description}</p>
        </DialogHeader>

        <Tabs defaultValue="analysis" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">
              <FileText className="h-4 w-4 mr-2" />
              Tahlil
            </TabsTrigger>
            <TabsTrigger value="summary">
              <FileText className="h-4 w-4 mr-2" />
              Xulosa
            </TabsTrigger>
            <TabsTrigger value="generator">
              <Zap className="h-4 w-4 mr-2" />
              Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            {/* Pros Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Advantages ({rule.pros.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rule.pros.map((pro: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{pro}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cons Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-700 flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2" />
                  Limitations & Concerns ({rule.cons.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rule.cons.map((con: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-700">{con}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvements Section */}
            {rule.improvements && rule.improvements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    AI-Generated Improvement Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {rule.improvements.map((improvement: any, index: number) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <div className="mb-3">
                          <Badge variant="destructive" className="mb-2">
                            Problem
                          </Badge>
                          <p className="text-gray-700 font-medium">{improvement.con}</p>
                        </div>
                        
                        <div>
                          <Badge variant="default" className="mb-3">
                            Solution Steps
                          </Badge>
                          <div className="space-y-2">
                            {improvement.steps.map((step: string, stepIndex: number) => (
                              <div key={stepIndex} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                  <span className="text-xs font-medium text-blue-600">
                                    {stepIndex + 1}
                                  </span>
                                </div>
                                <p className="text-gray-700">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {index < rule.improvements.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Reasoning Section */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg text-gray-700">AI Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4" />
                    <span>
                      Analyzed {rule.pros.length} positive aspects and {rule.cons.length} potential issues
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4" />
                    <span>
                      Generated {rule.improvements?.length || 0} targeted improvement strategies
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4" />
                    <span>
                      Recommendations focus on practical implementation and stakeholder impact
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <ExecutiveSummary rule={rule} />
          </TabsContent>

          <TabsContent value="generator">
            <PolicyImprovementGenerator />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
