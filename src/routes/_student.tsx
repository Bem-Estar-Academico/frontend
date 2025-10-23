import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_student')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <Outlet />
  )
}
