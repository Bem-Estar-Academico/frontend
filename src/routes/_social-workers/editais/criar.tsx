import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Control, type ControllerRenderProps } from "react-hook-form"
import { z } from "zod"
import { createFileRoute } from "@tanstack/react-router"

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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { YearSelect } from "@/components/ui/year-select"
import { DatePicker } from "@/components/ui/date-picker"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/coordinator/sidebar"
import { Label } from "@/components/ui/label"

const allUsers = [
  { id: 1, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 1" },
  { id: 2, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 2" },
  { id: 3, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 3" },
  { id: 4, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 4" },
  { id: 5, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 5" },
  { id: 6, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 6" },
]

const availableBenefits = [
  { id: "auxilio_alimentacao", label: "Auxílio Alimentação" },
  { id: "auxilio_moradia", label: "Auxílio Moradia" },
  { id: "auxilio_creche", label: "Auxílio Creche" },
  { id: "bolsa_pro_graduando", label: "Bolsa Pró-Graduando" },
]

const editalSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  year: z.string({ required_error: "O ano de vigencia é obrigatório" }),

  coordinators: z.array(z.number()).min(1, "Selecione ao menos um coordenador."),
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
  (data) =>
    !data.preliminaryResult || !data.applicationEnd || data.preliminaryResult > data.applicationEnd,
  {
    path: ["preliminaryResult"],
    message: "O resultado preliminar deve ocorrer após o fim das inscrições.",
  }
)
.refine(
  (data) =>
    !data.appealStart || !data.preliminaryResult || data.appealStart > data.preliminaryResult,
  {
    path: ["appealStart"],
    message: "O início dos recursos deve ser após o resultado preliminar.",
  }
)
.refine(
  (data) =>
    !data.appealEnd || !data.appealStart || data.appealEnd > data.appealStart,
  {
    path: ["appealEnd"],
    message: "O fim dos recursos deve ser após o início dos recursos.",
  }
)
.refine(
  (data) =>
    !data.finalResult || !data.appealEnd || data.finalResult > data.appealEnd,
  {
    path: ["finalResult"],
    message: "O resultado final deve ocorrer após o término dos recursos.",
  }
)

type EditalFormData = z.infer<typeof editalSchema>

export const Route = createFileRoute("/_social-workers/editais/criar")({
  component: CreateEdital,
})

function CreateEdital() {
  const form = useForm<EditalFormData>({
    resolver: zodResolver(editalSchema),
    defaultValues: {
      title: "",
      coordinators: [],
      social_workers: [],
      benefit: [],
    },
  })
  
  function onSubmit(data: EditalFormData) {
    console.log("Dados do formulário válidos:", data)
  }


  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex flex-col w-full max-w-full bg-gray-100">
        <div className="px-4 my-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/editais/criar">Editais</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Criar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Separator />

        <div className="flex flex-col w-full h-full max-w-full gap-5 px-5 py-4">
          <h2 className="text-2xl font-medium px-1">Criar Edital</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 py-4 w-full flex flex-col gap-6">
              {/* Seção 1: Informações do Edital */}
              <div className="bg-white p-6 rounded-md border">
                <h3 className="text-lg font-medium py-2">Informações do Edital</h3>
                <div className="grid grid-cols-4 gap-8 mt-4">
                  <div className="flex flex-col gap-8 h-fit">
                    <FormField
                      control={form.control}
                      name={'title'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel isRequired>Título do Edital</FormLabel>
                          <FormControl>
                            <Input placeholder="ex.: Cadastramento Socioeconômico 2025" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel isRequired>Ano de vigência</FormLabel>
                          <FormControl>
                            <YearSelect value={field.value} onChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <Label className="font-medium py-2" isRequired>Benefícios Ofertados</Label>
                    <div className="flex flex-col gap-6 py-2">
                      <BenefitsList control={form.control} availableBenefits={availableBenefits} />
                    </div>
                  </div>
  
                  <div className="col-span-2 grid grid-cols-3 gap-6 py-2">
                    <DatePickerField isRequired control={form.control} name="applicationStart" title="Início das Inscrições" />
                    <DatePickerField control={form.control} name="applicationEnd" title="Término das Inscrições" />
                    <DatePickerField control={form.control} name="preliminaryResult" title="Resultado Preliminar" />
                    <DatePickerField control={form.control} name="appealStart" title="Início da Fase de Recursos" />
                    <DatePickerField control={form.control} name="appealEnd" title="Término da Fase de Recursos" />
                    <DatePickerField control={form.control} name="finalResult" title="Resultado Final" />
                  </div>
             
                </div>
              </div>

              {/* Seção 2: Equipe */}
              <div className='bg-white p-6 rounded-md border'>
                <h3 className="text-lg font-medium py-2">Equipe Responsável</h3>
                <div className="grid gap-6 py-2">
                  <UserListField control={form.control} name="coordinators" title="Coordenadores" allUsers={allUsers} />
                  <UserListField control={form.control} name="social_workers" title="Assistentes Sociais" allUsers={allUsers} />
                </div>
              </div>
            
              <div className="flex justify-end">
                <Button type="submit">Salvar</Button>
              </div> 
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

type UserListFieldProps = {
  control: Control<EditalFormData>
  name: 'coordinators' | 'social_workers'
  title: string
  allUsers: { id: number; name: string; img: string }[]
}

function UserListField({ control, name, title, allUsers }: Readonly<UserListFieldProps>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedUsers = allUsers.filter(u => field.value.includes(u.id))
        return (
          <FormItem>
            <FormControl>
              <UsersList
                title={title}
                list={selectedUsers}
                allUsers={allUsers}
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
  )
}

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

function BenefitsList({ control, availableBenefits }: { control: Control<EditalFormData>; availableBenefits: { id: string; label: string }[] }) {
  return (
    <FormField
      control={control}
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
  );
}
