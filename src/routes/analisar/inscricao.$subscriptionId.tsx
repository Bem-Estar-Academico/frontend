import {
  DocumentsSidebar,
  type DocumentsSidebarProps,
} from "@/components/documents-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { IconArrowLeft } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import DocumentViewer from "@/components/document-viewer";
import { useState } from "react";
import { resultSchema, SectionResult } from "./-components/section-result";
import { SectionForm } from "./-components/section-form";
import { criteriaSchema, SectionCriteria } from "./-components/section-criteria";

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
        url: "https://www.orimi.com/pdf-test.pdf",
        // url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        title: "Carteira de Trabalho",
        id: "carteira-de-trabalho-estudante",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
      {
        title: "Certidão de Casamento",
        id: "certidao-de-casamento-estudante",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
      {
        title: "Comprovante de Monitoria",
        id: "comprovante-de-monitoria-estudante",
        url: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
      },
      {
        title: "Histórico Escolar",
        id: "historico-escolar-estudante",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
    ],
  },
  {
    title: "Documentação Pai",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-pai",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
      {
        title: "Atestado Médico",
        id: "atestado-medico-pai",
        url: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
      },
    ],
  },
  {
    title: "Documentação Mãe",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-mae",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
    ],
  },
  {
    title: "Documentação Avô",
    items: [
      {
        title: "Termo de Pensão Alimentícia",
        id: "termo-de-pensao-alimenticia-avo",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
    ],
  },
];

const simpleMockData: DocumentsSidebarProps["data"] = [
  {
    title: "Documentos do Estudante",
    items: [
      {
        title: "Atestado Médico",
        id: "atestado-medico-estudante",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
      {
        title: "Carteira de Trabalho",
        id: "carteira-de-trabalho-estudante",
        url: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
      },
      {
        title: "Certidão de Casamento",
        id: "certidao-de-casamento-estudante",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
      {
        title: "Comprovante de Monitoria",
        id: "comprovante-de-monitoria-estudante",
        url: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
      },
      {
        title: "Histórico Escolar",
        id: "historico-escolar-estudante",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
    ],
  },
]

const schema = z.object({
  status: z.string().nonempty("Status é obrigatório"),
  notes: z.string().optional(),
}).merge(criteriaSchema).merge(resultSchema)

export type FormFields = z.infer<typeof schema>;

export function ReviewSubscription() {
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      notes: "",
      criteria: [],
    },
  });
  const [selectedTab, setSelectedTab] = useState("form");

  const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>(undefined);
  const selectedDocument = simpleMockData
    .flatMap((section) => section.items)
    .find((doc) => doc.id === selectedDocumentId);

   return (
    <SidebarProvider>
        <DocumentsSidebar activeDocumentId={selectedDocumentId} data={simpleMockData} onDocumentSelect={setSelectedDocumentId} />
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              
              <div className="flex items-center gap-6">
                <Button  variant={'ghost'}  asChild>
                <Link to=".."> <IconArrowLeft size={18} /> Voltar</Link>
                </Button>
            
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
            </div>
          </header>
          <Separator />
          <Tabs className="p-6 flex flex-col box-border h-full pb-10" value={selectedTab} onValueChange={(value) => setSelectedTab(value)}>
            <TabsList className="h-[64px]">
              <TabsTrigger value="form">Formulário</TabsTrigger>
              <TabsTrigger value="criteria">Critérios de Elegibilidade</TabsTrigger>
              <TabsTrigger value="result">Resultado</TabsTrigger>
            </TabsList>
           
            <form className="h-full grid grid-cols-2 gap-12 flex-1 overflow-hidden">
               {
                 selectedTab !== 'result' && (
                  <div className="h-full ">
                    <DocumentViewer url={selectedDocument?.url || null} />
                  </div>
                 )
               }
              <TabsContent value="form" className="h-full overflow-auto mt-0">
                <SectionForm control={form.control} />
              </TabsContent>  
             <TabsContent value="criteria">
               <SectionCriteria control={form.control} />
              </TabsContent>
              <TabsContent value="result">
                <SectionResult control={form.control} />
              </TabsContent>
            
              
              {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
            </form>
          </Tabs>
        </SidebarInset>
     
    </SidebarProvider>
  )
}
