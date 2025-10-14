import {
  DocumentsSidebar,
  type DocumentsSidebarProps,
} from "@/components/documents-sidebar";
import DocumentViewer from "@/components/document-viewer"; // Importado
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  IconListCheck,
  IconUser,
  IconUsersGroup,
  IconZoomMoney,
  IconZoomCheck,
  IconArrowLeft,
  IconCircleCheckFilled,
  type IconProps,
  IconProgress,
} from "@tabler/icons-react";

import {
  CriteriosContent,
  eligibilityCriteria,
} from "@/components/criterios-content";
import { useEffect, useMemo, useState } from "react";
import {
  DadosPessoaisContent,
  testDadosPessoais,
} from "@/components/dados-pessoais";
import {
  ComposicaoFamiliarContent,
  testComposicaoFamilia,
} from "@/components/composicao-familia-content";
import { ResultadoContent } from "@/components/resultado-content";
import { AnaliseSocioeconomicoContent } from "@/components/analise-socioeconomico-content";
import { Button } from "@/components/ui/button";
import { students } from "@/routes/_social-workers/editais/-data";
import { StatusBadge } from "@/components/ui/status-badge";
import { useForm } from "react-hook-form";

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

interface SubscriptionProps {
  editalId: string;
  criteriosElegibilidadeProps: Record<string, boolean>;
  dadosPessoaisProps: Record<string, boolean>;
  composicaoFamiliaContentProps: Record<string, boolean>;
  analiseSocioeconomicaContentProps: any;
  resultadoContentProps: any;
}

