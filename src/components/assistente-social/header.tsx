import { Link } from "@tanstack/react-router";
import { IconBellFilled } from "@tabler/icons-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Editais } from "@/components/assistente-social/editais"

const mockIds = [0, 1, 2, 3, 4];

export function HeaderAssistenteSocial({ name }: { name: string }) {
  return (
    <header className="w-full h-16 bg-gray-100 shadow flex items-center justify-between px-14">
      <div className="flex items-center gap-6">
        <img src="/logo-ufal.png" alt="Logo UFAL" className="h-10 w-auto" />
        <nav className="flex items-center gap-6 font-semibold text-gray-800 px-6">
          <Editais />
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
          <IconBellFilled />
        </button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/avatar-image.png" alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{name}</span>
        </div>
      </div>
    </header>
  );
}
