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
import { Calendar, Users, BarChart3, Clock, CheckCircle } from "lucide-react"; // Importando ícones úteis

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
  
  const totalInscricoes = noticeRegistrations.pending_count + noticeRegistrations.approved_count + noticeRegistrations.reject_count + noticeRegistrations.review_count + noticeRegistrations.appeal_count;

  const chartData = [
    { name: "Pendente", value: noticeRegistrations.pending_count || 0, color: "var(--color-gray-500)" },
    { name: "Deferido", value: noticeRegistrations.approved_count || 0, color: "var(--color-green-600)" },
    { name: "Indeferido", value: noticeRegistrations.reject_count || 0, color: "var(--color-red-600)" },
    { name: "Em Análise", value: noticeRegistrations.review_count || 0, color: "var(--color-yellow-500)" },
    { name: "Em Recurso", value: noticeRegistrations.appeal_count || 0, color: "var(--color-blue-500)" },
  ]; 

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
  
  const isEditalOpen = edital.registration_end_date && new Date(edital.registration_end_date) > new Date();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* CABEÇALHO DO EDITAL */}
        <header className="space-y-2 pb-4 border-b">
          <h1 className="text-3xl font-bold tracking-tight">{edital.title}</h1>
          <p className="text-muted-foreground">{edital.description}</p>
          {beneficiosOfertados.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {beneficiosOfertados.map((beneficio) => (
                <Badge 
                  key={beneficio.label}
                  variant="default"
                  className="px-3 py-1 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  {beneficio.label}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2"> 
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                Status de Inscrições
              </CardTitle>
              <CardDescription className="text-sm">
                Distribuição atual das inscrições
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="h-64 flex items-center justify-center "> 
                <RegistrationStatusGraphic dataRegistration={chartData} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                {chartData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color.replace('var(', '').replace(')', '') }}></div>
                        <span className="text-sm font-medium">{item.name}:</span>
                        <span className="text-sm font-bold">{item.value}</span>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Inscrições
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalInscricoes}</div>
                <p className="text-xs text-muted-foreground">
                  Inscritos no edital
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Status Atual
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isEditalOpen ? 'text-green-600' : 'text-red-600'}`}>
                  {isEditalOpen ? "Aberto" : "Fechado"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Período de inscrições
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inscrições Deferidas
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {noticeRegistrations.approved_count || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Inscrições aprovadas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CRONOGRAMA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Cronograma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              <ScheduleItem 
                title="Início das Inscrições" 
                date={formatDate(edital.registration_start_date)}
              />

              <ScheduleItem 
                title="Término das Inscrições" 
                date={formatDate(edital.registration_end_date)}
              />

              <ScheduleItem 
                title="Resultado Preliminar" 
                date={formatDate(edital.preliminary_result_date)}
              />

              <ScheduleItem 
                title="Início dos Recursos" 
                date={formatDate(edital.appeal_start_date)}
              />

              <ScheduleItem 
                title="Término dos Recursos" 
                date={formatDate(edital.appeal_end_date)}
              />

              <ScheduleItem 
                title="Resultado Final" 
                date={formatDate(edital.final_result_date)}
              />
            </div>
          </CardContent>
        </Card>

        <section >
          <h2 className="text-2xl font-bold mb-4 pt-6 border-t">Lista de Estudantes Inscritos</h2>
          <StudentDataTable data={students} />
        </section>
      </div>
    </div>
  );
}

const ScheduleItem = ({ title, date, isFinal = false }: { title: string, date: string, isFinal?: boolean }) => (
    <div className="space-y-1 p-2 border-l-4 border-indigo-200 hover:border-indigo-500 transition-colors">
        <div className={`text-sm font-semibold ${isFinal ? 'text-indigo-600' : 'text-gray-700'}`}>
            {title}
        </div>
        <div className={`text-base font-medium ${isFinal ? 'text-indigo-800' : 'text-gray-900'}`}>
            {date}
        </div>
    </div>
);