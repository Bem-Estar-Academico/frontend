import {
  DocumentsSidebar,
  type DocumentsSidebarProps,
} from "@/components/documents-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { IconArrowLeft } from "@tabler/icons-react";

export const Route = createFileRoute("/analisar/inscricao/$subscriptionId")({
  component: ReviewSubscription,
});

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
    <>
      <div className="flex h-screen w-screen flex-col">
        <header className="w-full h-14 flex items-center justify-between border-b bg-white px-4">
          {/* Esquerda */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900">
              <IconArrowLeft size={18} /> Voltar
            </button>
            <span className="font-semibold">Inscrição #32</span>
            <span>Lucas Martins</span>
            <span>
              <span className="font-semibold">Matrícula:</span> 20250106
            </span>
            <span>
              <span className="font-semibold">CPF:</span> 123.456.789-07
            </span>
          </div>

          {/* Direita */}
          <div className="flex items-center gap-4">
            {/* Progresso */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">20%</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>

            {/* Status */}
            <span className="px-2 py-1 text-xs rounded-md border border-gray-300 bg-gray-100 text-gray-700">
              Em Análise
            </span>
          </div>
        </header>

        <div className="relative flex flex-1 overflow-hidden">
          <style>
            {`
            .sidebar-container [data-slot="sidebar-container"] {
              position: absolute !important;
              height: 100% !important;
            }
            .sidebar-container [data-slot="sidebar-wrapper"] {
              height: 100% !important;
            }
          `}
          </style>

          <div className="sidebar-container h-full w-full">
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "20rem",
                } as React.CSSProperties & Record<string, string>
              }
            >
              <DocumentsSidebar data={mockData} />
              <SidebarTrigger />

              <div className="flex h-full flex-col">
                <header className="flex shrink-0 items-center gap-4 bg-white p-4">
                  <h1 className="text-xl font-bold">Header do Conteúdo</h1>
                </header>
                <div className="flex flex-row gap-6">
                  <div className="flex-1 overflow-y-auto p-6">
                    <p>Conteúdo principal que pode rolar independentemente.</p>
                  </div>
                  <div className="">
                    <p>Conteúdo principal que pode rolar independentemente.</p>
                  </div>
                </div>
              </div>
            </SidebarProvider>
          </div>
        </div>
      </div>
    </>
  );
}
