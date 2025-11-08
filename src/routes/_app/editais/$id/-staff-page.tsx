import { RegistrationsDataTable, type Item } from "@/components/students/registrations-data-table";
import RegistrationStatusGraphic from "@/components/registration-status-graphic";
import { editalQueryOptions } from "@/queries/edital";
import { useSuspenseQuery } from "@tanstack/react-query";
import { noticeRegistrationsQueryOptions } from "@/queries/notice-registrations";
import type { Registration } from "@/types/students-registration";

import { Route } from ".";

export function StaffEditaisComponent() {
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

  const registrations: Item[] = noticeRegistrations.registrations.map(
    (registration) => ({
      registration_id: registration.id,
      cpf: registration.student.cpf,
      full_name: registration.student.name,
      registration_number: registration.student.registration_number,
      status: registration.review.status,
      qtd_documents: registration.review ? registration.review.qtd_document : 0,
      registration_date: registration.registration_date ? registration.registration_date : new Date().toISOString(),
      editalId: String(edital.id),
    })
  );

  return (
    <div className="px-10 py-6">
      <title>{edital.title}</title>
      <section className="text-sm font-medium" dir="ltr">
        <h1 className="font-bold text-2xl mb-6">{edital.title}</h1>
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
        <RegistrationsDataTable data={registrations} />
      </section>
    </div>
  );
}