import { Link } from "@tanstack/react-router";
import NotificationsIcon from "@mui/icons-material/Notifications";

export function HeaderAssistenteSocial({ name }: { name: string }) {
  return (
    <header className="w-full h-16 bg-gray-100 shadow flex items-center justify-between px-14">
      <div className="flex items-center gap-6">
        <img src="/logo-ufal.png" alt="Logo UFAL" className="h-10 w-auto" />
        <nav className="flex items-center gap-6 font-semibold text-gray-800 px-6">
            <Link
              to="/assistente-social/editais"
              className="hover:text-red-600 transition"
            >
              Editais
            </Link>
            <Link
              to="/assistente-social/consultar-ivs"
              className="hover:text-red-600 transition"
            >
              Consultar IVS
            </Link>
          </nav>
      </div>


      <div className="flex items-center gap-4">
        <button className="relative">
          <NotificationsIcon />
        </button>
        <div className="flex items-center gap-2">
          <img src="/avatar-image.png" />
          <span className="font-medium">{name}</span>
        </div>
      </div>
    </header>
  );
}
