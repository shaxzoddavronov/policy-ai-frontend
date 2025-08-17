
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { range: '0-20%', count: 2 },
  { range: '21-40%', count: 5 },
  { range: '41-60%', count: 8 },
  { range: '61-80%', count: 7 },
  { range: '81-100%', count: 2 },
];

export const AdoptionPotentialChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Adoption Potential Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
