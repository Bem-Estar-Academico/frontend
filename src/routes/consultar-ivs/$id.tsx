import { createFileRoute } from "@tanstack/react-router"
import { PageIVS } from "@/components/page-ivs"

export const Route = createFileRoute("/consultar-ivs/$id")({
  component: IVS,
})

function IVS() {
  const { id } = Route.useParams()

  return <PageIVS id={id} name={"Maria da Silva"} />
}
