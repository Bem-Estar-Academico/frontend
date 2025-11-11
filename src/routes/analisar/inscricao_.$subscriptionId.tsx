import {
  DocumentsSidebar,
} from "@/components/documents-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resultSchema, SectionResult } from "./-components/section-result";
import { SectionForm } from "./-components/section-form";
import { criteriaSchema } from "./-components/section-criteria";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { studentRegistrationReviewQueryOptions } from "@/queries/student-registration-review";
import { toast } from "sonner";
import { editalQueryOptions } from "@/queries/edital";
import { updateReviewMutationOptions } from "@/mutations/update-review";
import { queryClient } from "@/main";
import { studentRegistrationQueryOptions } from "@/queries/student-registration";
import { studentRegistrationDocumentsQueryOptions } from "@/queries/student-documents";
import { SectionEvaluationForm } from "./-components/section-evaluation-form";
import { scoresSchema } from "./-components/section-scores-form";
import { useEffect } from "react";
import { ReviewHeader } from "./-components/review-header";
import { DOCUMENTS_MAP } from "@/data/documents";

export const Route = createFileRoute("/analisar/inscricao_/$subscriptionId")({
  component: () => (
    <>
      <title>Análise da Inscrição</title>
      <ReviewSubscription />
    </>
  ),
  loader: async ({ params }) => {
    const { subscriptionId } = params;
    await Promise.all([
      queryClient.ensureQueryData(studentRegistrationReviewQueryOptions(Number.parseInt(subscriptionId))),
      queryClient.ensureQueryData(studentRegistrationDocumentsQueryOptions(Number.parseInt(subscriptionId))),
    ]);
  }
});

// const mockData: DocumentsSidebarProps["data"] = [
//   {
//     title: "Documentos do Estudante",
//     items: [
//       {
//         title: "Atestado Médico",
//         id: "atestado-medico-estudante",
//         url: "https://www.orimi.com/pdf-test.pdf",
//         // url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//       },
//       {
//         title: "Carteira de Trabalho",
//         id: "carteira-de-trabalho-estudante",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//       {
//         title: "Certidão de Casamento",
//         id: "certidao-de-casamento-estudante",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//       {
//         title: "Comprovante de Monitoria",
//         id: "comprovante-de-monitoria-estudante",
//         url: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
//       },
//       {
//         title: "Histórico Escolar",
//         id: "historico-escolar-estudante",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//     ],
//   },
//   {
//     title: "Documentação Pai",
//     items: [
//       {
//         title: "Termo de Pensão Alimentícia",
//         id: "termo-de-pensao-alimenticia-pai",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//       {
//         title: "Atestado Médico",
//         id: "atestado-medico-pai",
//         url: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
//       },
//     ],
//   },
//   {
//     title: "Documentação Mãe",
//     items: [
//       {
//         title: "Termo de Pensão Alimentícia",
//         id: "termo-de-pensao-alimenticia-mae",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//     ],
//   },
//   {
//     title: "Documentação Avô",
//     items: [
//       {
//         title: "Termo de Pensão Alimentícia",
//         id: "termo-de-pensao-alimenticia-avo",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//     ],
//   },
// ];

// const simpleMockData: DocumentsSidebarProps["data"] = [
//   {
//     title: "Documentos do Estudante",
//     items: [
//       {
//         title: "Atestado Médico",
//         id: "atestado-medico-estudante",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//       {
//         title: "Carteira de Trabalho",
//         id: "carteira-de-trabalho-estudante",
//         url: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
//       },
//       {
//         title: "Certidão de Casamento",
//         id: "certidao-de-casamento-estudante",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//       {
//         title: "Comprovante de Monitoria",
//         id: "comprovante-de-monitoria-estudante",
//         url: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
//       },
//       {
//         title: "Histórico Escolar",
//         id: "historico-escolar-estudante",
//         url: "https://www.orimi.com/pdf-test.pdf",
//       },
//     ],
//   },
// ]
  
const schema = z.object({
  status: z.string().nonempty("Status é obrigatório"),
  notes: z.string().optional(),
}).merge(criteriaSchema).merge(resultSchema).merge(scoresSchema).superRefine((data, ctx) => {
    if (data.status === "APPROVED") {
        const requiredError = {
            code: z.ZodIssueCode.custom,
            message: "Campo obrigatório quando o status é 'Deferido'",
        };

        if (!data.approved_food_allowance) {
            ctx.addIssue({ ...requiredError, path: ["approved_food_allowance"] });
        }
        if (!data.approved_housing_allowance) {
            ctx.addIssue({ ...requiredError, path: ["approved_housing_allowance"] });
        }
        if (!data.approved_daycare_allowance) {
            ctx.addIssue({ ...requiredError, path: ["approved_daycare_allowance"] });
        }
        if (!data.approved_graduation_scholarship) {
            ctx.addIssue({ ...requiredError, path: ["approved_graduation_scholarship"] });
        }
    }
});

