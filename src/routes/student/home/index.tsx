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
import { useIsMobile } from "@/hooks/use-mobile"

export const Route = createFileRoute("/student/home/")({
  component: StudentDashboard,
})

// REMOVER
const edital_atual = {
  title: "Cadastramento Socioeconômico 2025.1",
  id: 1,
  status: "appeal",
  documents: {
    name: "Atestado Médico",
    message: "Se o seu recurso estiver relacionado a questões de saúde, é obrigatório anexar um atestado médico. Esse documento serve para comprovar a sua situação e garantir que sua solicitação seja analisada de forma justa e adequada.",
  }
} as const

const editais_passados = [
  {
    title:  "Cadastramento Socioeconômico 1945.1",
    id: 2,
    result: "denied",
    ivs: 3.2,
    expirationDate: new Date()
  },
  {
    title:  "Cadastramento Socioeconômico 1888.1",
    id: 2,
    result: "approved",
    ivs: 199.2,
    expirationDate: new Date()
  }
]

export function StudentDashboard() {
  const isMobile = useIsMobile()

  function getStatusMessage(status: keyof typeof variantText) {
    if (status === "pending") return "Sua documentação foi recebida, porém as informações e arquivos não foram análisados pela equipe responsável."
    if (status === "appeal") return "Sua documentação foi recebida porém na análise houveram inconsistências ou documentos inválidos."
    if (status === "review") return "Sua documentação foi recebida e está em análise pela equipe responsável. Aguarde o resultado da verificação."
    if (status === "approved") return "Sua solicitação foi analisada e aprovada com sucesso."
    if (status === "denied") return "Sua documentação foi analisada, mas não atendeu aos requisitos necessários para aprovação."

    console.error("Status inválido: ", status)
  }

  function hasToUpload(status: keyof typeof variantText) : boolean {
    return status === "appeal"
  }

  function isCurrentRegistrated() : boolean {
    return true
  }

  return (
    <div className="flex p-5 justify-center bg-linear-to-b from-cyan-200 to-blue-50 min-h-dvh">
      <div className="flex w-full max-w-xl flex-col gap-6">
        <Tabs defaultValue="current-registration" className="flex gap-5">
          <TabsList className="w-full">
            <TabsTrigger value="current-registration">Inscrição Atual</TabsTrigger>
            <TabsTrigger value="past-registrations">Editais Passados</TabsTrigger>
          </TabsList>
          <TabsContent value="current-registration">
            {!isCurrentRegistrated() ? (
              <Alert variant="default">
                <AlertCircleIcon />
                <AlertTitle>Você não está cadastrado em nenhum edital.</AlertTitle>
              </Alert>
            ) : (
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>{`Inscrição ${1}`}</CardTitle>
                  <CardDescription>
                    Acompanhe o status da sua inscrição no <Link className="underline" to={"."} >{edital_atual.title}</Link>
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex gap-2">
                    <p className="text-md font-medium">Seu status é</p>
                    <StatusBadge variant={edital_atual.status}/>
                  </div>

                  <p className="text-sm text-muted-foreground">{getStatusMessage(edital_atual.status)}</p>

                  { hasToUpload(edital_atual.status) && 
                  <div>
                    <p className="text-base font-semibold">Documentos Solicitados: </p>
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger>{edital_atual.documents.name}</AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>{edital_atual.documents.message}</p>
                            <InputFile title="Arquivo"/>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                  </div> }
                </CardContent>
              </Card>
            )}
          </TabsContent>
          {/* TODO */}
          <TabsContent value="past-registrations" className="flex justify-center">
            {!isCurrentRegistrated() ? (
              <Alert variant="default">
                <AlertCircleIcon />
                <AlertTitle>Você não se cadastrou em um edital passado.</AlertTitle>
              </Alert>
            ) : (
              <div className={`flex ${isMobile && "flex-col"} gap-3`}>
                {editais_passados.map(edital => <EditalCard editalInfo={edital}/>)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface EditalCardProps {
  editalInfo: any,
}


function EditalCard({ editalInfo }: EditalCardProps) {

  return (
    <Card className="">
      <CardHeader className="border-b">
        <CardTitle>{`Inscrição ${1}`}</CardTitle>
        <CardDescription>
          Acompanhe o status da sua inscrição no <Link className="underline" to={"."} >{editalInfo.title}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3.5">
        <div className="flex gap-2 items-center">
          <p className="text-sm font-medium">Resultado Final: </p>
          <StatusBadge variant={editalInfo.result}/>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-medium">IVS: </p>
          <p className="p-1.5 text-md font-medium bg-gray-200 rounded-md">{editalInfo.ivs}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-medium">Data de Expiração: </p>
          <p className="text-sm">{new Intl.DateTimeFormat("pt-BR").format(editalInfo.expirationDate)}</p>
        </div>
        <p className="text-sm text-muted-foreground">Fique atento aos próximos editais! Seu IVS tem validade de 2 anos e poderá ser utilizado nas futuras seleções durante esse período.</p>
      </CardContent>
    </Card>
  )
}