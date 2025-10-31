import { createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import { HeaderStudent } from './_app/student/-components/header'
import { useAuth } from '@/contexts/auth'
import type { User } from '@/types/user'

export const Route = createFileRoute('/student')({
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
  component: LayoutComponent,
})

function LayoutComponent() {
  const auth = useAuth()

  const user = auth.user as User

  return (
    <>
      <HeaderStudent name={user.full_name} id={user.id} />
      <Outlet />
    </>
  )
}
