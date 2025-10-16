import { createFileRoute } from '@tanstack/react-router'
import AuthenticationPage from './page'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthenticationPage />
}
