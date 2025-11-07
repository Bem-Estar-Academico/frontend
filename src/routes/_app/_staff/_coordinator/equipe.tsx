import { Button } from "@/components/ui/button"
import { CardSocialWorker } from "@/components/coordinator/card-social-worker"
import { createFileRoute } from "@tanstack/react-router"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from "react"
import { ChartProgress } from "./-components/chart-progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LayoutGrid,
  List,
  ClipboardCheck,
  ClipboardList,
  FileText,
  Download,
} from "lucide-react"
import { SocialWorkerProgressDataTable } from "@/components/coordinator/social-worker-progress-datatable"
import { useSuspenseQuery } from "@tanstack/react-query"
import { editaisQueryOptions } from "@/queries/editais"
import { teamProgressQueryOptions } from "@/queries/team-progress"

export const Route = createFileRoute("/_app/_staff/_coordinator/equipe")({
    component: () => (
      <>
        <title>Equipe | BEA</title>
        <RouteComponent/>
      </>
    ),
})

type OrderByOption = "highestProgress" | "lowestProgress" | "lastAnalysis"

interface KpiCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
}

function KpiCard({ title, value, icon, description }: KpiCardProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}


function RouteComponent() {
  const [orderBy, setOrderBy] = React.useState<OrderByOption>("highestProgress");
  const { data: editais } = useSuspenseQuery(editaisQueryOptions);

  const lastNotice = editais.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  const { data: teamProgress } = useSuspenseQuery(teamProgressQueryOptions(lastNotice?.id));

  const sortedData = React.useMemo(() => {
    const dataCopy = [...teamProgress];
    switch (orderBy) {
      case "highestProgress": 
        return dataCopy.sort((a, b) => b.progress - a.progress);
      case "lowestProgress":
        return dataCopy.sort((a, b) => a.progress - b.progress);
      case "lastAnalysis":
        return dataCopy.sort((a, b) => new Date(b.last_review ?? 0).getTime() - new Date(a.last_review ?? 0).getTime());
      default:
        return dataCopy;
    }
  }, [orderBy, teamProgress]);

  if (!lastNotice) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Nenhum edital encontrado.
      </div>
    )
  }

  const totalApplications = 2000;
  const analyzedCount = 1200;
  const pendingCount = 800;

  return (
    <div className="w-full min-h-screen space-y-8 px-10 py-6">
      <header className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard da Equipe</h1>
          <p className="text-muted-foreground">
            Acompanhamento do edital: <strong>{lastNotice.title}</strong>
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 size-4" />
          Gerar Relatório
        </Button>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChartProgress totalPercent={33} editalTitle={lastNotice.title} />
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Visão Geral das Análises</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCard
              title="Análises Pendentes"
              value={pendingCount}
              icon={<ClipboardList className="size-6 text-blue-300" />}
              description="Aguardando primeira revisão"
            />
            <KpiCard
              title="Análises Concluídas"
              value={analyzedCount}
              icon={<ClipboardCheck className="size-6 text-green-500" />}
              description="Total de análises finalizadas"
            />
            <KpiCard
              title="Total de Inscrições"
              value={totalApplications}
              icon={<FileText className="size-6 text-indigo-600" />}
              description="Total no edital"
            />
          </CardContent>
        </Card>
      </section>

      <section>
        <Tabs defaultValue="grid">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-lg font-semibold">
                  Progresso dos Assistentes Sociais
                </CardTitle>
                <CardDescription>
                  Acompanhe o progresso da equipe de assistentes sociais
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <TabsList>
                  <TabsTrigger value="grid"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
                  <TabsTrigger value="list"><List className="h-4 w-4" /></TabsTrigger>
                </TabsList>
                <Select onValueChange={(value: OrderByOption) => setOrderBy(value)} defaultValue="highestProgress">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ordenar por</SelectLabel>
                      <SelectItem value="highestProgress">Maior progresso</SelectItem>
                      <SelectItem value="lowestProgress">Menor progresso</SelectItem>
                      <SelectItem value="lastAnalysis">Análise mais recente</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
                <TabsContent value="grid">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {sortedData.map((worker) => (
                      <CardSocialWorker key={worker.email} data={worker} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="list">
                  <SocialWorkerProgressDataTable data={sortedData} />
                </TabsContent>
              
            </CardContent>
          </Card>
        </Tabs>
      </section>
      
    </div>
  )
}