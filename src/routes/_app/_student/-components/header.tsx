import { IconBellFilled } from "@tabler/icons-react";
import { UserMenu } from "@/components/user-menu";
import { Link } from "@tanstack/react-router";

interface HeaderStudent {
  id: number;
  name: string;
}

export function HeaderStudent({ id, name }: Readonly<HeaderStudent>) {
  return (
    <header className="text-sm font-medium w-full h-16 bg-gray-100 shadow flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <img src="/logo-ufal.png" alt="Logo UFAL" className="h-10 w-auto" />
        <nav className="flex items-center gap-6 text-gray-800 px-6">
          <Link to="/student/home" className="hover:text-gray-600 transition">Home</Link>
          <Link to="/student/editais" className="hover:text-gray-600 transition">Editais</Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <IconBellFilled />
        </button>
        <UserMenu name={name} id={id} />
      </div>
    </header>
  );
}
