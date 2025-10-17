import { createFileRoute, Outlet} from '@tanstack/react-router'
import { HeaderSocialWorkers } from './_social-workers/-components/header'
import { editaisQueryOptions } from '@/queries/editais'

export const Route = createFileRoute('/_social-workers')({
  component: LayoutComponent,
  loader: ({context: { queryClient }}) => queryClient.ensureQueryData(editaisQueryOptions)
})

function LayoutComponent() {
  return (
    <>
      <HeaderSocialWorkers name='Social Worker' id={1} />
      <Outlet />
    </>
  )
}
