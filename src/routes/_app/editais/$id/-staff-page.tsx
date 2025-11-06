import { StudentDataTable } from "@/components/students/student-table";
import RegistrationStatusGraphic from "@/components/registration-status-graphic";
import { editalQueryOptions } from "@/queries/edital";
import { useSuspenseQuery } from "@tanstack/react-query";
import { noticeRegistrationsQueryOptions } from "@/queries/notice-registrations";
import type { Registration } from "@/types/students-registration";
import type { RegistrationItem } from "@/types/notice-registrations";
import { Route } from ".";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StaffEditaisComponent() {
  const { id } = Route.useParams();
  const { data: edital } = useSuspenseQuery(editalQueryOptions(Number(id)));
  const { data: noticeRegistrations } = useSuspenseQuery(
    noticeRegistrationsQueryOptions(Number(id))
  );

  if (!edital) {
    return <p>Edital não encontrado</p>;
  }

  const beneficios = [
    { label: 'Auxílio Alimentação', enabled: edital.food_allowance },
    { label: 'Auxílio Moradia', enabled: edital.housing_allowance },
    { label: 'Auxílio Creche', enabled: edital.daycare_allowance },
    { label: 'Bolsa de Graduação', enabled: edital.graduation_scholarship },
  ];

  const beneficiosOfertados = beneficios.filter(b => b.enabled);
  
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

  const formatDate = (date: string | null) => {
    if (!date) return "A decidir";
    return new Date(date).toLocaleDateString("pt-BR", { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
  };  

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="flex-1 space-y-4">
                <CardTitle className="text-xl">
                  {edital.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {edital.description}
                </CardDescription>
                {beneficiosOfertados.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {beneficiosOfertados.map((beneficio) => (
                      <Badge 
                        key={beneficio.label}
                        variant="outline" 
                        className="px-3 py-1 text-sm font-medium"
                      >
                        {beneficio.label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center content-center justify-center">
                <RegistrationStatusGraphic dataRegistration={chartData} />
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cronograma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Início das Inscrições
                </div>
                <div className="text-sm">
                  {formatDate(edital.registration_start_date)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Término das Inscrições
                </div>
                <div className="text-sm">
                  {formatDate(edital.registration_end_date)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Resultado Preliminar
                </div>
                <div className="text-sm">
                  {formatDate(edital.preliminary_result_date)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Início dos Recursos
                </div>
                <div className="text-sm">
                  {formatDate(edital.appeal_start_date)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Término dos Recursos
                </div>
                <div className="text-sm">
                  {formatDate(edital.appeal_end_date)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Resultado Final
                </div>
                <div className="text-sm">
                  {formatDate(edital.final_result_date)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <section>
          <StudentDataTable data={students} />
        </section>
      </div>
    </div>
  );
}