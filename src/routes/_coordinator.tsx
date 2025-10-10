import { Sidebar } from '@/components/coordinator/sidebar'
import { createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_coordinator')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}
