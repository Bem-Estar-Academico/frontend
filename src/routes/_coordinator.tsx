import { Sidebar } from '@/components/coordinator/sidebar'
import { createFileRoute, Outlet, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/_coordinator')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="overflow-y-auto h-screen flex-1">
        <Outlet />
      </main>
    </div>
  )
}
