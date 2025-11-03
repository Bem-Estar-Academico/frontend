import EditalCard from '@/components/edital-card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { editaisQueryOptions } from '@/queries/editais';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { studentRegistrationsQueryOptions } from '@/queries/student-registrations';
import type { EditalResponseDTO } from '@/types/edital-response-dto';


export function StudentEditaisList() {
  const { data: editais, isLoading, isError } = useQuery(editaisQueryOptions);

  const { data: studentRegistrations } = useQuery(studentRegistrationsQueryOptions());

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showOpen, setShowOpen] = useState(true);
  const [showClosed, setShowClosed] = useState(true);
  const pageSize = 5;

  const isEditalOpen = (edital: EditalResponseDTO) => {
    const now = new Date();
    const registrationEndDate = new Date(edital.registration_end_date);
    return !edital.registration_end_date || registrationEndDate >= now;
  };

  const filteredEditais = useMemo(() => {
    if (!editais) return [];
    return editais.filter((edital) => {
      const matchesSearch =
        edital.title.toLowerCase().includes(search.toLowerCase()) ||
        edital.description.toLowerCase().includes(search.toLowerCase());
      const isOpen = isEditalOpen(edital);
      const matchesStatus = 
        (showOpen && isOpen) || 
        (showClosed && !isOpen);

      return matchesSearch && matchesStatus;
    });
  }, [editais, search, showOpen, showClosed]);

  if (isLoading) return <p>Carregando editais...</p>;
  if (isError) return <p>Erro ao carregar editais.</p>;

  const totalPages = Math.ceil(filteredEditais.length / pageSize);
  const currentData = filteredEditais.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const activeFiltersCount = [!showOpen, !showClosed].filter(Boolean).length;

  return (
    <div className="flex flex-1 flex-col gap-7 px-10 py-6">
      <h2 className="font-bold text-2xl">Editais</h2>

      <div className="max-h-fit flex gap-3">
        <Input
          placeholder="Buscar edital"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Status do Edital</h4>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="abertos" 
                    checked={showOpen}
                    onCheckedChange={(checked) => {
                      setShowOpen(!!checked);
                      setPage(1);
                    }}
                  />
                  <Label 
                    htmlFor="abertos" 
                    className="cursor-pointer text-sm font-normal"
                  >
                    Abertos
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fechados" 
                    checked={showClosed}
                    onCheckedChange={(checked) => {
                      setShowClosed(!!checked);
                      setPage(1);
                    }}
                  />
                  <Label 
                    htmlFor="fechados" 
                    className="cursor-pointer text-sm font-normal"
                  >
                    Fechados
                  </Label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-6">
        {currentData.length > 0 ? (
          currentData.map((edital) => {
            const isOpen = isEditalOpen(edital);
            return (
              <Link
                key={edital.id}
                to={"/editais/$id"}
                params={{id: String(edital.id)}}
              >
                <EditalCard
                  title={edital.title}
                  description={edital.description}
                  lastModification={new Date(edital.updated_at)}
                  id={edital.id}
                  canSubscribe={isOpen}
                  isOpen={isOpen}
                  registered={studentRegistrations?.some(reg => reg.notice.id === edital.id)}
                />
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500 italic">Nenhum edital encontrado</p>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
  
}