import { createFileRoute, Outlet} from '@tanstack/react-router'
import { HeaderSocialWorkers } from './_social-workers/-components/header'

export const Route = createFileRoute('/_social-workers')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <HeaderSocialWorkers name='Social Worker' />
      <Outlet />
    </>
  )
}
