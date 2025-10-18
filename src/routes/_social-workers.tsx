import { createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import { HeaderSocialWorkers } from './_social-workers/-components/header'
import { editaisQueryOptions } from '@/queries/editais'
import { useAuth } from '@/contexts/auth'
import type { User } from '@/types/user'

export const Route = createFileRoute('/_social-workers')({
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
  const auth = useAuth()

  const user = auth.user as User

  return (
    <>
      <HeaderSocialWorkers name={user.full_name} id={user?.id} />
      <Outlet />
    </>
  )
}
