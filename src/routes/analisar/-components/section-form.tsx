import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import formData, { type FormQuestion } from "@/routes/_app/_student/-data";
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
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLabel>{question.question}</FieldLabel>
                <FieldGroup data-slot="radio-group">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {question.options?.map(option => (
                      <Field
                        key={option.id}
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <RadioGroupItem
                          id={`${question.id}-${option.id}`}
                          value={option.id}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel
                          htmlFor={`${question.id}-${option.id}`}
                          className="font-normal"
                        >
                          {option.label}
                        </FieldLabel>
                      </Field>
                    ))}
                  </RadioGroup>
                </FieldGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
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
              return (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLabel>{question.question}</FieldLabel>
                  <FieldGroup data-slot="checkbox-group">
                    {question.options?.map(option => (
                      <Field
                        key={option.id}
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <Checkbox
                          id={`${question.id}-${option.id}`}
                          checked={valueSet.has(option.id)}
                          aria-invalid={fieldState.invalid}
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
                        <FieldLabel
                          htmlFor={`${question.id}-${option.id}`}
                          className="font-normal"
                        >
                          {option.label}
                        </FieldLabel>
                      </Field>
                    ))}
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
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
                  onCheckedChange={(checked) => field.onChange(!!checked)}
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

      case "file":
        return (
          <Controller
            control={control}
            key={question.id}
            name={question.id}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={question.id}>
                  {question.question}
                </FieldLabel>
                <Input
                  id={question.id}
                  type="file"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    field.onChange(file);
                  }}
                  accept={question.accept || "application/pdf"}
                />
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
     <Tabs className="h-full" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        {formData.sections.map(section => (
          <TabsTrigger key={section.id} value={section.id}>
            {section.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {formData.sections.map((section, sectionIdx) => (
        <TabsContent value={section.id} className="mb-6 h-full overflow-scroll" key={section.id}>
          {/* Title */}
          <div className="p-4 border-b">
            <p className="text-md  font-medium">{section.title}</p>
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
     
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
