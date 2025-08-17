
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Target, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

interface ExecutiveSummaryProps {
  rule: any;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ rule }) => {
  const executiveSummary = `
    Ushbu qoida ${rule.title.toLowerCase()} sohasida yangi standartlarni belgilash maqsadida ishlab chiqilgan. 
    Qoidaning asosiy afzalliklari orasida atrof-muhitni muhofaza qilish, jamoat xavfsizligini ta'minlash va 
    davlat nazoratini kuchaytirish kabi muhim jihatlar mavjud. Biroq, amalga oshirishda moliyaviy yuklanish, 
    boshqaruv murakkabligi va vaqt cheklovlari kabi qiyinchiliklar yuzaga kelishi mumkin. Ushbu qoidani 
    muvaffaqiyatli amalga oshirish uchun bosqichma-bosqich yondashuv va barcha manfaatdor tomonlarning 
    faol ishtirokini ta'minlash tavsiya etiladi. Qoida umumiy jamoat manfaatlariga mos keladi va to'g'ri 
    amalga oshirilganda ijobiy natijalar beradi.
  `;

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Ijroiya xulosasi
          </CardTitle>
          <Badge variant="secondary">Executive Summary</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-800 leading-relaxed">{executiveSummary}</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-3 mt-4">
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded">
              <Target className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Maqsad</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Afzalliklar</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-yellow-50 rounded">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Xavflar</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded">
              <Lightbulb className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Tavsiyalar</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
