import { Link } from "@tanstack/react-router";
import { IconBellFilled } from "@tabler/icons-react";
import { EditaisMenu } from "./editais-menu";
import { UserMenu } from "@/components/user-menu";

interface HeaderSocialWorkers {
  name: string;
}

export function HeaderSocialWorkers({ name }: Readonly<HeaderSocialWorkers>) {
  return (
    <header className="text-sm font-medium w-full h-16 bg-gray-100 shadow flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <img src="/logo-ufal.png" alt="Logo UFAL" className="h-10 w-auto" />
        <nav className="flex items-center gap-6 text-gray-800 px-6">
          <EditaisMenu />
          <Link to="/consultar-ivs" className="hover:text-gray-600 transition">
            Consultar IVS
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <IconBellFilled />
        </button>
        <UserMenu name={name} id={"1"} />
      </div>
    </header>
  );
}
