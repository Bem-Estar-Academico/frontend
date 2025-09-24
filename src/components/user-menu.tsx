import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  id: number;
  name: string;
};

export function UserMenu({ name }: Readonly<UserMenuProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative flex items-center h-fit gap-4 text-gray-800 hover:text-gray-600 transition">
          <Avatar>
            <AvatarImage src={'/avatar-image.png'} alt={name} />
            <AvatarFallback className="bg-gray-300">{name[0]}</AvatarFallback>
          </Avatar> 
          <div className="flex gap-2 items-center">
            {name}
            <ChevronDown className="w-4 h-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}