import { createFileRoute } from "@tanstack/react-router"
import { PageIVS } from "@/components/assistente-social/consultar-ivs/page-ivs"

export const Route = createFileRoute("/assistente-social/consultar-ivs/$id")({
  component: IVS,
})

function IVS() {
  const { id } = Route.useParams()
  
  //Pensar em nos parametros!

  return <PageIVS id={id} name={"Maria da Silva"} />
}
