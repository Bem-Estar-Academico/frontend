import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { type Control } from "react-hook-form";
import { SectionCriteria } from "./section-criteria";
import { SectionScoresForm } from "./section-scores-form";


type EvaluationFormStep = 'CRITERIA' | 'SCORES';

export function SectionEvaluationForm({ control } : {control: Control<any>}) {
  const [activeTab, setActiveTab] = useState<EvaluationFormStep>('CRITERIA');

  return (
    <Card>
      <Tabs className="h-full" value={activeTab}>
        <CardHeader className="flex flex-wrap justify-between items-center">
          <CardTitle className="text-xl">
            Formulário de Avaliação
          </CardTitle>

          <Select value={activeTab} onValueChange={(value) => setActiveTab(value as EvaluationFormStep)} >
            <SelectTrigger className="max-w-full">
              <SelectValue placeholder="Selecione a seção"  />
            </SelectTrigger>
            <SelectContent>
                <SelectItem 
                  value={'CRITERIA'}
                >
                  Critérios de Elegibilidade
                </SelectItem>
                <SelectItem 
                  value={'SCORES'}
                >
                  Pontuações
                </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="mt-4">

            <TabsContent value={'CRITERIA'} className="mb-6 h-full overflow-auto">
                <SectionCriteria control={control} />
            </TabsContent>
            <TabsContent value={'SCORES'} className="mb-6 h-full overflow-auto">
                <SectionScoresForm control={control} />
            </TabsContent>
       
        </CardContent>
      </Tabs>
    </Card>
  );
}
