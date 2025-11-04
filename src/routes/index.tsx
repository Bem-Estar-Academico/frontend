import { createFileRoute, redirect } from '@tanstack/react-router'
import { StudentHome } from './-student-home'
import Header from '@/components/header'

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <title>Bem Estar Acadêmico</title>
      <App/>
    </>
  ),
  
  beforeLoad: async ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: '/' } })
    }
    else if (context.auth.hasRole('COORDINATOR')) {
      throw redirect({ to: '/equipe' })
    }
    else if (context.auth.hasRole('SOCIAL_WORKER')) {
      throw redirect({ to: '/editais' })
    }
  },
})

function App() {
  return ( 
    <div className='h-screen flex flex-col'>
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50">
        <StudentHome />
      </main>
    </div>
  )
}