export function ReviewSubscription({
  editalId,
  criteriosElegibilidadeProps,
  dadosPessoaisProps,
  composicaoFamiliaContentProps,
  analiseSocioeconomicaContentProps,
  resultadoContentProps,
}: Readonly<SubscriptionProps>) {
  editalId = "1"; // modificar depois

  //Buscar o estudante
  const { subscriptionId } = Route.useParams();

  const student = students.find((s) => s.id === Number(subscriptionId));

  if (!student) {
    return <div> Erro </div>;
  }

  // inicio navbar
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      id: "criterios",
      label: "Critérios de Elegibilidade",
      icon: IconListCheck,
      status: "pending",
    },
    { id: "dados", label: "Dados Pessoais", icon: IconUser, status: "pending" },
    {
      id: "composicao",
      label: "Composição Familiar",
      icon: IconUsersGroup,
      status: "pending",
    },
    {
      id: "analise",
      label: "Análise Socioeconômica",
      icon: IconZoomMoney,
      status: "pending",
    },
    {
      id: "resultado",
      label: "Resultado",
      icon: IconZoomCheck,
      status: "pending",
    },
  ]);

  const [activeStepId, setActiveStepId] = useState("criterios");

  const handleNextStep = () => {
    const currentIndex = navItems.findIndex((item) => item.id === activeStepId);
    if (currentIndex < navItems.length - 1) {
      const nextStepId = navItems[currentIndex + 1].id;
      setActiveStepId(nextStepId);
    } else {
      console.log("Você já está no último passo!");
    }
  };

  const handleStepClick = (id: string) => {
    setActiveStepId(id);
  };

  const currentStepIndex = navItems.findIndex(
    (item) => item.id === activeStepId
  );

  const isLastStep = currentStepIndex === navItems.length - 1;

  const activeCount = useMemo(() => {
    return navItems.filter((item) => item.status === "active").length;
  }, [navItems]);

  const progress = (activeCount / navItems.length) * 100;
  // fim navbar

  // selecionar documento
  const [activeDocumentId, setActiveDocumentId] = useState<
    string | undefined
  >();
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(
    null
  );

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

  // inicio - estados do formulario

  //dados pessoas default - modificar com form verdadeiro
  const initialDadosPessoaisState = testDadosPessoais.reduce<
    Record<string, boolean>
  >((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {});

  //composição familia default - modificar com form verdadeiro
  const initialComposicaoFamiliaState = testComposicaoFamilia.reduce<
    Record<string, boolean>
  >((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {});

  //Analise Socioeconomico default - modificar com form verdadeiro
  const initialAnaliseSocioeconomicoState = testComposicaoFamilia.reduce<
    Record<string, boolean>
  >((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {});

  //navbar com todos os tabela para salvar cada campo de analise [criterio até  resultado]
  const { control, watch, register } = useForm({
    defaultValues: {
      criterios:
        criteriosElegibilidadeProps ??
        eligibilityCriteria.reduce<Record<string, boolean>>((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {}),
      dadosPessoais: dadosPessoaisProps ?? initialDadosPessoaisState,
      composicaoFamiliar:
        composicaoFamiliaContentProps ?? initialComposicaoFamiliaState,
      analiseSocioeconomico:
        analiseSocioeconomicaContentProps ?? initialAnaliseSocioeconomicoState,
      resultado: resultadoContentProps ?? {
        statusGeral: "Em análise",
        auxilios: {
          "Bolsa Pró-Graduando": "",
          "Auxílio Alimentação": "",
          "Auxílio Moradia": "",
          "Auxílio Creche": "",
        },
        observacoes: "",
      },
    },
  });

  const watchedCriterios = watch("criterios");

  const isAnyCriterionSelected = useMemo(() => {
    return Object.values(watchedCriterios).some((isChecked) => isChecked);
  }, [watchedCriterios]);

  useEffect(() => {
    setNavItems((prevNavItems) =>
      prevNavItems.map((item) => {
        if (item.id === "criterios") {
          return {
            ...item,
            status: isAnyCriterionSelected ? "active" : "pending",
          };
        }
        if (item.id === "dados") {
          return {
            ...item,
            status: isAnyCriterionSelected ? "active" : "pending",
          };
        }
        if (item.id === "dados") {
          return {
            ...item,
            status: isAnyCriterionSelected ? "active" : "pending",
          };
        }
        return item;
      })
    );
  }, [isAnyCriterionSelected]);
  // fim - estados do formulario

  // componentes que irão ser prenchido
  const stepContentMap: Record<string, React.ReactNode> = {
    criterios: <CriteriosContent control={control} name="criterios" />,
    dados: <DadosPessoaisContent control={control} name="dadosPessoais" />,
    composicao: (
      <ComposicaoFamiliarContent control={control} name="composicaoFamiliar" />
    ),
    analise: <AnaliseSocioeconomicoContent control={control} name="analiseSocioeconomico" />,
    resultado: <ResultadoContent register={register} />,
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <header className="w-full h-14 flex items-center justify-between border-b bg-white px-4">
          <div className="flex items-center gap-6">
            <Link to={`/editais/` + editalId}>
              <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900">
                <IconArrowLeft size={18} /> Voltar
              </button>
            </Link>
            <span className="font-semibold">Inscrição #{student.id}</span>
            <span>{student.nome}</span>
            <span>
              <span className="font-semibold">Matrícula:</span>{" "}
              {student.matricula}
            </span>
            <span>
              <span className="font-semibold">CPF:</span> {student.cpf}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">{progress}%</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <StatusBadge variant={"review"} />
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
          <div className="flex flex-col h-full w-full">
            <header className="flex shrink-0 items-center gap-4 bg-white p-4">
              <nav className="grid grid-cols-5 gap-2 w-full">
                {navItems.map((item) => {
                  const isActive = item.id === activeStepId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleStepClick(item.id)}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${
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
                      <span>
                        {item.status === "pending" ? (
                          <IconProgress size={18} />
                        ) : (
                          <IconCircleCheckFilled size={18} />
                        )}
                      </span>
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
                    <DocumentViewer
                      url={selectedDocumentUrl}
                      title="Visualizador de Documentos"
                    />
                  </div>
                )}

                <div
                  className={`${
                    activeStepId === "resultado" ? "flex flex-col" : ""
                  }`}
                >
                  {stepContentMap[activeStepId]}
                  <Button
                    type="button"
                    size="lg"
                    className={`mt-8 bg-gray-700 text-base font-semibold hover:bg-gray-800 disabled:bg-gray-400
                      ${
                        activeStepId === "resultado"
                          ? "grid-cols-1 place-self-center"
                          : "grid-cols-2 w-full"
                      }`}
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
