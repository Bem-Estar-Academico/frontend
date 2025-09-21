import { createFileRoute } from '@tanstack/react-router'
import { IVS } from "@/components/assistente-social/consultar-ivs"

export const Route = createFileRoute('/assistente-social/consultar-ivs/')({
  component: IVS,
})
