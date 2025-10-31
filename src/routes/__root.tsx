import { ErrorComponent } from '@/components/error'
import { NotFoundComponent } from '@/components/not-found'
import type { AuthState } from '@/contexts/auth'
import { TanstackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  auth?: AuthState
}>()({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }} 
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  head: () => ({
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
})
