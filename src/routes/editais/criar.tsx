import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

export const Route = createFileRoute("/editais/criar")({
  component: CreateEdital,
})

const allUsers = [
  {
    id: 1,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 1",
  },
  {
    id: 2,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 2",
  },
  {
    id: 3,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 3",
  },
  {
    id: 4,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 4",
  },
  {
    id: 5,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 5",
  },
  {
    id: 6,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 6",
  },
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
  year: z.string({required_error: "O ano de vigencia é obrigatório"}),

  coordinators: z.array(z.number()).min(1, "Selecione ao menos um coordenador."),
  social_workers: z.array(z.number()),

  benefit: z.array(z.string()).min(1, "Selecione ao menos um benefício."),
  dates: z.object({
    applicationStart: z.date({required_error: "Selecione uma data de início para o edital."}),
    applicationEnd: z.date().optional(),
    preliminaryResult: z.date().optional(),
    appealStart: z.date().optional(),
    appealEnd: z.date().optional(),
    finalResult: z.date().optional(),
  }),
});

type EditalFormData = z.infer<typeof editalSchema>;

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
      {/* Sidebar */}
      <Sidebar/>
      {/* Content */}
      <div className="flex flex-col w-full max-w-full bg-gray-50">
        <div className="px-4 mt-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/editais/criar">Editais</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbItem>
                <BreadcrumbPage>Criar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Separator className="my-4"/>
        <div className="w-full max-w-full gap-6 px-5 py-4">
          <h2 className="text-2xl font-medium px-1 mb-6">Criar Edital</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white px-4 py-4 w-full border rounded-xl">
              <Tabs defaultValue="1">
                <TabsList className="gap-2 px-1">
                  <TabsTrigger value="1">Identificação</TabsTrigger>
                  <TabsTrigger value="2">Equipe</TabsTrigger>
                  <TabsTrigger value="3">Benefícios</TabsTrigger>
                  <TabsTrigger value="4">dates</TabsTrigger>
                </TabsList>

                {/* Aba 1: Identificação */}
                <TabsContent value="1" className="px-2">
                  <div className="w-sm text-lg font-medium py-2">Identificação do Edital</div>
                  <div className="grid gap-6 py-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título do Edital</FormLabel>
                          <FormControl>
                            <Input placeholder="ex.: Cadastramento Socioeconômico 2025" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do Edital</FormLabel>
                          <FormControl>
                            <Input placeholder="ex.: Edital nº 05/2025" {...field} />
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
                <TabsContent value="2" className="px-2">
                  <div className="w-sm text-lg font-medium py-2">Equipe responsável</div>
                    <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="coordinators"
                        render={({ field }) => {
                        const selectedUsers = allUsers.filter(user => field.value.includes(user.id))

                        return (
                            <FormItem>
                            <FormControl>
                                <UsersList
                                  title="Coordenadores"
                                  onSelect={user => field.onChange([...field.value, user.id])}
                                  onDelete={id => field.onChange(field.value.filter(userId => userId !== id))}
                                  list={selectedUsers} 
                                  allUsers={allUsers}
                                  allowEdit={true}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="social_workers"
                        render={({ field }) => {
                        const selectedUsers = allUsers.filter(user => field.value.includes(user.id))

                        return (
                            <FormItem>
                            <FormControl>
                                <UsersList
                                title="Assistentes Sociais"
                                onSelect={user => field.onChange([...field.value, user.id])}
                                onDelete={id => field.onChange(field.value.filter(userId => userId !== id))}
                                list={selectedUsers}
                                allUsers={allUsers}
                                allowEdit={true}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )
                        }}
                    />
                  </div>
                </TabsContent>

                {/* Aba 3: Benefícios */}
                <TabsContent value="3" className="px-2">
                  <div className="text-lg font-medium py-2">Benefícios Ofertados</div>
                    <FormField
                      control={form.control}
                      name="benefit"
                      render={() => (
                        <FormItem className="flex flex-col gap-4 py-2">
                          {availableBenefits.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="benefit"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </TabsContent>

                {/* Aba 4: Prazos */}
                <TabsContent value="4" className="px-2">
                  <div className="text-lg font-medium py-2">Período e Prazos</div>
                    <div className="grid grid-cols-3 gap-6 py-2">
                      <FormField
                        control={form.control}
                        name="dates.applicationStart"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DatePicker title="Início das Inscrições" value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dates.applicationEnd"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DatePicker title="Término das Inscrições" value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dates.preliminaryResult"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DatePicker title="Resultado Preliminar" value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dates.appealStart"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DatePicker title="Início da Fase de Recursos" value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dates.appealEnd"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DatePicker title="Término da Fase de Recursos" value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dates.finalResult"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DatePicker title="Resultado Final" value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="mt-6">
                        <Button type="submit" className="cursor-pointer">Salvar</Button>
                      </div>
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
