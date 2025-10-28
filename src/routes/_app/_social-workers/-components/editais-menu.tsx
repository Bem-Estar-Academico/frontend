import { Link, useParams } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface EditaisMenuProps {
  data: Array<{ id: number; title: string }>;
}

export function EditaisMenu({ data }: Readonly<EditaisMenuProps>) {

  const params = useParams({
    from: "/_social-workers/editais/$id",
    shouldThrow: false,
  });

  const currentId = params?.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-gray-800 hover:text-gray-600 transition">
          Editais <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 max-h-60 overflow-y-auto">
        {data.map((edital) => (
          <DropdownMenuItem key={edital.id} asChild>
            <Link
              to={`/editais/$id`}
              params={{ id: String(edital.id) }}
              className={
                currentId === String(edital.id) ? "w-full font-bold" : ""
              }
            >
              {edital.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
