
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/utils/api';

// API URL for the backend
const API_URL = 'http://localhost:8000/ask';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citation?: string;
}

interface ContextualAIAssistantProps {
  rule: any;
  documentId: string | null;
}

export const ContextualAIAssistant: React.FC<ContextualAIAssistantProps> = ({ rule, documentId }) => {
  console.log('Rendering ContextualAIAssistant for rule', rule);
  console.log('ContextualAIAssistant documentId:', documentId);
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQuestions = [
    "Bu qoidadagi asosiy muammolar nima?",
    "Qisqacha xulosani nuqtalar ko'rinishida bering",
    "Bu qoidani qanday yaxshilash mumkin?",
    "Qoidaning ijobiy tomonlari qanday?",
    "Amalga oshirishda qanday qiyinchiliklar bo'ladi?"
  ];
  
  // Function to fetch response from the backend
  const fetchResponse = async (question: string): Promise<{ content: string; citation: string }> => {
    if (!documentId) {
      return {
        content: "Hujjat ID topilmadi. Iltimos, hujjatni qayta yuklang.",
        citation: "Xatolik"
      };
    }
    if (!rule || !rule.id) {
      console.error('No rule or rule.id available for /ask request');
      return {
        content: "Qoidaning ID-si topilmadi. Iltimos, avval qoidani tanlang yoki hujjatni qayta yuklang.",
        citation: "Xatolik"
      };
    }
    console.log('Sending /ask request with document_id:', documentId);
    try {
      console.log('Request payload:', { document_id: documentId, question });
      
      const data = await api.askQuestion(parseInt(documentId), question);
      console.log('Response data:', data);
      
      return {
        content: data.answer,
        citation: data.citation || 'Document analysis'
      };
    } catch (error) {
      console.error('Error fetching response:', error);
      return {
        content: `Kechirasiz, savolingizga javob berishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring. Error: ${error.message}`,
        citation: "Xatolik"
      };
    }
  };

  const handleSendMessage = async () => {
    console.log('handleSendMessage called with inputMessage:', inputMessage);
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    const questionText = inputMessage;
    setInputMessage('');

    try {
      const response = await fetchResponse(questionText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        citation: response.citation
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Kechirasiz, savolingizga javob berishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.',
        timestamp: new Date(),
        citation: 'Xatolik'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedQuestion = (question: string) => {
    console.log('handlePredefinedQuestion called with question:', question);
    setInputMessage(question);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Kontekstual AI Yordamchi
        </CardTitle>
        <p className="text-gray-600 text-sm">Bu qoida haqida savollar bering</p>
      </CardHeader>
      <CardContent>
        {/* Predefined Questions */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Tez-tez beriladigan savollar:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePredefinedQuestion(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.type === 'assistant' && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                  {message.type === 'user' && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    {message.citation && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Manba: {message.citation}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm">Javob tayyorlanmoqda...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Savolingizni yozing..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
