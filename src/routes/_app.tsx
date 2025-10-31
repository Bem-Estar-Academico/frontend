import { createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import { editaisQueryOptions } from '@/queries/editais'
import Header from '@/components/header'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  loader: ({context: { queryClient }}) => queryClient.ensureQueryData(editaisQueryOptions),
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
