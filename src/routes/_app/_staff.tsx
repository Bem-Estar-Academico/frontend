import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_staff')({
  beforeLoad: async ({ context }) => {
    if (!context.auth?.hasAnyRole(['SOCIAL_WORKER', 'COORDINATOR'])) {
      throw notFound()
    }
  },
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <Outlet />
  )
}
