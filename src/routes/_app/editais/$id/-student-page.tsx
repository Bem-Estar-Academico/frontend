import { editalQueryOptions } from '@/queries/edital';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck, ClipboardPen } from 'lucide-react';
import { studentRegistrationsQueryOptions } from '@/queries/student-registrations';
import type { EditalResponseDTO } from '@/types/edital-response-dto';
import { Route } from '.';

export function StudentEditaisComponent() {
    const { id } = Route.useParams();
    const { data: edital } = useSuspenseQuery(editalQueryOptions(Number(id)));
    const { data: studentRegistrations } = useQuery(studentRegistrationsQueryOptions());

    const beneficios = [
        { label: 'Auxílio Alimentação', enabled: edital.food_allowance },
        { label: 'Auxílio Moradia', enabled: edital.housing_allowance },
        { label: 'Auxílio Creche', enabled: edital.daycare_allowance },
        { label: 'Bolsa de Graduação', enabled: edital.graduation_scholarship },
    ];

    const beneficiosOfertados = beneficios.filter(b => b.enabled);

    const isEditalOpen = (edital: EditalResponseDTO) => {
      const now = new Date();
      const registrationEndDate = new Date(edital.registration_end_date);
      return !edital.registration_end_date || registrationEndDate >= now;
    };

    const formatDate = (date: string | null) => {
        if (!date) return "A decidir";
        return new Date(date).toLocaleDateString("pt-BR", { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const isOpen = isEditalOpen(edital);

    return (
        <div className="min-h-screen">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-6 flex-wrap">
                        <div className="flex-1 space-y-4">
                            <div className="flex gap-4 items-center flex-wrap">
                                <CardTitle className="text-xl">
                                    {edital.title}
                                </CardTitle>
                                <Badge 
                                    variant="default"
                                    className={`px-3 py-1 ${isOpen ? "bg-green-500" : "bg-red-700"}`}
                                >
                                    {isOpen ? "Aberto" : "Fechado"}
                                </Badge>
                            </div>
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
                        {isOpen && (
                            <div className="self-start">
                                {studentRegistrations?.some(reg => reg.notice.id === edital.id) ? (
                                    <Button variant={"outline"} disabled>
                                        <ClipboardCheck/>
                                        Inscrito
                                    </Button>
                                    ) : (
                                    <Button variant={"outline"} asChild>
                                        <Link
                                        to={"/editais/$id/inscricao"}
                                        params={{ id: String(id) }}
                                        >
                                        <ClipboardPen/>
                                        Cadastre-se
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        )}
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
        </div>
        <Outlet />
        </div>
    )
}