export type FormFields = z.infer<typeof schema>;

export function ReviewSubscription() {
  const navigate = useNavigate();
  const studentRegistrationId = Route.useParams().subscriptionId;

  const { data: studentRegistration } = useSuspenseQuery(studentRegistrationQueryOptions(Number.parseInt(studentRegistrationId)))
  const { data: review } = useSuspenseQuery(studentRegistrationReviewQueryOptions(Number.parseInt(studentRegistrationId)))
  const { data: edital } = useSuspenseQuery(editalQueryOptions(studentRegistration.notice.id))
  const { data: { documents } } = useSuspenseQuery(studentRegistrationDocumentsQueryOptions(Number.parseInt(studentRegistrationId)))
  const { mutate: updateReview } = useMutation(updateReviewMutationOptions);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      notes: "",
      criteria: [],
      // appeal_documents: appeal_documents.reduce((acc, doc) => {
      //   acc[doc.value] = undefined;
      //   return acc;
      // }, {} as Record<string, 'not-required' | 'required'>),
    },
  });

  const selectedStatus = useWatch({ control: form.control, name: "status" });

  useEffect(() => {
    if (selectedStatus !== "APPEAL") {
      form.resetField("appeal_documents");
      form.clearErrors("appeal_documents");
    }
  }, [selectedStatus]);

  const offeredAllowances = {
    daycare_allowance: edital.daycare_allowance,
    food_allowance: edital.food_allowance,
    graduation_scholarship: edital.graduation_scholarship,
    housing_allowance: edital.housing_allowance,
  }
  
  const requestedAllowances = {
    daycare_allowance: studentRegistration.requested_daycare_allowance,
    food_allowance: studentRegistration.requested_food_allowance,
    graduation_scholarship: studentRegistration.requested_graduation_scholarship,
    housing_allowance: studentRegistration.requested_housing_allowance,
  }

  const onSubmit = async (values: FormFields) => {
    if (values.status !== "APPEAL") {
      updateReview({
        studentRegistrationId: Number.parseInt(studentRegistrationId),
        reviewId: review.id,
        data: {
          status: values.status,
          ivs: 40,
          review: {
            notes: values.notes,
          },
          approved_food_allowance: values.approved_food_allowance === "true",
          approved_housing_allowance: values.approved_housing_allowance === "true",
          approved_daycare_allowance: values.approved_daycare_allowance === "true",
          approved_graduation_scholarship: values.approved_graduation_scholarship === "true",
        }
      })
    } else {
      const requestedAppealDocuments = Object.entries(values.appeal_documents || {}).filter(([_, v]) => v === "required").map(([k, _]) => k);

      updateReview({
          studentRegistrationId: Number.parseInt(studentRegistrationId),
          reviewId: review.id,
          data: {
            status: values.status,
            ivs: 40,
            review: {
              notes: values.notes,
            },
            appeal: requestedAppealDocuments.length > 0 ? requestedAppealDocuments.reduce((acc, doc) => {
              acc[doc] = "Por favor, envie o documento solicitado.";
              return acc;
            }, {} as Record<string, string>) : {},
            approved_food_allowance: values.approved_food_allowance === "true",
            approved_housing_allowance: values.approved_housing_allowance === "true",
            approved_daycare_allowance: values.approved_daycare_allowance === "true",
            approved_graduation_scholarship: values.approved_graduation_scholarship === "true",
          }
      })
    }

    toast.success("Avaliação feita com sucesso!");
    navigate({to: "/editais/$id", params: { id: edital.id.toString() }}); 
  }

  const onError = (errors: any) => {
    console.log("Form errors ", errors);
    toast.error("Por favor, verifique os erros no formulário.");
  }

  const documentsData = [
    {
      title: "Documentos do Estudante",
      items: documents.map((doc) => ({
        // Remove extension from doc.name
        title: DOCUMENTS_MAP[doc.name.replace(/\.[^/.]+$/, "")],
        id: `document-${doc.id}`,
        url: doc.file_url,
      })),
    }
  ]

   return (
    <SidebarProvider>
        <DocumentsSidebar  data={documentsData} />
        <SidebarInset className="flex flex-col overflow-auto">
          <ReviewHeader form={form}  studentRegistration={studentRegistration} reviewId={review.id} />
          <Separator />

          <form className="bg-gray-100 h-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto,1fr] gap-6 flex-1 overflow-hidden p-6" onSubmit={form.handleSubmit(onSubmit, onError)}>
            <SectionForm control={form.control} answer={studentRegistration.answer} />
            <SectionEvaluationForm control={form.control} />
            <SectionResult control={form.control} offeredAllowances={offeredAllowances} requestedAllowances={requestedAllowances} />
            <div className="md:col-span-2 h-fit flex justify-end">
              <Button className="w-full max-w-xs mt-4">Finalizar</Button>
            </div>
          </form>
        </SidebarInset>
    </SidebarProvider> 
  )
}