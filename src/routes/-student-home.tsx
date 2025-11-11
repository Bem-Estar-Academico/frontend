import { Link } from "@tanstack/react-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { StatusBadge, variantText } from "@/components/ui/status-badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { studentRegistrationsQueryOptions } from "@/queries/student-registrations"
import type { Appeal, StudentRegistrationDTO } from "@/types/student-registration"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { api } from "@/api"
import { DOCUMENTS_MAP } from "@/data/documents"

function getStatusMessage(status: keyof typeof variantText) {
  if (status === "pending") return "Sua documentação foi recebida, porém as informações e arquivos não foram analisados pela equipe responsável."
  if (status === "appeal") return "Sua documentação foi recebida porém na análise houveram inconsistências ou documentos inválidos."
  if (status === "review") return "Sua documentação foi recebida e está em análise pela equipe responsável. Aguarde o resultado da verificação."
  if (status === "approved") return "Sua solicitação foi analisada e aprovada com sucesso."
  if (status === "rejected") return "Sua documentação foi analisada, mas não atendeu aos requisitos necessários para aprovação."

  console.error("Status inválido: ", status)
}


export function StudentHome() {    
  const { data: studentRegistrations, isLoading, error } = useQuery(studentRegistrationsQueryOptions());

  const currentRegistration = studentRegistrations?.filter(reg => 
    reg.review?.status === "PENDING" || reg.review?.status === "REVIEW" || reg.review?.status === "APPEAL"
  ) || [];
  
  const pastRegistrations = studentRegistrations?.filter(reg => 
    reg.review?.status === "APPROVED" || reg.review?.status === "REJECTED"
  ) || [];

  if (isLoading) {
    return (
      <div className="flex p-5 justify-center bg-linear-to-b from-cyan-200 to-blue-50  h-full">
        <div className="flex w-full max-w-xl flex-col gap-6 items-center justify-center">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex p-5 justify-center bg-linear-to-b from-cyan-200 to-blue-50  h-full">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Erro ao carregar suas inscrições. Tente novamente mais tarde.</AlertTitle>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex p-5 justify-center bg-linear-to-b from-cyan-200 to-blue-50 min-h-full">
      <div className="flex w-full max-w-xl flex-col gap-6">
        <Tabs defaultValue="current-registration" className="flex gap-5">
          <TabsList className="w-full">
            <TabsTrigger value="current-registration">Inscrições Atuais</TabsTrigger>
            <TabsTrigger value="past-registrations">Editais Passados</TabsTrigger>
          </TabsList>
          
          {/* Inscrição Atual */}
          <TabsContent value="current-registration">
            {currentRegistration.length === 0 ? (
              <Alert variant="default">
                <AlertCircleIcon />
                <AlertTitle>Você não está cadastrado em nenhum edital.</AlertTitle>
              </Alert>
            ) : (
              <div className="flex flex-col gap-5">
                {currentRegistration.map(registration => (
                  <CurrentRegistrationCard registration={registration} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Editais Passados */}
          <TabsContent value="past-registrations" className="flex justify-center">
            {pastRegistrations.length === 0 ? (
              <Alert variant="default">
                <AlertCircleIcon />
                <AlertTitle>Você não se cadastrou em um edital passado.</AlertTitle>
              </Alert>
            ) : (
              <div className={"flex flex-col gap-3"}>
                {pastRegistrations.map(registration => (
                  <PastRegistrationCard key={registration.review.id} registration={registration} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface CurrentRegistrationCardProps {
  registration: StudentRegistrationDTO
}

function CurrentRegistrationCard({ registration }: CurrentRegistrationCardProps) {
  const statusVariant = registration.review?.status.toLowerCase() as "pending" | "review" | "appeal" | "approved" | "rejected"

  const lastAppeal = registration.review.appeals.filter(appeal => !appeal.fulfilled_at).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Inscrição #{registration.review.id}</CardTitle>
        <CardDescription>
          Acompanhe o status da sua inscrição no{" "}
          <Link className="underline" to={"/editais/$id"} params={{ id: String(registration.notice.id) }}>
            {registration.notice.title}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex gap-2 items-center">
          <p className="text-md font-medium">Seu status é</p>
          <StatusBadge variant={statusVariant} />
        </div>

        <p className="text-sm text-muted-foreground">
          {getStatusMessage(statusVariant)}
        </p>

        {lastAppeal && (
          <AppealForm appeal={lastAppeal} />
        )}
      </CardContent>
    </Card>
  )
}


interface AppealFormProps {
  appeal: Appeal
}

function AppealForm({ appeal }: AppealFormProps) {
  const queryClient = useQueryClient();
  const formSchema = z.object(
    Object.keys(appeal.requested_documents).reduce(
      (acc, key) => {
        acc[key] = z.any().refine((file) => file instanceof File, {
          message: "Por favor, envie um arquivo válido.",
        });
        return acc;
      },
      {} as Record<string, z.ZodTypeAny>,
    ),
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: any) => {
    try {

      const formData = new FormData();
      
      // Adiciona todos os arquivos renomeados ao FormData
      for (const [key, file] of Object.entries(data)) {
        const originalFile = file as File;
        const fileExtension = originalFile.name.split('.').pop();
        const newFileName = `${key}.${fileExtension}`;
        const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });
        
        formData.append('files', renamedFile);
      }

      await api.post(`/student-documents/appeal/${appeal.id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Documentos enviados com sucesso!");
      const queryKey = studentRegistrationsQueryOptions().queryKey;
      queryClient.invalidateQueries({ queryKey });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar documentos. Tente novamente.");
    }
  };

  const onError = (errors: any) => {
    console.log(errors);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
      <p className="text-base font-semibold">Documentos Solicitados:</p>
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(appeal.requested_documents).map(([key, value]) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>{DOCUMENTS_MAP[key] || key}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                {typeof value === "string" ? value : "Por favor, envie o documento solicitado."}
              </p>
              <FormField
              control={form.control}
              key={key}
              name={key}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Arquivo</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      ref={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        field.onChange(file);
                      }}
                      accept={"application/pdf"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button variant={'outline'} type="submit" className="mt-4" disabled={isSubmitting}>
        {isSubmitting && <Spinner className="mr-2" />}
        {isSubmitting ? "Enviando..." : "Enviar Documentos"}
      </Button>
      </form>
    </Form>
  )
}


interface PastRegistrationCardProps {
  registration: StudentRegistrationDTO
}

function PastRegistrationCard({ registration }: PastRegistrationCardProps) {
  const statusVariant = registration.review.status.toLowerCase() as "pending" | "review" | "appeal" | "approved" | "rejected"
  
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Inscrição #{registration.review.id}</CardTitle>
        <CardDescription>
          <Link className="underline" to={"/editais/$id"} params={{ id: String(registration.notice.id) }}>
            {registration.notice.title}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3.5">
        <div className="flex gap-2 items-center">
          <p className="text-sm font-medium">Resultado Final:</p>
          <StatusBadge variant={statusVariant} />
        </div>
        
        {registration.review.ivs && (
          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium">IVS:</p>
            <p className="p-1.5 text-md font-medium bg-gray-200 rounded-md">
              {registration.review.ivs.toFixed(2)}
            </p>
          </div>
        )}
        
        {registration.review.expires_at && (
          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium">Data de Expiração:</p>
            <p className="text-sm">
              {new Intl.DateTimeFormat("pt-BR").format(new Date(registration.review.expires_at))}
            </p>
          </div>
        )}
        
        {/* <div className="flex gap-2 items-center">
          <p className="text-sm font-medium">Data de Inscrição:</p>
          <p className="text-sm">
            {new Intl.DateTimeFormat("pt-BR").format(new Date(registration.registration_date))}
          </p>
        </div> */}
        
        {statusVariant === "approved" && (
          <p className="text-sm text-muted-foreground">
            Fique atento aos próximos editais! Seu IVS tem validade de 2 anos e poderá ser
            utilizado nas futuras seleções durante esse período.
          </p>
        )}

        {/* Auxílios solicitados */}
        {/* {(registration.requested_food_allowance ||
          registration.requested_housing_allowance ||
          registration.requested_daycare_allowance ||
          registration.requested_graduation_scholarship) && (
          <div>
            <p className="text-sm font-medium mb-1">Auxílios Solicitados:</p>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
              {registration.requested_food_allowance && <li>Auxílio Alimentação</li>}
              {registration.requested_housing_allowance && <li>Auxílio Moradia</li>}
              {registration.requested_daycare_allowance && <li>Auxílio Creche</li>}
              {registration.requested_graduation_scholarship && <li>Bolsa Pró-Graduando</li>}
            </ul>
          </div>
        )} */}
      </CardContent>
    </Card>
  )
}