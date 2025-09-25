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
      <section>
        <h2>{edital.name}</h2>
        <div className="flex items-center justify-between px-6">
          <div className="flex flex-wrap">
            <div>
              <div className="flex-col px-6">
                <div>Data de Início das Inscrições:</div>
                <div>{edital.beginDateRegistration.toDateString()}</div>
              </div>
            </div>
            <div className="flex-col px-6">
              <div>Data de Término das Inscrições:</div>
              <div>{edital.endDateRegistration.toDateString()}</div>
            </div>
            <div className="flex-col px-6">
              <div>Data de Divulgação do Resultado Preliminar:</div>
              <div>{edital.preliminaryResultsDate.toDateString()}</div>
            </div>
            <div className="flex-col px-6">
              <div>Data de Início da Fase de Recursos:</div>
              <div>{edital.beginAppealsPhaseDate.toDateString()}</div>
            </div>
            <div className="flex-col px-6">
              <div>Data de Término da Fase de Recursos:</div>
              <div>{edital.endAppealsPhaseDate.toDateString()}</div>
            </div>
            <div className="flex-col px-6">
              <div>Data de Divulgação do Resultado Final:</div>
              <div>{edital.finalResultsDate.toDateString()}</div>
            </div>
          </div>
          <div>Grafico</div>
        </div>
      </section>
    </>
  );
}
