import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_social-workers/editais/$id")({
  component: PageEdital,
}); 

export function PageEdital() {
  const { id } = Route.useParams();

  return (
    <>
      <div>Puxar o edital com id: {id}</div>
    </>
  );
}
