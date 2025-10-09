import { createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_coodinator')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
