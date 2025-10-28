import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Control, type ControllerRenderProps } from "react-hook-form"
import { z } from "zod"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useMutation, useQuery } from "@tanstack/react-query"

import { UsersList } from "@/components/users-list"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { createNoticeMutationOptions } from "@/mutations/create-notice"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { usersQueryOptions } from "@/queries/users"
import type { CreateNoticeDTO } from "@/types/create-notice-dto"
import { Spinner } from "@/components/ui/spinner"

const PLACEHOLDER_IMAGE = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"

const availableBenefits = [
  { id: "auxilio_alimentacao", label: "Auxílio Alimentação" },
  { id: "auxilio_moradia", label: "Auxílio Moradia" },
  { id: "auxilio_creche", label: "Auxílio Creche" },
  { id: "bolsa_pro_graduando", label: "Bolsa Pró-Graduando" },
]

const editalSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),

  social_workers: z.array(z.number()),

  benefit: z.array(z.string()).min(1, "Selecione ao menos um benefício."),
  applicationStart: z.date({
    required_error: "Selecione uma data de início para o edital.",
  }),
  applicationEnd: z.date().optional(),
  preliminaryResult: z.date().optional(),
  appealStart: z.date().optional(),
  appealEnd: z.date().optional(),
  finalResult: z.date().optional(),
})
.refine(
  (data) => !data.applicationEnd || data.applicationStart < data.applicationEnd,
  {
    path: ["applicationEnd"],
    message: "A data de término deve ser posterior à data de início.",
  }
)
.refine(
  (data) => !data.preliminaryResult || !data.applicationEnd || data.preliminaryResult > data.applicationEnd,
  {
    path: ["preliminaryResult"],
    message: "O resultado preliminar deve ocorrer após o fim das inscrições.",
  }
)
.refine(
  (data) => !data.appealStart || !data.preliminaryResult || data.appealStart > data.preliminaryResult,
  {
    path: ["appealStart"],
    message: "O início dos recursos deve ser após o resultado preliminar.",
  }
)
.refine(
  (data) => !data.appealEnd || !data.appealStart || data.appealEnd > data.appealStart,
  {
    path: ["appealEnd"],
    message: "O fim dos recursos deve ser após o início dos recursos.",
  }
)
.refine(
  (data) => !data.finalResult || !data.appealEnd || data.finalResult > data.appealEnd,
  {
    path: ["finalResult"],
    message: "O resultado final deve ocorrer após o término dos recursos.",
  }
)

type EditalFormData = z.infer<typeof editalSchema>

export const Route = createFileRoute("/_app/_coordinator/editais/criar")({
 
  component: () => (
    <>
      <title>Criar Edital | BEA</title>
      <CreateEdital/>
    </>
  ),
})

