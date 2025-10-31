import { useAuth } from '@/contexts/auth'
import { IconBellFilled } from '@tabler/icons-react';
import { EditaisMenu } from '@/routes/_app/_social-workers/-components/editais-menu';
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
      <div className="flex items-center gap-6">
        <img src="/logo-ufal.png" alt="Logo UFAL" className="h-10 w-auto" />
        <nav className="flex items-center gap-6 text-gray-800 px-6">
          {user.user_type === 'STUDENT' && <HeaderStudentLinks />}
          {user.user_type === 'SOCIAL_WORKER' && <HeaderSocialWorkerLinks />}
          {user.user_type === 'COORDINATOR' && <HeaderCoordinatorLinks />}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <IconBellFilled />
        </button>
        <UserMenu name={user.full_name} id={user.id} />
      </div>
    </header>
  )
}

function HeaderStudentLinks() {
  return (
    <>
      <Link to="." className="hover:text-gray-600 transition">
        Placeholder
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