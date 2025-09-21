import { createFileRoute } from "@tanstack/react-router"
import { Editais } from "@/components/assistente-social/editais"

export const Route = createFileRoute("/assistente-social/editais/")({
  component: Editais,
})