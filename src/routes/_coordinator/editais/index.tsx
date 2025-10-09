import EditalCard from "@/components/edital-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SemesterSelect } from "@/components/ui/semester-select";
import { YearSelect } from "@/components/ui/year-select";
import { IconPlus } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Pagination } from "@/components/ui/pagination";

export const Route = createFileRoute("/_coordinator/editais/")({
  component: Editais,
});

const SEMESTERS = [
  "2021.1",
  "2021.2",
  "2022.1",
  "2022.2",
  "2023.1",
  "2023.2",
  "2024.1",
  "2024.2",
];

const editais = [
  {
    id: "1",
    title: "Cadastramento Socioeconômico 2021.1",
    description:
      "Edital N. 09/2021 Proest - Cadastramento Socioeconômico 2021.1",
    lastModification: new Date("2021-02-15"),
  },
  {
    id: "2",
    title: "Auxílio Permanência 2021.2",
    description: "Edital N. 05/2021 Proest - Auxílio Permanência",
    lastModification: new Date("2021-09-10"),
  },
];

export function Editais() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState<string | undefined>(undefined);
  const [semester, setSemester] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handleClearFilters = () => {
    setSearch("");
    setYear(undefined);
    setSemester(undefined);
    setPage(1);
  };

  const filteredEditais = useMemo(() => {
    return editais.filter((edital) => {
      const matchesSearch =
        edital.title.toLowerCase().includes(search.toLowerCase()) ||
        edital.description.toLowerCase().includes(search.toLowerCase());

      const matchesYear = year ? edital.title.includes(year) : true;
      const matchesSemester = semester ? edital.title.includes(semester) : true;

      return matchesSearch && matchesYear && matchesSemester;
    });
  }, [search, year, semester]);

  const totalPages = Math.ceil(filteredEditais.length / pageSize);
  const currentData = filteredEditais.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="flex flex-1 flex-col gap-7">
      <h1 className="text-3xl font-medium px-5 py-4 border-b">Editais</h1>

      <div className="max-h-fit flex flex-1 px-5">
        <div className="flex flex-1 gap-5">
          <Input
            placeholder="Buscar edital"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <YearSelect
            value={year}
            onChange={(val) => {
              setYear(val);
              setPage(1);
            }}
          />
          <SemesterSelect
            semesters={SEMESTERS}
            value={semester}
            onChange={(val) => {
              setSemester(val);
              setPage(1);
            }}
          />
        </div>
        <div className="flex flex-1 justify-end gap-5">
          <Button variant="ghost" onClick={handleClearFilters}>
            Limpar filtros
          </Button>
          <Link to="/editais/criar">
            <Button variant="default">
              <IconPlus />
              Criar Edital
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col px-5 gap-6">
        {currentData.length > 0 ? (
          currentData.map((edital) => (
            <Link key={edital.id} to={`/editais/${edital.id}`}>
              <EditalCard
                title={edital.title}
                description={edital.description}
                lastModification={edital.lastModification}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500 italic">Nenhum edital encontrado</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
