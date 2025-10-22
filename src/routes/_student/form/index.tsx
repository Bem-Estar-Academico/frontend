import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { GalleryVerticalEnd } from "lucide-react";
import { useState, type ChangeEvent, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import formData, { type FormQuestion, type FormOption } from "./-data";
import { formSchema, getInitialValues, type FormValues } from "./-schema";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const Route = createFileRoute("/_student/form/")({
  component: StudentRegistrationForm,
});

export function StudentRegistrationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
  })
  const formValues = useWatch({ control: form.control });
  const [activeTab, setActiveTab] = useState(formData.sections[0].id);

  const isQuestionAnswered = (question: FormQuestion): boolean => {
    const value = formValues[question.id as keyof FormValues];
    
    if (!question.required) return true;
    
    switch (question.type) {
      case "text":
      case "email":
      case "textarea":
        return typeof value === "string" && value.trim().length > 0;
      case "radio":
        return typeof value === "string" && value.length > 0;
      case "checkbox":
        return Array.isArray(value) && value.length > 0;
      case "checkbox-single":
        return value === true;
      case "file":
        return value instanceof File;
      default:
        return false;
    }
  };

  const sectionProgress = useMemo(() => {
    return formData.sections.map(section => {
      const requiredQuestions = section.questions.filter(q => q.required);
      const totalRequired = requiredQuestions.length;
      const answeredRequired = requiredQuestions.filter(q => isQuestionAnswered(q)).length;
      
      return {
        sectionId: section.id,
        answered: answeredRequired,
        total: totalRequired,
        percentage: totalRequired > 0 ? Math.round((answeredRequired / totalRequired) * 100) : 100
      };
    });
  }, [formValues]);

  function renderQuestion(question: FormQuestion) {
    switch (question.type) {
      case "text":
      case "email":
        return (
          <FormField
            control={form.control}
            name={question.id}
            key={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.question}</FormLabel>
                <FormControl>
                  <Input placeholder={question.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "textarea":
        return (
          <FormField
            control={form.control}
            name={question.id}
            key={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.question}</FormLabel>
                <FormControl>
                  <Textarea placeholder={question.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "radio":
          return (
            <FormField
              control={form.control}
              name={question.id}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{question.question}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {question.options?.map(option => (
                          <FormItem className="flex items-center space-x-3 space-y-0" key={option.id}>
                            <FormControl>
                              <RadioGroupItem value={option.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label} {option.id}
                            </FormLabel>
                          </FormItem>
                        ))}
                      
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          )
      case "checkbox":
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => {
              const valueSet = new Set(field.value || []);
              return (
                <FormItem className="space-y-3">
                  <FormLabel>{question.question}</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      {question.options?.map(option => (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={option.id}>
                          <FormControl>
                            <Checkbox
                              checked={valueSet.has(option.id)}
                              onCheckedChange={(checked) => {
                                const newValue = new Set(valueSet);
                                if (checked) {
                                  newValue.add(option.id);
                                } else {
                                  newValue.delete(option.id);
                                }
                                field.onChange(Array.from(newValue));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label} {option.id}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        );
      case "checkbox-single":
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{question.question}</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                    {question.options && (
                      <FormLabel className="font-normal">
                        {question.options[0].label} {question.options[0].id}
                      </FormLabel>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "file":
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{question.question}</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      field.onChange(file);
                    }}
                    accept={question.accept || "application/pdf"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  }

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    toast.error("Por favor, verifique as seções e corrija os erros no formulário antes de enviar.");
  };

  return (
    <div className="flex h-full">
      {/* SIDEBAR */}
      <div className="flex flex-col h-full w-64 border-r">
        <div className="flex items-center gap-2 p-4">
          <div className="bg-primary rounded-lg p-2">
            <GalleryVerticalEnd className="text-secondary size-4" />
          </div>
          <p className="text-xs font-semibold">
            Cadastramento
            <br />
            Socioeconômico - 2025.1
          </p>
        </div>

        <div className="flex flex-col gap-2 pr-2">
          {formData.sections.map((section, idx) => {
            const progress = sectionProgress.find(p => p.sectionId === section.id);
            const isComplete = progress?.percentage === 100;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex flex-col gap-2 p-2 pl-3 min-h-12 border rounded-tr-md rounded-br-md transition 
                  ${
                    activeTab === section.id
                      ? "bg-blue-100"
                      : "bg-card hover:bg-slate-100"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs text-left max-w-40">{section.title}</p>
                  <div className={`flex items-center justify-center size-6 rounded-full ${
                    isComplete ? "bg-green-500 text-white" : "bg-slate-300"
                  }`}>
                    <p className="text-xs font-bold">{idx + 1}</p>
                  </div>
                </div>
                
                {/* Barra de progresso */}
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isComplete ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${progress?.percentage || 0}%` }}
                  />
                </div>
                
                {/* Texto do progresso */}
                <p className="text-[10px] text-gray-500 text-left">
                  {progress?.answered}/{progress?.total} respondidas
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* TABS */}
      <Form {...form}>
        <form className="flex-1 h-full " onSubmit={form.handleSubmit(onSubmit, onError)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {formData.sections.map((section, sectionIdx) => (
            <TabsContent value={section.id} className="mb-6" key={section.id}>
              {/* Title */}
              <div className="p-4 border-b">
                <p className="text-md font-medium">{section.title}</p>
              </div>

              {/* Description */}
              {section.description && (
                <div className="p-4">
                  <p className="text-xs font-[400] text-gray-500">
                    {section.description}
                  </p>
                </div>
              )}
            
              {/* Form Content */}
              <div className="overflow-auto max-h-full grid grid-cols-2 px-8 py-4 gap-8">
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
                {section.questions.map((question) => renderQuestion(question))}

                {/* Botão de Envio */}
                {sectionIdx === formData.sections.length - 1 && (
                  <div className="col-span-2 flex justify-end pt-8">
                    <Button type="submit">
                      Enviar Cadastro
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </form>
      </Form>
    </div>
  );
}