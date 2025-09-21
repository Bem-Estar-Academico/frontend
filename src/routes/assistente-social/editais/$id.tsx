import { createFileRoute } from "@tanstack/react-router"
import { PageEdital } from "@/components/assistente-social/editais/page-edital"

export const Route = createFileRoute("/assistente-social/editais/$id")({
  component: Edital,
})

function Edital() {
  const { id } = Route.useParams()
  
  //Pensar em nos parametros!

  return <PageEdital id={id} name={"Maria da Silva"} />
}
