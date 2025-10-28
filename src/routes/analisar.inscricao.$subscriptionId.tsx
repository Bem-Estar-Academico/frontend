import {
  DocumentsSidebar,
  type DocumentsSidebarProps,
} from "@/components/documents-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import {
  IconFileText,
  IconGavel,
  IconProgress,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import formData from "./_student/-data";
import { type FormValues } from "./_student/-schema";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@radix-ui/react-progress";
import { Badge } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

export const Route = createFileRoute("/analisar/inscricao/$subscriptionId")({
  component: ReviewSubscription,
});

const mockData: DocumentsSidebarProps["data"] = [
  {
    title: "Documentação do Estudante",
    items: [
      { title: "Atestado Médico", id: "atestado-medico-estudante" },
      { title: "Carteira de Trabalho", id: "carteira-de-trabalho-estudante" },
      {
        title: "Carteira de Habilitação",
        id: "carteira-de-habilitacao-estudante",
      },
      {
        title: "Comprovante de Monitoria",
        id: "comprovante-de-monitoria-estudante",
      },
      { title: "Histórico Escolar", id: "historico-escolar-estudante" },
      { title: "Termo de Guarda", id: "termo-de-guarda-estudante" },
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-estudante",
      },
    ],
  },
  {
    title: "Familiares",
    items: [
      { title: "PAI", id: "pai-section" },
      { title: "MÃE", id: "mae-section" },
      { title: "AVÔ", id: "avo-section" },
    ],
  },
];

const mockSubmittedData: Partial<FormValues> = {
  nome_completo: "Lucas Martins",
  cpf: "123.456.789-07",
  rg: "12.345.678-9",
  data_nascimento: "1998-05-15",
  email: "lucas.martins@example.com",
  telefone: "(82) 98765-4321",
  cep: "57000-000",
  rua: "Rua das Flores",
  numero: "123",
  complemento: "Apto 201",
  bairro: "Centro",
  cidade: "Maceió",
  estado: "AL",
  matricula: "20250106",
  curso: "Engenharia de Computação",
  periodo: "5",
  turno: "noturno",
};

