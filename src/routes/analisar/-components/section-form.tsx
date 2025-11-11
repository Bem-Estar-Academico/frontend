import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import formData, { type FormQuestion } from "@/routes/_app/editais/$id/-data";
import { useCallback, useState } from "react";
import { type Control } from "react-hook-form";

export function SectionForm({ answer } : {control: Control<any>, answer: any}) {
  const [activeTab, setActiveTab] = useState(formData.sections[0].id);

  const renderAnswer = useCallback((question: FormQuestion) => {
    switch (question.type) {  
      case "text":
      case "email":
      case "textarea":
        return (
           <div className="space-y-2">
              <Label className="text-muted-foreground">{question.question}</Label>
              <p className="text-sm font-medium text-card-foreground">{answer[question.id]}</p>
            </div>
        );

      case "radio": {
        const selectedOption = question.options?.find(
          option => option.id === answer[question.id]
        );
        return (
          <div className="space-y-2">
            <Label className="text-muted-foreground">{question.question}</Label>
            <p className="text-sm font-medium text-card-foreground">{selectedOption?.label || "N/A"}</p>
          </div>
        );
      }

      case "checkbox": {
        const valueSet = new Set(answer[question.id] || []);
        const selectedLabels =
          question.options
            ?.filter(option => valueSet.has(option.id))
            .map(option => option.label)
            .join(", ") || "N/A";

        return (
          <div className="space-y-2">
            <Label className="text-muted-foreground">{question.question}</Label>
            <p className="text-sm font-medium text-card-foreground">{selectedLabels}</p>
          </div>
        );
      }

      case "checkbox-single": {
        const isChecked = !!answer[question.id];
        return (
          <div className="space-y-2">
            <Label className="text-muted-foreground">{question.question}</Label>
            <p className="text-sm font-medium text-card-foreground">{isChecked
              ? question.options?.[0]?.label || "Marcado"
              : "Não marcado"}
            </p>
          </div>
        );
      }

      default:
        return null;
    }
  }, [answer]);

  return (
    <Card>
      <Tabs className="h-full" value={activeTab} onValueChange={setActiveTab}>
        <CardHeader className="flex flex-wrap gap-2 justify-between items-center">
          <CardTitle className="text-xl">
            Inscrição do Estudante
          </CardTitle>
  
          <Select value={activeTab} onValueChange={setActiveTab} >
            <SelectTrigger className="max-w-full">
              <SelectValue placeholder="Selecione a seção"  />
            </SelectTrigger>
            <SelectContent>
              {formData.sections.map(section => (
                <SelectItem 
                  key={section.id} 
                  value={section.id}
                  onClick={() => setActiveTab(section.id)}
                >
                  {section.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <CardDescription>
            {formData.sections.find(section => section.id === activeTab)?.description}
          </CardDescription> */}
        
        </CardHeader>
        <CardContent className="mt-6">
          {formData.sections.map((section) => (
            <TabsContent value={section.id} className="mb-6 h-full overflow-auto" key={section.id}>

              {/* Description */}
              {/* {section.description && (
                <div className="p-4">
                  <p className="text-xs font-[400] text-gray-500">
                    {section.description}
                  </p>
                </div>
              )} */}
            
              {/* Form Content */}
              <div className="overflow-auto max-h-full grid grid-cols-2 gap-8">
                {/* Alert */}
                {section.alert && (
                  <div className={`col-span-2 ${
                    section.alert.type === 'warning' 
                    ? 'bg-red-50 border-red-200'
                    : 'bg-blue-50 border-blue-200'
                  } border p-3 rounded-md`}>
                    <p className={`text-sm font-medium ${
                      section.alert.type === 'warning' 
                        ? 'text-red-800' 
                        : 'text-blue-800'
                    }`}>
                      {section.alert.title}
                    </p>
                    <p className={`text-xs ${
                      section.alert.type === 'warning' 
                        ? 'text-red-700' 
                        : 'text-blue-700'
                    }`}>
                      {section.alert.message}
                    </p>
                  </div>
                )}

                {/* Questions */}
                {section.questions.map((question) => renderAnswer(question))}
        
              </div>
            </TabsContent>
          ))}
        </CardContent>
      </Tabs>
    </Card>
  );
}
