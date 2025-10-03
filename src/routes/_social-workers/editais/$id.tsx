import { StudentDataTable } from "@/components/students/student-table";
import RegistrationStatusGraphic, { type RegistrationData } from "@/components/registration-status-graphic";
import { createFileRoute } from "@tanstack/react-router";
import { students } from "./-data";

export const Route = createFileRoute("/_social-workers/editais/$id")({
  component: PageEdital,
});

interface EditalData {
  dataGraphic: Array<RegistrationData>;
  id: number;
  name: string;
  beginDateRegistration: Date;
  endDateRegistration: Date | null;
  preliminaryResultsDate: Date | null;
  beginAppealsPhaseDate: Date | null;
  endAppealsPhaseDate: Date | null;
  finalResultsDate: Date | null;
}

const mockData: EditalData[] = [
  {
    id: 1,
    name: "Edital 2025.1",
    beginDateRegistration: new Date("2025-04-21"),
    endDateRegistration: new Date("2025-05-22"),
    preliminaryResultsDate: new Date("2025-06-29"),
    beginAppealsPhaseDate: new Date("2025-07-21"),
    endAppealsPhaseDate: new Date("2025-08-22"),
    finalResultsDate: new Date("2025-09-25"),
    dataGraphic: [
      { name: "Deferido", value: 400, color: "#4ADE80" },
      { name: "Indeferido", value: 300, color: "#EF4444" },
      { name: "Recurso", value: 300, color: "#A855F7" },
      { name: "Pendente", value: 200, color: "#9CA3AF" },
      { name: "Em Análise", value: 100, color: "#60A5FA" },
    ],
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
    dataGraphic: [
      { name: "Deferido", value: 100, color: "#4ADE80" },
      { name: "Indeferido", value: 300, color: "#EF4444" },
      { name: "Recurso", value: 20, color: "#A855F7" },
      { name: "Pendente", value: 250, color: "#9CA3AF" },
      { name: "Em Análise", value: 150, color: "#60A5FA" },
    ],
  },
  {
    id: 3,
    name: "Edital 2024.1",
    beginDateRegistration: new Date("2025-09-25"),
    endDateRegistration: null,
    preliminaryResultsDate: new Date("2025-09-25"),
    beginAppealsPhaseDate: new Date("2025-09-25"),
    endAppealsPhaseDate: new Date("2025-09-25"),
    finalResultsDate: new Date("2025-09-25"),
    dataGraphic: [
      { name: "Deferido", value: 4000, color: "#4ADE80" },
      { name: "Indeferido", value: 300, color: "#EF4444" },
      { name: "Recurso", value: 700, color: "#A855F7" },
      { name: "Pendente", value: 200, color: "#9CA3AF" },
      { name: "Em Análise", value: 100, color: "#60A5FA" },
    ],
  },
  {
    id: 4,
    name: "Edital 2025.2",
    beginDateRegistration: new Date("2025-09-25"),
    endDateRegistration: new Date("2025-09-25"),
    preliminaryResultsDate: new Date("2025-09-25"),
    beginAppealsPhaseDate: new Date("2025-09-25"),
    endAppealsPhaseDate: new Date("2025-09-25"),
    finalResultsDate: null,
    dataGraphic: [
      { name: "Deferido", value: 200, color: "#4ADE80" },
      { name: "Indeferido", value: 100, color: "#EF4444" },
      { name: "Recurso", value: 350, color: "#A855F7" },
      { name: "Pendente", value: 100, color: "#9CA3AF" },
      { name: "Em Análise", value: 50, color: "#60A5FA" },
    ],
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
      <section className="text-sm font-medium px-10" dir="ltr">
        <h2 className="text-xl pt-6">{edital.name}</h2>
        <div className="text-sm font-medium flex items-center justify-between">
          <div className="grid grid-cols-3 gap-10">
            <div className="flex-col">
              <div>Início das Inscrições</div>
              <div className="text-xs font-light">
                {(edital.beginDateRegistration === null)
                  ? "--/--/----"
                  : edital.beginDateRegistration.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Término das Inscrições</div>
              <div className="text-xs font-light">
                {(edital.endDateRegistration === null)
                  ? "--/--/----"
                  : edital.endDateRegistration.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Divulgação do Resultado Preliminar</div>
              <div className="text-xs font-light">
                {(edital.preliminaryResultsDate === null)
                  ? "--/--/----"
                  : edital.preliminaryResultsDate.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Início da Fase de Recursos</div>
              <div className="text-xs font-light">
                {(edital.beginAppealsPhaseDate === null)
                  ? "--/--/----"
                  : edital.beginAppealsPhaseDate.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Término da Fase de Recursos</div>
              <div className="text-xs font-light">
                {(edital.endAppealsPhaseDate === null)
                  ? "--/--/----"
                  : edital.endAppealsPhaseDate.toLocaleDateString("pt-BR")}
              </div>
            </div>
            <div className="flex-col">
              <div>Divulgação do Resultado Final</div>
              <div className="text-xs font-light">
                {(edital.finalResultsDate === null)
                  ? "--/--/----"
                  : edital.finalResultsDate.toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>
          <div className="flex items-center content-center justify-center">
            <RegistrationStatusGraphic dataRegistration={edital.dataGraphic} />
          </div>
        </div>
      </section>
      <section className="px-10">
        <StudentDataTable data={students} />
      </section>
    </>
  );
}