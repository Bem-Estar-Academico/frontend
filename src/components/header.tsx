import { useAuth } from '@/contexts/auth'
import { EditaisMenu } from '@/routes/_app/_staff/_social-workers/-components/editais-menu';
import { Link } from '@tanstack/react-router'
import { UserMenu } from './user-menu';
import { editaisQueryOptions } from '@/queries/editais';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function Header() {
  const { user } = useAuth();

  if (!user) {
    return null;
  } 

  return (
    <header className="text-sm font-medium w-full h-16 bg-gray-100 shadow flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="h-full flex items-center">
          <img src="/logo-bea-notext.png" alt="BEA" className="h-16 object-contain" />
          <h1 className='sr-only'>BEA - Bem Estar Acadêmico</h1>
        </div>
        <nav className="flex items-center gap-6 text-gray-800 px-6">
          {user.user_type === 'STUDENT' && <HeaderStudentLinks />}
          {user.user_type === 'SOCIAL_WORKER' && <HeaderSocialWorkerLinks />}
          {user.user_type === 'COORDINATOR' && <HeaderCoordinatorLinks />}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <UserMenu name={user.full_name} id={user.id} />
      </div>
    </header>
  )
}

function HeaderStudentLinks() {
  return (
    <>
      <Link to="/" className="hover:text-gray-600 transition">
        Minhas Inscrições
      </Link>
      <Link to="/editais" className="hover:text-gray-600 transition">
        Editais
      </Link>
    </>
  )
}

function HeaderSocialWorkerLinks() {
  const { data } =  useSuspenseQuery(editaisQueryOptions)

  return (
    <>
      <EditaisMenu data={data} />
      <Link to="/consultar-ivs" className="hover:text-gray-600 transition">
        Consultar IVS
      </Link>
    </>
  )
}

function HeaderCoordinatorLinks() {
  return (
    <>
      <Link to="/equipe" className="hover:text-gray-600 transition">
        Equipe
      </Link>
      <Link to="/editais" className="hover:text-gray-600 transition">
        Editais
      </Link>
      <Link to="/consultar-ivs" className="hover:text-gray-600 transition">
        Consultar IVS
      </Link>
    </>
  )
}