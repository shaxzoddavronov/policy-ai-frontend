
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type ProsConsDatum = { category: string; pros: number; cons: number };

export const ProsVsConsChart: React.FC<{ data?: ProsConsDatum[] }> = ({ data = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pros vs Cons by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pros" fill="#10b981" />
            <Bar dataKey="cons" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
