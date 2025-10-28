import { editalQueryOptions } from '@/queries/edital';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardPen } from 'lucide-react';

export const Route = createFileRoute('/student/editais/$id')({
  component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams();
    
    const { data: edital } = useSuspenseQuery(editalQueryOptions(Number(id)));

    const beneficios = [
        { label: 'Auxílio Alimentação', enabled: edital.food_allowance },
        { label: 'Auxílio Moradia', enabled: edital.housing_allowance },
        { label: 'Auxílio Creche', enabled: edital.daycare_allowance },
        { label: 'Bolsa de Graduação', enabled: edital.graduation_scholarship },
    ];

    const beneficiosOfertados = beneficios.filter(b => b.enabled);

    const isEditalOpen = () => {
        const now = new Date();
        const endDate = edital.registration_end_date ? new Date(edital.registration_end_date) : null;
        return endDate && endDate >= now;
    };

    const formatDate = (date: string | null) => {
        if (!date) return "A decidir";
        return new Date(date).toLocaleDateString("pt-BR", { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const isOpen = isEditalOpen();

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
                                        className={`px-3 py-1 ${isOpen ? "bg-green-500" : "bg-red-70"}`}
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
                                    <Button variant="outline" asChild>
                                        <Link
                                            to="/student/editais/$id/inscricao"
                                            params={{ id: String(id) }}
                                        >
                                            <ClipboardPen className="mr-2 h-4 w-4" />
                                            Cadastre-se
                                        </Link>
                                    </Button>
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
        </div>
    )
}