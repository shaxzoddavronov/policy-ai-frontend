
import React, { useState, useEffect } from 'react';
import { FileUploadSection } from '@/components/FileUploadSection';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { Header } from '@/components/Header';
import { FileText, Brain, Network } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/utils/api';

const Index = () => {
  console.log('Rendering Index page');
  const { token } = useAuth();
  const [uploadedDocument, setUploadedDocument] = useState<any>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null);

  // Restore analysis state from localStorage when component mounts
  useEffect(() => {
    const savedAnalysis = localStorage.getItem('currentAnalysis');
    const savedDocumentId = localStorage.getItem('currentDocumentId');
    const savedUploadedDocument = localStorage.getItem('currentUploadedDocument');
    
    if (savedAnalysis && savedDocumentId) {
      try {
        setAnalysisData(JSON.parse(savedAnalysis));
        setDocumentId(savedDocumentId);
        if (savedUploadedDocument) {
          setUploadedDocument(JSON.parse(savedUploadedDocument));
        }
        console.log('Restored analysis state from localStorage');
      } catch (error) {
        console.error('Error restoring analysis state:', error);
        // Clear corrupted data
        localStorage.removeItem('currentAnalysis');
        localStorage.removeItem('currentDocumentId');
        localStorage.removeItem('currentUploadedDocument');
      }
    }
  }, []);

  // Save analysis state to localStorage whenever it changes
  useEffect(() => {
    if (analysisData && documentId) {
      localStorage.setItem('currentAnalysis', JSON.stringify(analysisData));
      localStorage.setItem('currentDocumentId', documentId);
      if (uploadedDocument) {
        localStorage.setItem('currentUploadedDocument', JSON.stringify(uploadedDocument));
      }
    }
  }, [analysisData, documentId, uploadedDocument]);

  const handleDocumentUpload = async (document: any) => {
    console.log('handleDocumentUpload called', document);
    setUploadedDocument(document);
    setIsAnalyzing(true);

    let formData = new FormData();
    if (document instanceof File) {
      formData.append("file", document);
    } else if (document.url) {
      formData.append("url", document.url);
    }

    try {
      const analysis = await api.analyzeDocument(formData);
      console.log('ANALYZE RESPONSE:', analysis);
      setAnalysisData(analysis);
      setUploadedDocument(document);
      
      // Get the latest document ID from /documents endpoint
      try {
        const documents = await api.getDocuments();
        if (documents && documents.length > 0) {
          // Get the most recent document (first in the list)
          const latestDocument = documents[0];
          setDocumentId(latestDocument.document_id.toString());
          console.log('Set documentId from /documents:', latestDocument.document_id);
        } else {
          console.warn('No documents found after analysis');
          setDocumentId(null);
        }
      } catch (error) {
        console.error('Error fetching document ID:', error);
        setDocumentId(null);
      }
      
      console.log('Analysis data received', analysis);
    } catch (error) {
      console.error('Error in handleDocumentUpload', error);
      alert("Error analyzing document: " + error);
    } finally {
      setIsAnalyzing(false);
      console.log('handleDocumentUpload finished');
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setUploadedDocument(null);
    setDocumentId(null);
    // Clear localStorage
    localStorage.removeItem('currentAnalysis');
    localStorage.removeItem('currentDocumentId');
    localStorage.removeItem('currentUploadedDocument');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!analysisData ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Brain className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                AI Policy Analysis Platform
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload government documents or regulations to get instant AI-powered analysis 
                with pros, cons, and improvement recommendations in Uzbek language.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Upload Documents</h3>
                <p className="text-gray-600 text-sm">
                  Drag & drop PDF files or paste URLs to policy documents
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Brain className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI Analysis in Uzbek</h3>
                <p className="text-gray-600 text-sm">
                  Extract key rules, analyze pros/cons, and generate improvements in Uzbek
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Network className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Visual Insights</h3>
                <p className="text-gray-600 text-sm">
                  Interactive mind maps and detailed analysis views
                </p>
              </div>
            </div>

            <FileUploadSection 
              onDocumentUpload={handleDocumentUpload}
              isAnalyzing={isAnalyzing}
            />
          </div>
        ) : (
          <AnalysisDashboard 
            data={analysisData}
            documentId={documentId}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
