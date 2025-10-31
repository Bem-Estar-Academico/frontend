import EditalCard from "@/components/edital-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconPlus } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { editaisQueryOptions } from "@/queries/editais";

export const Route = createFileRoute("/_app/_coordinator/editais/")({
  component: () => (
    <>
      <title>Editais | BEA</title>
      <Editais/>
    </>
  ),
});

export function Editais() {
  const { data: editais, isLoading, isError } = useQuery(editaisQueryOptions);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredEditais = useMemo(() => {
    if (!editais) return [];
    return editais.filter((edital) => {
      const matchesSearch =
        edital.title.toLowerCase().includes(search.toLowerCase()) ||
        edital.description.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [editais, search]);

  if (isLoading) return <p>Carregando editais...</p>;
  if (isError) return <p>Erro ao carregar editais.</p>;

  const totalPages = Math.ceil(filteredEditais.length / pageSize);
  const currentData = filteredEditais.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="flex flex-1 flex-col gap-7">
       <h1 className="font-bold text-2xl">Editais</h1>

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
        </div>
        <div className="flex flex-1 justify-end gap-5">
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
            <Link
              key={edital.id}
              to={"/editais/$id"}
              params={{ id: String(edital.id) }}
            >
              <EditalCard
                id={edital.id}
                title={edital.title}
                description={edital.description}
                lastModification={new Date(edital.updated_at)}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500 italic">Nenhum edital encontrado</p>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
