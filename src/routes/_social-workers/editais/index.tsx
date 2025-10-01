import { Sidebar } from "@/components/coordinator/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SemesterSelect } from "@/components/ui/semester-select";
import { YearSelect } from "@/components/ui/year-select";
import { IconPlus } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_social-workers/editais/")({
  component: Editais,
})

const SEMESTERS = ["2021.1", "2021.2", "2022.1", "2022.2", "2023.1", "2023.2", "2024.1", "2024.2"]

export function Editais() {
  return (
    <div className="flex">
        <Sidebar/>
        <div className="flex flex-1 flex-col gap-7">
            <h1 className="text-3xl font-medium px-5 py-4 border-b">Editais</h1>
            <div className="max-h-fit flex flex-1 px-5">
                <div className="flex flex-1 gap-5">
                    <Input
                        placeholder="Buscar edital"
                        onChange={() => {}}
                    />
                    <YearSelect/>
                    <SemesterSelect semesters={SEMESTERS}/>
                </div>
                <div className="flex flex-1 justify-end gap-5">
                    <Link to="/editais/criar">
                        <Button className="cursor-pointer" variant="outline" size="sm">
                            <IconPlus />
                            Criar Edital
                        </Button>
                    </Link>
                     <Button className="cursor-pointer" variant="default" size="sm" onClick={() => {}}>
                        Buscar
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
