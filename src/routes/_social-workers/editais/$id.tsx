import { StudentDataTable } from "@/components/students/student-table";
import RegistrationStatusGraphic from "@/components/registration-status-graphic";
import { createFileRoute } from "@tanstack/react-router";
import { editalQueryOptions } from "@/queries/edital";
import { useSuspenseQuery } from "@tanstack/react-query";
import { studentsRegistrationsQueryOptions } from "@/queries/students-registrations";
import type { StudentRegistration } from "@/types/student-registration";

export const Route = createFileRoute("/_social-workers/editais/$id")({
  component: PageEdital,
  loader: ({ context: { queryClient }, params: { id } }) => queryClient.ensureQueryData(editalQueryOptions(Number(id)))
});

export function PageEdital() {
  const { id } = Route.useParams();
  const { data: edital } = useSuspenseQuery(editalQueryOptions(Number(id)));
  const { data: studentsRegistrations } = useSuspenseQuery(
    studentsRegistrationsQueryOptions(Number(id))
  );

  if (!edital) {
    return <p>Edital não encontrado</p>;
  }

  const statusCounts = studentsRegistrations.registrations.reduce(
    (acc, registration: StudentRegistration) => {
      acc[registration.status] = (acc[registration.status] || 0) + 1;
      return acc;
    },
    {} as Record<StudentRegistration["status"], number>
  );

  const statusMap = {
    PENDING: { name: "Pendentes", color: "var(--color-gray-500)" },
    APPROVED: { name: "Deferido", color: "var(--color-green-400)" },
    REJECTED: { name: "Indeferido", color: "var(--color-red-400)" },
    CANCELLED: { name: "Cancelados", color: "var(--color-purple-400)" },
    APPEAL: { name: "Em Recurso", color: "var(--color-purple-400)" },
    ANALISYS: { name: "Em Análise", color: "var(--color-blue-500)" }
  };

  const chartData = Object.entries(statusCounts).map(([status, value]) => ({
    name: statusMap[status as keyof typeof statusMap].name,
    value,
    color: statusMap[status as keyof typeof statusMap].color,
  }));

  const statusTranslation: Record<
    StudentRegistration["status"],
    "Pendente" | "Deferido" | "Indeferido" | "Em Recurso" | "Em Análise"
  > = {
    PENDING: "Pendente",
    APPROVED: "Deferido",
    REJECTED: "Indeferido",
    APPEAL: "Em Recurso",
    ANALISYS: "Em Análise",
    CANCELLED: "Indeferido"
  };

  const students = studentsRegistrations.registrations.map(
    (registration: StudentRegistration) => ({
      id: registration.student.id,
      cpf: registration.student.cpf,
      nome: registration.student.full_name,
      matricula: registration.student.registration_number,
      status: statusTranslation[registration.status],
      progresso: Math.ceil(Math.random() * 100),
      documentos: Math.ceil(Math.random() * 10),
      dataInscricao: registration.registration_date,
    })
  );

  return (
    <>
      <section className="text-sm font-medium px-10" dir="ltr">
        <h2 className="text-xl pt-6 mb-6">{edital.title}</h2>
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
      <section className="px-10">
        <StudentDataTable data={students} />
      </section>
    </>
  );
}