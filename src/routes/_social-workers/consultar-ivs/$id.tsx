import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_social-workers/consultar-ivs/$id")({
  component: PageIVS,
})

function PageIVS() {
  const { id } = Route.useParams()

  return (
      <div>Puxar o IVS do aluno com id: {id}</div>
  )
}
