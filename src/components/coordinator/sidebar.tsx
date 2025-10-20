import { Link } from "@tanstack/react-router"
import { Users, NotepadText, ListTodo } from "lucide-react"

export function Sidebar() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      
      <aside className="flex w-56 flex-col border-r bg-gray-50 p-4">
        <nav className="flex flex-col gap-6">
          <Link
            to="/equipe"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900"
          >
            <Users className="h-4 w-4" />
            Equipe
          </Link>
          <Link
            to="/editais"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900"
          >
            <NotepadText className="h-4 w-4" />
            Editais
          </Link>
          <Link
            to="/consultar-ivs"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900"
          >
            <ListTodo className="h-4 w-4" />
            Estudantes com IVS
          </Link>
        </nav>
      </aside>
    </div>
  )
}
