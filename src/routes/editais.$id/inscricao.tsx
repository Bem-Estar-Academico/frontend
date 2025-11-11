import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createStudentRegistrationMutationOptions } from "@/mutations/create-student-registration";
import { editalQueryOptions } from "@/queries/edital";
import { api } from "@/api";
import { formSchema, type FormValues, getInitialValues } from "../_app/editais/$id/-schema";
import formData, { type FormQuestion }  from "../_app/editais/$id/-data";
import { studentRegistrationsQueryOptions } from "@/queries/student-registrations";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudentFormSidebar } from "./-app-sidebar";
import { Link } from "@tanstack/react-router";
import { IconArrowLeft } from "@tabler/icons-react";
import { Spinner } from "@/components/ui/spinner";


export const Route = createFileRoute("/editais/$id/inscricao")({
  beforeLoad: async ({context: { queryClient }, params }) => {
    const { id } = params;
    const edital = await queryClient.ensureQueryData(editalQueryOptions(Number(id)));
    const studentRegistration = await queryClient.ensureQueryData(studentRegistrationsQueryOptions());

    if (studentRegistration.some(reg => reg.notice.id === edital.id)) {
      toast.info("Você já está inscrito neste edital.");
      throw redirect({ to: "/editais" });
    }

    const now = new Date();
    const startDate = new Date(edital.registration_start_date);
    const endDate = new Date(edital.registration_end_date);
    const isRegistrationOpen = now >= startDate && now <= endDate;

    if (!isRegistrationOpen && edital.registration_end_date) {
      toast.error("As inscrições para este edital estão fechadas.");
      throw redirect({
        to: "/editais/$id",
        params: { id: id },
      });
    }

  },
  component: () => (
    <>
      <title>Questionário | BEA</title>
      <StudentRegistrationForm/>
    </>
  ),
});

export function StudentRegistrationForm() {

  const { id } = Route.useParams();
  const { data: edital } = useSuspenseQuery(editalQueryOptions(Number(id)));

  const { mutateAsync: createStudentRegistration } = useMutation(createStudentRegistrationMutationOptions);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
  })  
  const navigate = useNavigate();

  console.log("edital no form:", form.getValues());

  const [activeTab, setActiveTab] = useState("beneficios");

  const beneficiosSection = useMemo(() => {
    console.log("edital no beneficiosSection:", edital);
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
            name={`files.${question.id}`}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel isRequired={question.required}>{question.question}</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    ref={field.ref}
                    name={field.name}
                    onBlur={field.onBlur}
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
    form.reset({
      ...form.getValues(),
      has_food_allowance: edital.food_allowance,
      has_housing_allowance: edital.housing_allowance,
      has_daycare_allowance: edital.daycare_allowance,
      has_graduation_scholarship: edital.graduation_scholarship,
    });
  }, [edital, form]);

  const onSubmit = async (values: FormValues) => {
   
    try {
      const requested_benefits = (values.requested_benefits || []) as Array<string>;
      const {files, ...answer} = values;
      const data = {
        answer,
        requested_food_allowance: requested_benefits.includes('food_allowance'),
        requested_housing_allowance: requested_benefits.includes('housing_allowance'),
        requested_daycare_allowance: requested_benefits.includes('daycare_allowance'),
        requested_graduation_scholarship: requested_benefits.includes('graduation_scholarship'),
      }

      const registration = await createStudentRegistration({ editalId: Number.parseInt(id), data});

      if (files) {
        const uploadPromises = Object.keys(files).map((key) => {
          const formData = new FormData();
          
          // Renomeia o arquivo com base na chave
          const originalFile = files[key];
          const fileExtension = originalFile.name.split('.').pop();
          const newFileName = `${key}.${fileExtension}`;
          const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });
          
          formData.append("file", renamedFile);
          formData.append("description", key);
          return api.post(`/student-documents/registration/${registration.id}/upload`, formData);
        });
        await Promise.all(uploadPromises);
      }

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

  const currentSection = (formData.sections.find(section => section.id === activeTab) || beneficiosSection) as typeof formData.sections[0];

  const isSubmitting = form.formState.isSubmitting;
  return (
   <SidebarProvider>
      <StudentFormSidebar  
      title={edital.title} 
        activeTab={activeTab} 
        form={form} 
        changeTab={setActiveTab}
        beneficiosSection={beneficiosSection}
        editalId={Number(id)} />
      <SidebarInset>  
      {/* SIDEBAR */}
      {/* TABS */}
      <Form {...form}>
        <Header title={currentSection?.title} description={currentSection?.description} />
        <form className="flex-1 h-full " onSubmit={form.handleSubmit(onSubmit, onError)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Benefícios tab (render only if edital offers any) */}
          {beneficiosSection && (
            <TabsContent value={beneficiosSection.id} className="mb-6">
              <div className="overflow-auto max-h-full grid grid-cols-2 px-8 py-4 gap-8">
                {beneficiosSection.questions.map((question) => renderQuestion(question))}
              </div>
            </TabsContent>
          )}

          {formData.sections.map((section, sectionIdx) => (
            <TabsContent value={section.id} className="mb-6" key={section.id}>
              {/* Form Content */}
              <div className="overflow-auto max-h-full grid md:grid-cols-2 px-8 py-4 gap-8">
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
                    <Button disabled={isSubmitting} type="button" onClick={onSubmit}>
                      {isSubmitting && <Spinner className='size-12' />}
                      {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </form>
      </Form>
      </SidebarInset>
   </SidebarProvider>
  );
}

interface HeaderProps {
  title: string;
  description?: string;
}

function Header({ title }: HeaderProps) {
  const { id } = Route.useParams();
  return (
    <div className="p-4 border-b flex items-center justify-between md:justify-start gap-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Button variant={'ghost'} asChild>
          <Link to="/editais/$id" params={{ id }}>
            <IconArrowLeft size={18} /> Voltar
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2 ml-6">
        <p className="text-md md:text-lg font-semibold">Seção {title}</p>
        {/* {description && <p className="text-sm text-gray-500">{description}</p>} */}
      </div>
    </div>
  )
}

export default StudentRegistrationForm;