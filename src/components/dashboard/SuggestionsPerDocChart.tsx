
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { doc: 'Hujjat 1', suggestions: 5 },
  { doc: 'Hujjat 2', suggestions: 8 },
  { doc: 'Hujjat 3', suggestions: 3 },
  { doc: 'Hujjat 4', suggestions: 12 },
  { doc: 'Hujjat 5', suggestions: 7 },
  { doc: 'Hujjat 6', suggestions: 15 },
  { doc: 'Hujjat 7', suggestions: 4 },
  { doc: 'Hujjat 8', suggestions: 9 },
];

export const SuggestionsPerDocChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Suggestions per Document</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="doc" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="suggestions" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
