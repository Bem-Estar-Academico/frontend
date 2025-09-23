import { createFileRoute } from "@tanstack/react-router";
import { HeaderAssistenteSocial } from "../../components/header-assistente-social";

export const Route = createFileRoute("/editais/$id")({
  component: PageEdital,
});

export function PageEdital() {
  const { id } = Route.useParams();

  return (
    <>
      <HeaderAssistenteSocial name={"Maria da Silva"} />
      <div>Puxar o edital com id: {id}</div>
    </>
  );
}
