
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'O\'zbek', value: 70, color: '#3b82f6' },
  { name: 'Ingliz', value: 20, color: '#10b981' },
  { name: 'Rus', value: 8, color: '#f59e0b' },
  { name: 'Boshqa', value: 2, color: '#ef4444' },
];

export const LanguageDistributionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Languages Used in Source Files</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
