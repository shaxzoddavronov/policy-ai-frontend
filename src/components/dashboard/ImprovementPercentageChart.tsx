
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type ImprovementDatum = { with: number; without: number };

export const ImprovementPercentageChart: React.FC<{ data?: ImprovementDatum }> = ({ data = { with: 0, without: 0 } }) => {
  const chartData = useMemo(() => [
    { name: 'Yaxshilanish bilan', value: data.with, color: '#10b981' },
    { name: 'Yaxshilanishsiz', value: data.without, color: '#ef4444' },
  ], [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rules with Actionable Improvements</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
