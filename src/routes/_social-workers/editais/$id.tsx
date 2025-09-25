import RegistrationStatusGraphic from "@/components/registration-status-graphic";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_social-workers/editais/$id")({
  component: PageEdital,
});

interface EditalData {
  id: number;
  name: string;
  beginDateRegistration: Date;
  endDateRegistration: Date;
  preliminaryResultsDate: Date;
  beginAppealsPhaseDate: Date;
  endAppealsPhaseDate: Date;
  finalResultsDate: Date;
}

const mockData: EditalData[] = [
  {
    id: 1,
    name: "Edital 2025.1",
    beginDateRegistration: new Date("2025-09-25"),
    endDateRegistration: new Date("2025-08-22"),
    preliminaryResultsDate: new Date("2025-07-21"),
    beginAppealsPhaseDate: new Date("2025-06-29"),
    endAppealsPhaseDate: new Date("2025-05-22"),
    finalResultsDate: new Date("2025-04-21"),
  },
  {
    id: 2,
    name: "Edital 2025.2",
    beginDateRegistration: new Date("2025-09-25"),
    endDateRegistration: new Date("2025-09-25"),
    preliminaryResultsDate: new Date("2025-09-25"),
    beginAppealsPhaseDate: new Date("2025-09-25"),
    endAppealsPhaseDate: new Date("2025-09-25"),
    finalResultsDate: new Date("2025-09-25"),
  },
  {
    id: 3,
    name: "Edital 2024.1",
    beginDateRegistration: new Date("2025-09-25"),
    endDateRegistration: new Date("2025-09-25"),
    preliminaryResultsDate: new Date("2025-09-25"),
    beginAppealsPhaseDate: new Date("2025-09-25"),
    endAppealsPhaseDate: new Date("2025-09-25"),
    finalResultsDate: new Date("2025-09-25"),
  },
  {
    id: 4,
    name: "Edital 2025.2",
    beginDateRegistration: new Date("2025-09-25"),
    endDateRegistration: new Date("2025-09-25"),
    preliminaryResultsDate: new Date("2025-09-25"),
    beginAppealsPhaseDate: new Date("2025-09-25"),
    endAppealsPhaseDate: new Date("2025-09-25"),
    finalResultsDate: new Date("2025-09-25"),
  },
];

export function PageEdital() {
  const { id } = Route.useParams();

  const edital = mockData.find((e) => e.id === Number(id));

  if (!edital) {
    return <p>Edital não encontrado</p>;
  }

  return (
    <>
      <section className="text-sm font-medium px-15" dir="ltr">
        <h2 className="text-xl pb-10 pt-6">{edital.name}</h2>
        <div className="text-sm font-medium flex items-center justify-between">
          <div className="grid grid-cols-3 gap-12">
            <div className="flex-col">
              <div>Data de Início das Inscrições</div>
              <div className="text-xs font-light">
                {edital.beginDateRegistration.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Data de Término das Inscrições</div>
              <div className="text-xs font-light">
                {edital.endDateRegistration.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Data de Divulgação do Resultado Preliminar</div>
              <div className="text-xs font-light">
                {edital.preliminaryResultsDate.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Data de Início da Fase de Recursos</div>
              <div className="text-xs font-light">
                {edital.beginAppealsPhaseDate.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Data de Término da Fase de Recursos</div>
              <div className="text-xs font-light">
                {edital.endAppealsPhaseDate.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Data de Divulgação do Resultado Final</div>
              <div className="text-xs font-light">
                {edital.finalResultsDate.toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>
          <div>
            <RegistrationStatusGraphic />
          </div>
        </div>
      </section>
    </>
  );
}
