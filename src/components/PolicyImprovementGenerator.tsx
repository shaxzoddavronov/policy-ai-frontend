
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Upload, FileText, Users, Scale, Target } from 'lucide-react';

export const PolicyImprovementGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [generatedPolicy, setGeneratedPolicy] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImprovedPolicy = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const improvedPolicy = {
        title: "Yaxshilangan siyosat taklifi",
        objective: `Bu siyosat taklifining asosiy maqsadi quyidagi masalalarni hal etishdir:
        • Joriy qoidalardagi kamchiliklarni bartaraf etish
        • Samaradorlikni oshirish va xarajatlarni kamaytirish  
        • Barcha manfaatdor tomonlar uchun adolatli yechimlar yaratish
        • Zamonaviy texnologiyalardan foydalanish imkoniyatlarini kengaytirish`,
        
        implementationSteps: [
          "Boshlang'ich tahlil va manfaatdor tomonlar bilan maslahatlashuvlar o'tkazish",
          "Qonuniy bazani tayyarlash va tegishli o'zgartirishlar kiritish",
          "Pilot loyihalar orqali sinovdan o'tkazish",
          "Kadrlarni tayyorlash va texnik ta'minot",
          "Bosqichma-bosqich joriy etish va monitoring",
          "Yakuniy baholash va kerakli tuzatishlar kiritish"
        ],
        
        legalReferences: [
          "O'zbekiston Respublikasi Konstitutsiyasi 50-modda",
          "Davlat boshqaruvi to'g'risidagi qonun",
          "Ijtimoiy sheriklik to'g'risidagi qonun",
          "Raqamlashtirish sohasidagi normativ hujjatlar"
        ],
        
        pros: [
          "Boshqaruv samaradorligining oshishi",
          "Fuqarolar uchun xizmatlar sifatining yaxshilanishi", 
          "Korrupsiya xavflarining kamayishi",
          "Shaffoflik va javobgarlikning kuchayishi",
          "Zamonaviy texnologiyalarning joriy etilishi"
        ],
        
        cons: [
          "Dastlabki moliyaviy xarajatlarning yuqoriligi",
          "Kadrlarni qayta tayyorlash zaruriyati",
          "O'zgarishlarga qarshilik ko'rsatish ehtimoli",
          "Texnik murakkabliklar va xavfsizlik masalalari"
        ],
        
        stakeholderImpact: {
          citizens: "Fuqarolar uchun xizmatlar osonlashadi va sifati yaxshilanadi",
          government: "Davlat organlarining ish samaradorligi oshadi",
          business: "Biznes uchun yangi imkoniyatlar va osonlashtirilgan tartiblar",
          civilSociety: "Fuqarolik jamiyatining nazorat va ishtirok imkoniyatlari kengayadi"
        }
      };
      
      setGeneratedPolicy(improvedPolicy);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          Siyosat Yaxshilash Generatori
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Siyosat muammosini kiriting yoki zaif loyiha yuklang - yaxshilangan taklif oling
        </p>
      </CardHeader>
      <CardContent>
        {!generatedPolicy ? (
          <div className="space-y-4">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Siyosat muammosini yoki mavjud loyiha matnini bu yerga yozing..."
              className="min-h-32"
            />
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={generateImprovedPolicy}
                disabled={!inputText.trim() || isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  "Yaxshilangan siyosat taklifi tayyorlanmoqda..."
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Yaxshilangan taklif yaratish
                  </>
                )}
              </Button>
              
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Fayl yuklash
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{generatedPolicy.title}</h3>
              <Button variant="outline" onClick={() => setGeneratedPolicy(null)}>
                Yangi taklif yaratish
              </Button>
            </div>

            <Tabs defaultValue="objective" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="objective">Maqsad</TabsTrigger>
                <TabsTrigger value="steps">Bosqichlar</TabsTrigger>
                <TabsTrigger value="legal">Huquqiy</TabsTrigger>
                <TabsTrigger value="proscons">Tahlil</TabsTrigger>
                <TabsTrigger value="stakeholders">Ta'sir</TabsTrigger>
                <TabsTrigger value="summary">Xulosa</TabsTrigger>
              </TabsList>

              <TabsContent value="objective" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Target className="h-5 w-5 mr-2" />
                      Siyosat maqsadi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line text-gray-700">{generatedPolicy.objective}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="steps" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Amalga oshirish bosqichlari</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {generatedPolicy.implementationSteps.map((step: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="legal" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="h-5 w-5 mr-2" />
                      Huquqiy asoslar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {generatedPolicy.legalReferences.map((ref: string, index: number) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">
                          {ref}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="proscons" className="mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-green-700">Afzalliklar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {generatedPolicy.pros.map((pro: string, index: number) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{pro}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-red-700">Qiyinchiliklar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {generatedPolicy.cons.map((con: string, index: number) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{con}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="stakeholders" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="h-5 w-5 mr-2" />
                      Manfaatdor tomonlarga ta'sir
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded">
                        <h4 className="font-semibold text-blue-700 mb-2">Fuqarolar</h4>
                        <p className="text-sm text-gray-700">{generatedPolicy.stakeholderImpact.citizens}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <h4 className="font-semibold text-green-700 mb-2">Davlat</h4>
                        <p className="text-sm text-gray-700">{generatedPolicy.stakeholderImpact.government}</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded">
                        <h4 className="font-semibold text-yellow-700 mb-2">Biznes</h4>
                        <p className="text-sm text-gray-700">{generatedPolicy.stakeholderImpact.business}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded">
                        <h4 className="font-semibold text-purple-700 mb-2">Fuqarolik jamiyati</h4>
                        <p className="text-sm text-gray-700">{generatedPolicy.stakeholderImpact.civilSociety}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Yakuniy xulosalar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Ushbu yaxshilangan siyosat taklifi mavjud muammolarni hal etish va 
                        barcha manfaatdor tomonlar uchun ijobiy natijalar yaratish maqsadida 
                        ishlab chiqilgan. Taklifni muvaffaqiyatli amalga oshirish uchun 
                        bosqichma-bosqich yondashuv va doimiy monitoring zarur.
                      </p>
                      <div className="flex space-x-2">
                        <Button>PDF yuklab olish</Button>
                        <Button variant="outline">Word formatida</Button>
                        <Button variant="outline">Ulashish</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
