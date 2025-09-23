import { Link, useParams } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const mockIds = [1, 2, 3, 4];

export function Editais() {
  let params: { id?: string } = {};

  try {
    params = useParams({ from: "/editais/$id" });
  } catch (e) {
    //alert(e);
  }
  const currentId = params?.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-gray-800 hover:text-gray-600 transition">
          Editais <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {mockIds.map((id) => (
          <DropdownMenuItem key={id} asChild>
            <Link
              to={`/editais/${id}`}
              className={
                currentId == String(id) ? "w-full font-bold text-black-600" : ""
              }
            >
              Edital {id}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
