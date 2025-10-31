import { createFileRoute, Link } from "@tanstack/react-router"
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
import { InputFile } from "@/components/ui/input-file"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { studentRegistrationsQueryOptions } from "@/queries/student-registrations"
import type { StudentRegistrationsDTO } from "@/types/student-registration"

export const Route = createFileRoute("/_app/student/home/")({
  component: StudentDashboard,
})

function getStatusMessage(status: keyof typeof variantText) {
  if (status === "pending") return "Sua documentação foi recebida, porém as informações e arquivos não foram análisados pela equipe responsável."
  if (status === "appeal") return "Sua documentação foi recebida porém na análise houveram inconsistências ou documentos inválidos."
  if (status === "review") return "Sua documentação foi recebida e está em análise pela equipe responsável. Aguarde o resultado da verificação."
  if (status === "approved") return "Sua solicitação foi analisada e aprovada com sucesso."
  if (status === "rejected") return "Sua documentação foi analisada, mas não atendeu aos requisitos necessários para aprovação."

  console.error("Status inválido: ", status)
}
  

export function StudentDashboard() {    
  const { data: studentRegistrations, isLoading, error } = useQuery(studentRegistrationsQueryOptions());

  const currentRegistration = studentRegistrations?.filter(reg => 
    reg.review.status === "PENDING" || reg.review.status === "REVIEW" || reg.review.status === "APPEAL"
  ) || [];
  
  const pastRegistrations = studentRegistrations?.filter(reg => 
    reg.review.status === "APPROVED" || reg.review.status === "REJECTED"
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
    <div className="flex p-5 justify-center bg-linear-to-b from-cyan-200 to-blue-50 h-full">
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
  registration: StudentRegistrationsDTO[0]
}

function CurrentRegistrationCard({ registration }: CurrentRegistrationCardProps) {
  const statusVariant = registration.review.status.toLowerCase() as "pending" | "review" | "appeal" | "approved" | "rejected"
  const shouldUpload = registration.review.status === "REVIEW"

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Inscrição #{registration.review.id}</CardTitle>
        <CardDescription>
          Acompanhe o status da sua inscrição no{" "}
          <Link className="underline" to={"/student/editais/$id"} params={{ id: String(registration.notice.id) }}>
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

        {shouldUpload && (
          <div>
            <p className="text-base font-semibold">Documentos Solicitados:</p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Atestado Médico</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    Se o seu recurso estiver relacionado a questões de saúde, é obrigatório
                    anexar um atestado médico. Esse documento serve para comprovar a sua
                    situação e garantir que sua solicitação seja analisada de forma justa e
                    adequada.
                  </p>
                  <InputFile title="Arquivo" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface PastRegistrationCardProps {
  registration: StudentRegistrationsDTO[0]
}

function PastRegistrationCard({ registration }: PastRegistrationCardProps) {
  const statusVariant = registration.review.status.toLowerCase() as "pending" | "review" | "appeal" | "approved" | "rejected"
  
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Inscrição #{registration.review.id}</CardTitle>
        <CardDescription>
          <Link className="underline" to={"/student/editais/$id"} params={{ id: String(registration.notice.id) }}>
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