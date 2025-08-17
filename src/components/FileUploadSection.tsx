
import React, { useState, useCallback } from 'react';
import { Upload, Link, FileText, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FileUploadSectionProps {
  onDocumentUpload: (document: any) => void;
  isAnalyzing: boolean;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({ 
  onDocumentUpload, 
  isAnalyzing 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        onDocumentUpload(file);
      }
    }
  }, [onDocumentUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        onDocumentUpload(file);
      }
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onDocumentUpload({ url: urlInput, name: "Document from URL" });
      setUrlInput('');
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold mb-2">Analyzing Document</h3>
          <p className="text-gray-600 mb-4">
            Our AI is processing your document and extracting key policy information...
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Document uploaded successfully</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Extracting rules and regulations...</span>
            </div>
            <div className="flex items-center justify-center space-x-2 opacity-50">
              <span className="h-4 w-4 rounded-full border-2 border-gray-300"></span>
              <span>Generating pros and cons analysis...</span>
            </div>
            <div className="flex items-center justify-center space-x-2 opacity-50">
              <span className="h-4 w-4 rounded-full border-2 border-gray-300"></span>
              <span>Creating improvement recommendations...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload PDF</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-center space-x-3">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-600">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">Ready for analysis</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drop your PDF here</h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse your files
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button asChild>
                      <span>Choose File</span>
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports PDF files up to 50MB
                  </p>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Link className="h-5 w-5 text-gray-400" />
                <Input
                  placeholder="https://example.gov/policy-document.pdf"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Button 
                onClick={handleUrlSubmit} 
                disabled={!urlInput.trim()}
                className="w-full"
              >
                Analyze from URL
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Enter a direct link to a PDF document or web page
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
