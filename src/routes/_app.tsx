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
    <>
      <Header />
      <main className='px-10 py-6'>
        <Outlet />
      </main>
    </>
  )
}