function CreateEdital() {
  const navigate = useNavigate()

  const onSuccess = (noticeId: number) => {
    toast.success("Edital criado com sucesso!")
    navigate({ to: `/editais/${noticeId}` })
  }
  
  const form = useForm<EditalFormData>({
    resolver: zodResolver(editalSchema),
    defaultValues: {
      title: "",
      description: "",
      social_workers: [],
      benefit: [],
    },
  })

  const createNoticeMutation = useMutation(createNoticeMutationOptions)
  
  async function onSubmit(values: EditalFormData) {
    try {
      const payload: CreateNoticeDTO = {
        title: values.title,
        registration_start_date: values.applicationStart.toISOString(),
        registration_end_date: values.applicationEnd?.toISOString(),
        appeal_start_date: values.appealStart?.toISOString(),
        appeal_end_date: values.appealEnd?.toISOString(),
        preliminary_result_date: values.preliminaryResult?.toISOString(),
        final_result_date: values.finalResult?.toISOString(),
        description: values.description,
        food_allowance: values.benefit.includes("auxilio_alimentacao"),
        housing_allowance: values.benefit.includes("auxilio_moradia"),
        daycare_allowance: values.benefit.includes("auxilio_creche"),
        graduation_scholarship: values.benefit.includes("bolsa_pro_graduando"),
        team_members: values.social_workers
      }

      const createdNotice = await createNoticeMutation.mutateAsync(payload)
      onSuccess(createdNotice.id)
      
    } catch (error: any) {
      const errorMessage = getCreationErrorMessage(error)
      
      toast.error('Erro ao criar edital', {
        description: errorMessage,
      })
    }
  }

  const { data: socialWorkers } = useQuery(usersQueryOptions({ user_type: "SOCIAL_WORKER" }))

  const formattedSocialWorkers = socialWorkers?.map(user => ({
    id: user.id,
    name: user.full_name,
    img: PLACEHOLDER_IMAGE
  })) || []

  return (
      <div className="flex flex-col w-full h-full max-w-full">
        <h1 className="font-bold text-2xl mb-6">Editais</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
            {/* Seção 1: Informações do Edital */}
            <div className="bg-white p-6 rounded-md border">
              <h3 className="text-lg font-medium py-2">Informações do Edital</h3>
              <div className="grid grid-cols-2 gap-8 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Título do Edital</FormLabel>
                      <FormControl>
                        <Input placeholder="ex.: Cadastramento Socioeconômico 2025.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="row-start-2 row-span-2">
                  <Label className="font-medium py-2" isRequired>Benefícios Ofertados</Label>
                  <div className="flex flex-col gap-6 py-2">
                        <FormField
                          control={form.control}
                          name="benefit"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex flex-col gap-4 pb-2">
                                {availableBenefits.map((item) => (
                                  <CheckboxItem key={item.id} item={item} field={field} />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                  </div>
                </div>
                
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel isRequired>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva o objetivo do edital..." 
                            className="resize-none"
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div> 

              <div className="col-span-2 grid grid-cols-3 gap-6 mt-10 py-2">
                <DatePickerField isRequired control={form.control} name="applicationStart" title="Início das Inscrições" />
                <DatePickerField control={form.control} name="applicationEnd" title="Término das Inscrições" />
                <DatePickerField control={form.control} name="preliminaryResult" title="Resultado Preliminar" />
                <DatePickerField control={form.control} name="appealStart" title="Início da Fase de Recursos" />
                <DatePickerField control={form.control} name="appealEnd" title="Término da Fase de Recursos" />
                <DatePickerField control={form.control} name="finalResult" title="Resultado Final" />
              </div>
            </div>

            {/* Seção 2: Equipe */}
            <div className='bg-white p-6 rounded-md border'>
              <h3 className="text-lg font-medium py-2">Equipe Responsável</h3>
              <div className="grid gap-6 py-2">
                <FormField
                  control={form.control}
                  name="social_workers"
                  render={({ field }) => {
                    const selectedUsers = formattedSocialWorkers.filter(u => field.value.includes(u.id))
                    return (
                      <FormItem>
                        <FormControl>
                          <UsersList
                            title={"Assistentes Sociais"}
                            list={selectedUsers}
                            allUsers={formattedSocialWorkers}
                            allowEdit={true}
                            onSelect={(user) => field.onChange([...field.value, user.id])}
                            onDelete={(id) => field.onChange(field.value.filter((uid: number) => uid !== id))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>
           
            <Button type="submit" className="self-end w-3xs" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Spinner />}
              {form.formState.isSubmitting ? "Criando Edital..." : "Criar Edital"}
            </Button>     
          </form>
        </Form>
      </div>
   
  )
}

  {/* <div className="p-4 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/editais">Editais</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Criar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}


function DatePickerField({ control, name, title, isRequired }: Readonly<{ control: Control<EditalFormData>; name: 
  | "applicationStart"
  | "applicationEnd"
  | "preliminaryResult"
  | "appealStart"
  | "appealEnd"
  | "finalResult"
  ; title: string; isRequired?: boolean}>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DatePicker isRequired={isRequired} title={title} value={field.value} onChange={field.onChange}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function CheckboxItem({ item, field }: Readonly<{ item: { id: string, label: string }, field: ControllerRenderProps<EditalFormData, "benefit">}>) {
  return (
    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value?.includes(item.id)}
          onCheckedChange={(checked) =>
            checked
              ? field.onChange([...field.value, item.id])
              : field.onChange(field.value?.filter((v: string) => v !== item.id))
          }
        />
      </FormControl>
      <FormLabel className="font-normal">{item.label}</FormLabel>
    </FormItem>
  )
}


function getCreationErrorMessage(error: any): string {
  const status = error.response?.status

  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.response?.data?.detail && typeof error.response.data.detail === "string") {
    return error.response.data.detail
  }
  
  if (status === 400) {
    return "Dados inválidos. Verifique se todos os campos foram preenchidos corretamente."
  }
  if (status === 409) {
    return "Já existe um edital com este título e ano. Escolha um título ou ano diferente."
  }
  if (status === 401 || status === 403) {
    return "Você não tem permissão para criar editais."
  }

  return "Erro ao criar o edital. Por favor, tente novamente ou contate um administrador."
}
