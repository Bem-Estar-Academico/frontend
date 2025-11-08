import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import formData, { type FormQuestion } from "@/routes/_app/editais/$id/-data";
import { useCallback, useState } from "react";
import { Controller, type Control } from "react-hook-form";

export function SectionForm({ control } : {control: Control<any>}) {
  const [activeTab, setActiveTab] = useState(formData.sections[0].id);

  const renderQuestion = useCallback((question: FormQuestion) => {
    switch (question.type) {  
      case "text":
      case "email":
        return (
          <Controller
            control={control}
            name={question.id}
            key={question.id}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={question.id}>
                  {question.question}
                </FieldLabel>
                <Input
                  {...field}
                  id={question.id}
                  type={question.type}
                  placeholder={question.placeholder}
                  aria-invalid={fieldState.invalid}
                  readOnly
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            control={control}
            name={question.id}
            key={question.id}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={question.id}>
                  {question.question}
                </FieldLabel>
                <Textarea
                  {...field}
                  id={question.id}
                  placeholder={question.placeholder}
                  aria-invalid={fieldState.invalid}
                  readOnly
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        );

      case "radio":
        return (
          <Controller
            control={control}
            name={question.id}
            key={question.id}
            render={({ field, fieldState }) => {
              const selectedOption = question.options?.find(
                option => option.id === field.value
              );
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={question.id}>
                    {question.question}
                  </FieldLabel>
                  <Input
                    id={question.id}
                    readOnly
                    value={selectedOption?.label || "N/A"}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        );

      case "checkbox":
        return (
          <Controller
            control={control}
            key={question.id}
            name={question.id}
            render={({ field, fieldState }) => {
              const valueSet = new Set(field.value || []);
              const selectedLabels =
                question.options
                  ?.filter(option => valueSet.has(option.id))
                  .map(option => option.label)
                  .join("\n") || "N/A";

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={question.id}>
                    {question.question}
                  </FieldLabel>
                  <Textarea
                    id={question.id}
                    readOnly
                    className="resize-none"
                    value={selectedLabels}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        );

      case "checkbox-single":
        return (
          <Controller
            control={control}
            key={question.id}
            name={question.id}
            render={({ field, fieldState }) => (
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid}
              >
                <Checkbox
                  id={question.id}
                  checked={field.value}
                  aria-invalid={fieldState.invalid}
                  disabled
                />
                <FieldLabel htmlFor={question.id} className="font-normal">
                  {question.options?.[0]?.label || question.question}
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        );

      default:
        return null;
    }
  }, [control]);

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
          {formData.sections.map((section, sectionIdx) => (
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
                {section.questions.map((question) => renderQuestion(question))}
        
              </div>
            </TabsContent>
          ))}
        </CardContent>
      </Tabs>
    </Card>
  );
}
