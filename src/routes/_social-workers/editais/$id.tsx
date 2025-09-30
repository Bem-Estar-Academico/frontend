import { StudentDataTable } from "@/components/students/student-table";
import { createFileRoute } from "@tanstack/react-router";
import { students } from "./-data";

export const Route = createFileRoute("/_social-workers/editais/$id")({
  component: PageEdital,
}); 

export function PageEdital() {
  const { id } = Route.useParams();

  return (
    <div>
      Edital {id}
      <StudentDataTable  data={students} />
    </div>
  );
}