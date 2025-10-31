import { StudentDataTable } from "@/components/students/student-table";
import RegistrationStatusGraphic from "@/components/registration-status-graphic";
import { createFileRoute } from "@tanstack/react-router";
import { editalQueryOptions } from "@/queries/edital";
import { useSuspenseQuery } from "@tanstack/react-query";
import { noticeRegistrationsQueryOptions } from "@/queries/notice-registrations";
import type { Registration } from "@/types/students-registration";
import type { RegistrationItem } from "@/types/notice-registrations";

export const Route = createFileRoute("/_app/_social-workers/editais/$id")({
  loader: ({ context: { queryClient }, params: { id } }) => queryClient.ensureQueryData(editalQueryOptions(Number(id))),
  component: PageEdital,
});

export function PageEdital() {
  const { id } = Route.useParams();
  const { data: edital } = useSuspenseQuery(editalQueryOptions(Number(id)));
  const { data: noticeRegistrations } = useSuspenseQuery(
    noticeRegistrationsQueryOptions(Number(id))
  );

  if (!edital) {
    return <p>Edital não encontrado</p>;
  }
  
  const chartData = [
    { name: "Pendente", value: noticeRegistrations.pending_count || 100, color: "var(--color-gray-500)" },
    { name: "Deferido", value: noticeRegistrations.approved_count || 100, color: "var(--color-green-500)" },
    { name: "Indeferido", value: noticeRegistrations.reject_count || 100, color: "var(--color-red-500)" },
    { name: "Em Análise", value: noticeRegistrations.review_count || 100, color: "var(--color-yellow-500)" },
    { name: "Em Recurso", value: noticeRegistrations.appeal_count || 100, color: "var(--color-blue-500)" },
  ]

  const statusTranslation: Record<
    Registration["status"],
    "Pendente" | "Deferido" | "Indeferido" | "Em Recurso" | "Em Análise"
  > = {
    PENDING: "Pendente",
    APPROVED: "Deferido",
    REJECTED: "Indeferido",
    APPEAL: "Em Recurso",
    REVIEW: "Em Análise",
    CANCELLED: "Indeferido"
  };

  const students = noticeRegistrations.registrations.map(
    (registration: RegistrationItem) => ({
      id: registration.student.id,
      cpf: registration.student.cpf,
      nome: registration.student.full_name,
      matricula: registration.student.registration_number,
      status: registration.review ? statusTranslation[registration.review.status as Registration["status"]] : "Pendente",
      progresso: registration.review ? registration.review.progress : 0,
      documentos: registration.review ? registration.review.qtd_document : 0,
      dataInscricao: registration.registration_date ? registration.registration_date : new Date().toISOString(),
    })
  );

  return (
    <>
      <title>{edital.title}</title>
      <section className="text-sm font-medium" dir="ltr">
        <h1 className="font-bold text-2xl">{edital.title}</h1>
        <div className="text-sm font-medium flex items-center justify-between flex-wrap gap-6">
          <div className="grid grid-cols-3 gap-10">
            <div className="flex-col">
              <div>Início das Inscrições</div>
              <div className="text-xs font-light">
                {edital.registration_start_date === null
                  ? "--/--/----"
                  : new Date(
                      edital.registration_start_date
                    ).toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Término das Inscrições</div>
              <div className="text-xs font-light">
                {edital.registration_end_date === null
                  ? "--/--/----"
                  : new Date(edital.registration_end_date).toLocaleDateString(
                      "pt-BR"
                    )}
              </div>
            </div>
            <div className="flex-col">
              <div>Divulgação do Resultado Preliminar</div>
              <div className="text-xs font-light">
                {edital.preliminary_result_date === null
                  ? "--/--/----"
                  : new Date(
                      edital.preliminary_result_date
                    ).toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Início da Fase de Recursos</div>
              <div className="text-xs font-light">
                {edital.appeal_start_date === null
                  ? "--/--/----"
                  : new Date(edital.appeal_start_date).toLocaleDateString(
                      "pt-BR"
                    )}
              </div>
            </div>
            <div className="flex-col">
              <div>Término da Fase de Recursos</div>
              <div className="text-xs font-light">
                {edital.appeal_end_date === null
                  ? "--/--/----"
                  : new Date(edital.appeal_end_date).toLocaleDateString(
                      "pt-BR"
                    )}
              </div>
            </div>
            <div className="flex-col">
              <div>Divulgação do Resultado Final</div>
              <div className="text-xs font-light">
                {edital.final_result_date === null
                  ? "--/--/----"
                  : new Date(edital.final_result_date).toLocaleDateString(
                      "pt-BR"
                    )}
              </div>
            </div>
          </div>
          <div className="flex items-center content-center justify-center">
            <RegistrationStatusGraphic dataRegistration={chartData} />
          </div>
        </div>
      </section>
      <section>
        <StudentDataTable data={students} />
      </section>
    </>
  );
}