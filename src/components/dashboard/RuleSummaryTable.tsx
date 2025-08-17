
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

import { api } from '@/utils/api';

interface DocumentSummaryTableProps {
  onSelectionChange: (selectedIds: string[]) => void;
  selectedDocuments: string[];
}

export const RuleSummaryTable: React.FC<DocumentSummaryTableProps> = ({
  onSelectionChange,
  selectedDocuments
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await api.getTableRules();
        if (mounted) setDocuments(data || []);
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to load documents');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);
  
  const itemsPerPage = 5;

  const filteredDocuments = documents.filter(document =>
    document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    const direction = sortDirection === 'asc' ? 1 : -1;
    return aValue < bValue ? -direction : direction;
  });

  const paginatedDocuments = sortedDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.max(1, Math.ceil(sortedDocuments.length / itemsPerPage));

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Document Summaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Document Summaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-red-600">{error}</div>
        </CardContent>
      </Card>
    );
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectRule = (ruleId: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedDocuments, ruleId]
      : selectedDocuments.filter(id => id !== ruleId);
    onSelectionChange(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? paginatedDocuments.map(rule => rule.id) : [];
    onSelectionChange(newSelection);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Ijobiy': return 'bg-green-100 text-green-800';
      case 'Salbiy': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Document Summaries</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={paginatedDocuments.length > 0 && paginatedDocuments.every(rule => selectedDocuments.includes(rule.id))}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('title')}
              >
                Document Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('topic')}
              >
                Topic {sortField === 'topic' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('sector')}
              >
                Sector {sortField === 'sector' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Complexity</TableHead>
              <TableHead>Sentiment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocuments.map((rule) => (
              <TableRow key={rule.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedDocuments.includes(rule.id)}
                    onCheckedChange={(checked) => handleSelectRule(rule.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">{rule.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{rule.topic}</Badge>
                </TableCell>
                <TableCell>{rule.sector}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{rule.complexity}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getSentimentColor(rule.sentiment)}>
                    {rule.sentiment}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedDocuments.length)} of {sortedDocuments.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
