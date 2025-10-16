import { CardSocialWorker } from '@/components/coordinator/card-social-worker'
import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from 'react'
import { data } from './-data'
import { ChartProgress } from './-components/chart-progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutGrid, List } from 'lucide-react'
import { SocialWorkerProgressDataTable } from '@/components/coordinator/social-worker-progress-datatable'

export const Route = createFileRoute('/_coordinator/equipe')({
  component: RouteComponent,
})

type OrderByOption = 'highestProgress' | 'lowestProgress' | 'lastAnalysis'

function RouteComponent() {
  const [orderBy, setOrderBy] = React.useState<OrderByOption>('highestProgress');

  const sortedData = React.useMemo(() => {
    const dataCopy = [...data];
    switch (orderBy) {
      case 'highestProgress': 
        return dataCopy.sort((a, b) => b.workProgress - a.workProgress);
      case 'lowestProgress':
        return dataCopy.sort((a, b) => a.workProgress - b.workProgress);
      case 'lastAnalysis':
        return dataCopy.sort((a, b) => new Date(b.lastAnalysisDate).getTime() - new Date(a.lastAnalysisDate).getTime());
      default:
        return dataCopy;
    }
  }, [orderBy]);

  return (
   <div className='w-full'>
    <header className='w-full p-4 flex items-center'>
      <h1 className='text-2xl font-medium'>Equipe</h1>
    </header>

    <Separator className="w-full" />

    <section className='p-4'>
      <div className="grid grid-cols-[minmax(0,600px)_1fr]">
        <ChartProgress total_percent={50} />
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <StatsCard title='Total' color="bg-blue-500" value={800} />
          <StatsCard title='Assistentes Sociais' color="bg-green-500" value={15} />
          <StatsCard title='Análises Realizadas' color="bg-yellow-500" value={1200} />
          <StatsCard title='Análises Pendentes' color="bg-red-500" value={800} />
        </div>
      </div>

      <Tabs className="mt-8" defaultValue="card">
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
              Ordenar por:
              <Select onValueChange={(value: OrderByOption) => setOrderBy(value)} defaultValue='highestProgress'>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ordem</SelectLabel>
                    <SelectItem value="highestProgress">Maior progresso</SelectItem>
                    <SelectItem value="lowestProgress">Menor progresso</SelectItem>
                    <SelectItem value="lastAnalysis">Análise mais recente</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
             <TabsList>
              <TabsTrigger value="card"><LayoutGrid/></TabsTrigger>
              <TabsTrigger value="list"><List/></TabsTrigger>
            </TabsList>
        </div>
       <TabsContent value="card">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {sortedData.map((worker) => (
            <CardSocialWorker key={worker.email} data={worker} />
          ))}
        </div>
         
       </TabsContent>
       <TabsContent value="list">
        <SocialWorkerProgressDataTable data={sortedData} />
       </TabsContent>
      </Tabs>

    </section>
   
   </div>
  )
}

interface StatsCardProps {
  title: string;
  value: string | number;
  color: string;
}

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card className="p-2 gap-2">
      <CardHeader className='p-4'>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex gap-4 items-center h-[60px]'>
          {/* <div className={`rounded-sm h-8 w-2 ${color}`}></div> */}
          <p className="text-3xl">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}