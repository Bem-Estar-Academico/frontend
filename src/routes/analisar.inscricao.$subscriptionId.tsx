import {
  DocumentsSidebar,
  type DocumentsSidebarProps,
} from "@/components/documents-sidebar";
import DocumentViewer from "@/components/document-viewer"; // Importado
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import {
  IconArrowLeft,
  IconClipboardCheck,
  IconFileText,
  IconSearch,
  IconUser,
  IconUsers,
  type IconProps,
} from "@tabler/icons-react";

import { CriteriosContent } from "@/components/criterios-content";
import { useState } from "react";
import { DadosPessoaisContent } from "@/components/dados-pessoais";
import { ComposicaoFamiliarContent } from "@/components/composicao-familia-content";
import { ResultadoContent } from "@/components/resultado-content";
import { AnaliseSocioeconomicoContent } from "@/components/analise-socioeconomico-content";
import { Button } from "@/components/ui/button";

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
        url: "/docs/test.pdf",
      },
      {
        title: "Carteira de Trabalho",
        id: "carteira-de-trabalho-estudante",
        url: "/docs/test1.pdf",
      },
      {
        title: "Certidão de Casamento",
        id: "certidao-de-casamento-estudante",
        url: "/docs/test.pdf",
      },
      {
        title: "Comprovante de Monitoria",
        id: "comprovante-de-monitoria-estudante",
        url: "/docs/test1.pdf",
      },
      {
        title: "Histórico Escolar",
        id: "historico-escolar-estudante",
        url: "/docs/test.pdf",
      },
    ],
  },
  {
    title: "Documentação Pai",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-pai",
        url: "/docs/test1.pdf",
      },
      {
        title: "Atestado Médico",
        id: "atestado-medico-pai",
        url: "/docs/test.pdf",
      },
    ],
  },
  {
    title: "Documentação Mãe",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-mae",
        url: "/docs/test1.pdf",
      },
    ],
  },
  {
    title: "Documentação Avô",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-avo",
        url: "/docs/test.pdf",
      },
    ],
  },
];

export type NavItem = {
  id: string;
  label: string;
  icon: React.FC<IconProps>;
  status: "pending" | "active";
};

export function ReviewSubscription() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      id: "criterios",
      label: "Critérios de Elegibilidade",
      icon: IconClipboardCheck,
      status: "active",
    },
    { id: "dados", label: "Dados Pessoais", icon: IconUser, status: "pending" },
    {
      id: "composicao",
      label: "Composição Familiar",
      icon: IconUsers,
      status: "pending",
    },
    {
      id: "analise",
      label: "Análise Socioeconômica",
      icon: IconSearch,
      status: "pending",
    },
    {
      id: "resultado",
      label: "Resultado",
      icon: IconFileText,
      status: "pending",
    },
  ]);

  const [activeStepId, setActiveStepId] = useState("criterios");
  
  const [activeDocumentId, setActiveDocumentId] = useState<string | undefined>();
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(null);
  
  const handleStepClick = (id: string) => {
    setActiveStepId(id);
  };

  const handleNextStep = () => {
    const currentIndex = navItems.findIndex((item) => item.id === activeStepId);
    if (currentIndex < navItems.length - 1) {
      const nextStepId = navItems[currentIndex + 1].id;
      setActiveStepId(nextStepId);
    } else {
      console.log("Você já está no último passo!");
    }
  };

  const handleDocumentSelect = (id: string) => {
    setActiveDocumentId(id);
    for (const section of mockData) {
      const foundItem = section.items.find((item) => item.id === id);
      if (foundItem && foundItem.url) {
        setSelectedDocumentUrl(foundItem.url);
        return;
      }
    }
    setSelectedDocumentUrl(null);
  };
  
  const stepContentMap: Record<string, React.ReactNode> = {
    criterios: <CriteriosContent />,
    dados: <DadosPessoaisContent />,
    composicao: <ComposicaoFamiliarContent />,
    analise: <AnaliseSocioeconomicoContent />,
    resultado: <ResultadoContent />,
  };

  const currentStepIndex = navItems.findIndex(
    (item) => item.id === activeStepId
  );
  const isLastStep = currentStepIndex === navItems.length - 1;

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <header className="w-full h-14 flex items-center justify-between border-b bg-white px-4">
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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">20%</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>

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

          <div className="sidebar-container">
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "20rem",
                } as React.CSSProperties & Record<string, string>
              }
            >
              <DocumentsSidebar 
                data={mockData}
                activeDocumentId={activeDocumentId}
                onDocumentSelect={handleDocumentSelect}
              />
              <SidebarTrigger />
            </SidebarProvider>
          </div>
          <div className="flex h-full flex-col">
            <header className="flex shrink-0 items-center gap-4 bg-white p-4">
              <nav className="flex items-center gap-2">
                {navItems.map((item) => {
                  const isActive = item.id === activeStepId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleStepClick(item.id)}
                      className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${
                        isActive
                          ? "border-gray-800 bg-gray-100"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <item.icon
                        size={16}
                        className={isActive ? "text-gray-800" : "text-gray-400"}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </header>
            <main className="overflow-y-auto p-8">
              <div
                className={`grid gap-8 ${
                  activeStepId === "resultado" ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {activeStepId !== "resultado" && (
                  <div className="h-full min-h-[calc(100vh-12rem)] rounded-lg overflow-hidden border">
                    <DocumentViewer url={selectedDocumentUrl} title="Visualizador de Documentos" />
                  </div>
                )}

                <div>
                  {stepContentMap[activeStepId]}
                  <Button
                    type="button"
                    size="lg"
                    className="mt-8 w-full bg-gray-700 text-base font-semibold hover:bg-gray-800 disabled:bg-gray-400"
                    onClick={handleNextStep}
                    disabled={isLastStep}
                  >
                    {isLastStep ? "Finalizar" : "Próximo"}
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}