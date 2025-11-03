import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import formData, { type FormQuestion } from "./-data";
import { formSchema, getInitialValues, type FormValues } from "./-schema";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createStudentRegistrationMutationOptions } from "@/mutations/create-student-registration";
import { CreateStudentRegistrationFormSidebar } from "./-sidebar";
import { editalQueryOptions } from "@/queries/edital";


export const Route = createFileRoute("/_app/editais/$id/inscricao")({
    component: () => (
    <>
      <title>Questionário | BEA</title>
      <StudentRegistrationForm/>
    </>
  ),
});

export function StudentRegistrationForm() {

  const { id } = Route.useParams()
  const { data: edital } = useSuspenseQuery(editalQueryOptions(Number(id)));
  const { mutateAsync } = useMutation(createStudentRegistrationMutationOptions);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
  })  
  const navigate = useNavigate()


  const [activeTab, setActiveTab] = useState("1");

  const beneficiosSection = useMemo(() => {
    if (!edital) return undefined;

    const options: Array<{ id: string; label: string }> = [];

    if (edital.food_allowance) {
      options.push({ id: 'food_allowance', label: 'Auxílio Alimentação' });
    }
    if (edital.housing_allowance) {
      options.push({ id: 'housing_allowance', label: 'Auxílio Moradia' });
    }
    if (edital.daycare_allowance) {
      options.push({ id: 'daycare_allowance', label: 'Auxílio Creche' });
    }
    if (edital.graduation_scholarship) {
      options.push({ id: 'graduation_scholarship', label: 'Bolsa de Graduação' });
    }

    if (options.length === 0) return undefined;

    return {
      id: 'beneficios',
      title: 'Benefícios',
      description: 'Selecione os benefícios que deseja solicitar (apenas os oferecidos pelo edital).',
      questions: [
        ({
          id: 'requested_benefits',
          type: 'checkbox',
          required: true,
          question: 'Quais benefícios deseja solicitar?',
          options,
        } as FormQuestion),
      ],
    };
  }, [edital]);

  const renderQuestion = useCallback((question: FormQuestion) => {
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
                <FormLabel isRequired={question.required}>{question.question}</FormLabel>
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
                <FormLabel isRequired={question.required}>{question.question}</FormLabel>
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
              key={question.id}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel isRequired={question.required}>{question.question}</FormLabel>
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
                              {option.label}
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
            key={question.id}
            name={question.id}
            render={({ field }) => {
              const valueSet = new Set(field.value || []);
              return (
                <FormItem className="space-y-3">
                  <FormLabel isRequired={question.required}>{question.question}</FormLabel>
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
                            {option.label}
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
            key={question.id}
            name={question.id}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel isRequired={question.required}>{question.question}</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                    {question.options && (
                      <FormLabel className="font-normal">
                        {question.options[0].label}
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
            key={question.id}
            name={question.id}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel isRequired={question.required}>{question.question}</FormLabel>
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
  }, [form])

  useEffect(() => {
    form.setValue("has_food_allowance", edital.food_allowance);
    form.setValue("has_housing_allowance", edital.housing_allowance);
    form.setValue("has_daycare_allowance", edital.daycare_allowance);
    form.setValue("has_graduation_scholarship", edital.graduation_scholarship);
    }, [edital, form]);


  const onSubmit = async (values: FormValues) => {
    try {
      const requested_benefits = (values.requested_benefits || []) as Array<string>;
      const data = {
        answer: values,
        requested_food_allowance: requested_benefits.includes('food_allowance'),
        requested_housing_allowance: requested_benefits.includes('housing_allowance'),
        requested_daycare_allowance: requested_benefits.includes('daycare_allowance'),
        requested_graduation_scholarship: requested_benefits.includes('graduation_scholarship'),
      }
      await mutateAsync({ editalId: Number.parseInt(id), data});

      toast.success("Inscrição realizada com sucesso!")
      navigate({ to: "/" });
    } catch(error: any) {
      console.error(error);
      toast.error("Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente.");
    }
  };

  const onError = (errors: any) => {
    console.log(errors);
    toast.error("Por favor, verifique as seções e corrija os erros no formulário antes de enviar.");
  };

  return (
    <div className="flex h-full">
      {/* SIDEBAR */}
      <CreateStudentRegistrationFormSidebar 
        title={edital.title} 
        activeTab={activeTab} 
        form={form} 
        changeTab={setActiveTab}
        beneficiosSection={beneficiosSection}
      />

      {/* TABS */}
      <Form {...form}>
        <form className="flex-1 h-full " onSubmit={form.handleSubmit(onSubmit, onError)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>

          {/* Benefícios tab (render only if edital offers any) */}
          {beneficiosSection && (
            <TabsContent value={beneficiosSection.id} className="mb-6">
              <div className="p-4 border-b">
                <p className="text-md font-medium">{beneficiosSection.title}</p>
              </div>
              {beneficiosSection.description && (
                <div className="p-4">
                  <p className="text-xs font-[400] text-gray-500">{beneficiosSection.description}</p>
                </div>
              )}

              <div className="overflow-auto max-h-full grid grid-cols-2 px-8 py-4 gap-8">
                {beneficiosSection.questions.map((question) => renderQuestion(question))}
              </div>
            </TabsContent>
          )}

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

export default StudentRegistrationForm;