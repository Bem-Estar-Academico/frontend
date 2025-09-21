import { DocumentsSidebar, type DocumentsSidebarProps } from '@/components/documents-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/analisar/inscricao/$subscriptionId')({
  component: ReviewSubscription,
})

const mockData: DocumentsSidebarProps["data"] = [
  {
    title: "Documentos do Estudante",
    items: [
      {
        title: "Atestado Médico",
        id: "atestado-medico-estudante",
      },
      {
        title: "Carteira de Trabalho",
        id: "carteira-de-trabalho-estudante",
      },
      {
        title: "Certidão de Casamento",
        id: "certidao-de-casamento-estudante",
      },
      {
        title: "Comprovante de Monitoria",
        id: "comprovante-de-monitoria-estudante",
      },
      {
        title: "Histórico Escolar",
        id: "historico-escolar-estudante",
      },
    ],
  },
  {
    title: "Documentação Pai",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-pai",
      },
      {
        title: "Atestado Médico",
        id: "atestado-medico-pai",
      },
    ],
  },
  {
    title: "Documentação Mãe",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-mae",
      },
    ],
  },
  {
    title: "Documentação Avô",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-avo",
      },
    ],
  },
];

export function ReviewSubscription() {
  return (
    <div>
       <SidebarProvider style={{
          "--sidebar-width": "20rem",
        } as React.CSSProperties & Record<string, string>}>
        <DocumentsSidebar data={mockData} />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </div>
  )
}