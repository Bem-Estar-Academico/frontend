import EditalCard from '@/components/edital-card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { editaisQueryOptions } from '@/queries/editais';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react';
import { studentRegistrationsQueryOptions } from '@/queries/student-registrations';
import type { EditalResponseDTO } from '@/types/edital-response-dto';
import { Filter } from '@/components/filter';
import { CheckCircle2, XCircle, Utensils, Home, Baby, GraduationCap } from 'lucide-react';

export function StudentEditaisList() {
  const { data: editais, isLoading, isError } = useQuery(editaisQueryOptions);
  const { data: studentRegistrations } = useQuery(studentRegistrationsQueryOptions());

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [benefitsFilter, setBenefitsFilter] = useState<Set<string>>(new Set());
  const pageSize = 5;

  const isEditalOpen = (edital: EditalResponseDTO) => {
    const now = new Date();
    const registrationEndDate = new Date(edital.registration_end_date);
    return !edital.registration_end_date || registrationEndDate >= now;
  };

  const statusOptions = [
    { label: 'Aberto', value: 'open', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { label: 'Fechado', value: 'closed', icon: <XCircle className="h-4 w-4 text-red-600" /> },
  ];

  const benefitsOptions = [
    { label: 'Auxílio Alimentação', value: 'food_allowance', icon: <Utensils className="h-4 w-4" /> },
    { label: 'Auxílio Moradia', value: 'housing_allowance', icon: <Home className="h-4 w-4" /> },
    { label: 'Auxílio Creche', value: 'daycare_allowance', icon: <Baby className="h-4 w-4" /> },
    { label: 'Bolsa Graduação', value: 'graduation_scholarship', icon: <GraduationCap className="h-4 w-4" /> },
  ];

  const filteredEditais = useMemo(() => {
    if (!editais) return [];
    return editais.filter((edital) => {
      const matchesSearch =
        edital.title.toLowerCase().includes(search.toLowerCase()) ||
        edital.description.toLowerCase().includes(search.toLowerCase());

      const isOpen = isEditalOpen(edital);
      const matchesStatus =
        statusFilter.size === 0 ||
        (statusFilter.has('open') && isOpen) ||
        (statusFilter.has('closed') && !isOpen);

      const matchesBenefits =
        benefitsFilter.size === 0 ||
        Array.from(benefitsFilter).every((benefit) => 
          edital[benefit as keyof EditalResponseDTO] === true
        );

      return matchesSearch && matchesStatus && matchesBenefits;
    });
  }, [editais, search, statusFilter, benefitsFilter]);

  if (isLoading) return <p>Carregando editais...</p>;
  if (isError) return <p>Erro ao carregar editais.</p>;

  const totalPages = Math.ceil(filteredEditais.length / pageSize);
  const currentData = filteredEditais.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="flex flex-1 flex-col gap-7 px-10 py-6">
      <h2 className="font-bold text-2xl">Editais</h2>

      <div className="flex gap-3 items-center">
        <Input
          placeholder="Buscar edital"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />
        
        <Filter
          title="Status"
          options={statusOptions}
          selectedValues={statusFilter}
          onChange={(newValues) => {
            setStatusFilter(newValues);
            setPage(1);
          }}
        />

        <Filter
          title="Benefícios"
          options={benefitsOptions}
          selectedValues={benefitsFilter}
          onChange={(newValues) => {
            setBenefitsFilter(newValues);
            setPage(1);
          }}
        />
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