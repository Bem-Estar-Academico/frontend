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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
  number: z.string().min(1, "O número do edital é obrigatório."),
  year: z.string({ required_error: "O ano de vigencia é obrigatório" }),

  coordinators: z.array(z.number()).min(1, "Selecione ao menos um coordenador."),
  social_workers: z.array(z.number()),

  benefit: z.array(z.string()).min(1, "Selecione ao menos um benefício."),
    dates: z.object({
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
})

type EditalFormData = z.infer<typeof editalSchema>

export const Route = createFileRoute("/editais/criar")({
  component: CreateEdital,
})

function CreateEdital() {
  const form = useForm<EditalFormData>({
    resolver: zodResolver(editalSchema),
    defaultValues: {
      title: "",
      number: "",
      coordinators: [],
      social_workers: [],
      benefit: [],
    },
  })

  function onSubmit(data: EditalFormData) {
    console.log("Dados do formulário válidos:")
    console.log(data)
  }

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex flex-col w-full max-w-full bg-gray-100">
        <div className="px-4 mt-4">
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

        <Separator className="my-4" />

        <div className="w-full max-w-full gap-6 px-5 py-4">
          <h2 className="text-2xl font-medium px-1 mb-6">Criar Edital</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white px-4 py-4 w-full border rounded-xl">
              <Tabs defaultValue="1">
                <TabsList className="gap-2 px-1">
                  <TabsTrigger value="1">Identificação</TabsTrigger>
                  <TabsTrigger value="2">Equipe</TabsTrigger>
                  <TabsTrigger value="3">Benefícios</TabsTrigger>
                  <TabsTrigger value="4">Prazos</TabsTrigger>
                </TabsList>

                {/* Aba 1: Identificação */}
                <TabsContent value="1" className="px-2">
                  <div className="grid gap-6 py-2">
                    <InputField control={form.control} name="title" label="Título do Edital" placeholder="ex.: Cadastramento Socioeconômico 2025" />
                    <InputField control={form.control} name="number" label="Número do Edital" placeholder="ex.: Edital nº 05/2025" />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano de vigência</FormLabel>
                          <FormControl>
                            <YearSelect value={field.value} onChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Aba 2: Equipe */}
                <TabsContent value="2" className="px-2 flex flex-col gap-6">
                  <UserListField control={form.control} name="coordinators" title="Coordenadores" allUsers={allUsers} />
                  <UserListField control={form.control} name="social_workers" title="Assistentes Sociais" allUsers={allUsers} />
                </TabsContent>

                {/* Aba 3: Benefícios */}
                <TabsContent value="3" className="px-2">
                  <div className="text-lg font-medium py-2">Benefícios Ofertados</div>
                  <BenefitsList control={form.control} availableBenefits={availableBenefits} />
                </TabsContent>

                {/* Aba 4: Prazos */}
                <TabsContent value="4" className="px-2">
                  <div className="text-lg font-medium py-2">Período e Prazos</div>
                  <div className="grid grid-cols-3 gap-6 py-2">
                    <DatePickerField control={form.control} name="dates.applicationStart" title="Início das Inscrições" />
                    <DatePickerField control={form.control} name="dates.applicationEnd" title="Término das Inscrições" />
                    <DatePickerField control={form.control} name="dates.preliminaryResult" title="Resultado Preliminar" />
                    <DatePickerField control={form.control} name="dates.appealStart" title="Início da Fase de Recursos" />
                    <DatePickerField control={form.control} name="dates.appealEnd" title="Término da Fase de Recursos" />
                    <DatePickerField control={form.control} name="dates.finalResult" title="Resultado Final" />
                  </div>
                  <div className="mt-6">
                    <Button type="submit" className="cursor-pointer">Salvar</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

type InputFieldProps = {
  control: Control<EditalFormData>
  name: keyof Pick<EditalFormData, 'title' | 'number'>
  label: string
  placeholder?: string
}

function InputField({ control, name, label, placeholder }: Readonly<InputFieldProps>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
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

function DatePickerField({ control, name, title }: Readonly<{ control: Control<EditalFormData>; name: 
  | "dates.applicationStart"
  | "dates.applicationEnd"
  | "dates.preliminaryResult"
  | "dates.appealStart"
  | "dates.appealEnd"
  | "dates.finalResult"
  ; title: string }>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DatePicker title={title} value={field.value} onChange={field.onChange} />
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
    availableBenefits.map((item) => (
      <FormField
        key={item.id}
        control={control}
        name="benefit"
        render={({ field }) => (
          <CheckboxItem item={item} field={field}/>
        )}
      />
    ))
  )
}