export function ReviewSubscription() {
  const [activeTab, setActiveTab] = useState(formData.sections[0].id);

  const sections = [
    {
      id: "form",
      label: "Questionário",
      icon: IconFileText,
      status: "pending",
    },
    {
      id: "resultado",
      label: "Resultado",
      icon: IconGavel,
      status: "pending",
    },
  ];

  const renderFieldValue = (question: any, value: any) => {
    if (!value && value !== false && value !== 0) {
      return (
        <div className="text-sm text-muted-foreground">Não informado</div>
      );
    }

    switch (question.type) {
      case "radio":
        const selectedOption = question.options?.find(
          (opt: any) => opt.id === value
        );
        return <div className="text-sm">{selectedOption?.label || value}</div>;

      case "checkbox":
        const selectedOptions = question.options?.filter((opt: any) =>
          value?.includes(opt.id)
        );
        return (
          <div className="text-sm">
            {selectedOptions && selectedOptions.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {selectedOptions.map((opt: any) => (
                  <li key={opt.id}>{opt.label}</li>
                ))}
              </ul>
            ) : (
              <span className="text-muted-foreground">
                Nenhuma opção selecionada
              </span>
            )}
          </div>
        );

      case "checkbox-single":
        return (
          <div className="text-sm">
            {value ? (
              <span className="text-green-600">
                {question.options?.[0]?.label}
              </span>
            ) : (
              <span className="text-muted-foreground">Não marcado</span>
            )}
          </div>
        );

      case "file":
        return (
          <div className="text-sm">
            {value ? (
              <div className="flex items-center gap-2">
                <span>
                  {typeof value === "string" ? value : value.name}
                </span>
                <button className="text-blue-600 hover:underline text-xs">
                  Visualizar
                </button>
              </div>
            ) : (
              <span className="text-muted-foreground">
                Nenhum arquivo enviado
              </span>
            )}
          </div>
        );

      default:
        return <div className="text-sm">{String(value)}</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      {/* HEADER */}

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

            <div className="flex h-full w-full flex-col bg-gray-50 overflow-auto pb-32">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col"
              >
                <div className="">
                  <TabsList className="h-auto flex-wrap p-2 gap-2 bg-transparent flex justify-center w-full">
                    {sections.map((item) => {
                      return (
                        <TabsTrigger
                          key={item.id}
                          value={item.id}
                          className="
                            relative flex h-16 w-full max-w-3xs flex-row items-center
                            justify-start gap-3 rounded-lg border p-8
                            text-xs font-medium shadow-sm transition-all
                            
                            data-[state=active]:border-gray-800
                            data-[state=active]:bg-gray-100
                            data-[state=active]:shadow-md

                            data-[state=inactive]:border-gray-300
                            data-[state=inactive]:bg-white
                            data-[state=inactive]:hover:bg-gray-50
                          "
                        >
                          <item.icon className="size-6 text-gray-400"/>
                          
                          {/* TITLE */}
                          <h3 className="whitespace-normal text-start pr-3">{item.label}</h3>
                          
                          {/* OK! NOTHING TO CHANGE! */}
                          {/* PROGRESS ICON */}
                          <div className="absolute top-2 right-2">
                            {item.status === "pending" ? (
                              <IconProgress className="size-5 text-blue-500"/>
                            ) : (
                              <IconCircleCheckFilled className="size-5 text-green-500"/>
                            )}
                          </div>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>


                <div className="flex-1 overflow-auto p-6">
                  <TabsContent
                    value="formulario"
                    className="mt-0"
                  >
                    {/* god knows */}
                  </TabsContent>

                  <TabsContent
                    value="resultado"
                    className="mt-0"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Cadastramento Socioeconômico</CardTitle>
                        <CardDescription>
                          IVS calculado: N/A
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-8">
                        <div className="flex justify-between">
                          <div className="flex flex-col gap-4">
                            <h2 className="text-md font-medium">Resultado</h2>
                            <Select defaultValue="indeferido">
                              <SelectTrigger id="resultado" className="max-w-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="indeferido">
                                  Indeferido
                                </SelectItem>
                                <SelectItem value="deferido">
                                  Deferido
                                </SelectItem>
                                <SelectItem value="pendente">
                                  Pendente
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <h2 className="text-md font-medium mb-4">Observações</h2>
                            <Textarea
                              className="min-h-[80px] max-w-xl"
                              placeholder="Use este campo para realizar anotações adicionais necessárias para o processo de avaliação da inscrição"
                            />
                          </div>
                        </div>
                        

                        <div>
                          <h2 className="text-md font-medium mb-4">
                            Auxílios
                          </h2>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                              <Label htmlFor="bolsa">
                                Bolsa Pró-Graduando
                              </Label>
                              <Select>
                                <SelectTrigger id="bolsa">
                                  <SelectValue placeholder="Selecione uma opção" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sim">Sim</SelectItem>
                                  <SelectItem value="nao">Não</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                              <Label htmlFor="alimentacao">
                                Auxílio Alimentação
                              </Label>
                              <Select>
                                <SelectTrigger id="alimentacao">
                                  <SelectValue placeholder="Selecione uma opção" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sim">Sim</SelectItem>
                                  <SelectItem value="nao">Não</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                              <Label htmlFor="moradia">
                                Auxílio Moradia
                              </Label>
                              <Select>
                                <SelectTrigger id="moradia">
                                  <SelectValue placeholder="Selecione uma opção" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sim">Sim</SelectItem>
                                  <SelectItem value="nao">Não</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                              <Label htmlFor="creche">Auxílio Creche</Label>
                              <Select>
                                <SelectTrigger id="creche">
                                  <SelectValue placeholder="Selecione uma opção" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sim">Sim</SelectItem>
                                  <SelectItem value="nao">Não</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>



                        <div className="flex justify-end">
                          <Button className="w-full max-w-xs">
                            Finalizar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
}