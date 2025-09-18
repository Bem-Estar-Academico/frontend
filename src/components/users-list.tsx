import { Button } from "../components/ui/button"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type User = { id: number; img: string; name: string }

interface UserListProps {
  title: string
  onAdd: (title: string) => void
  onDelete: (id: number) => void
  list: User[]
}

export function UserList({ title, onAdd, onDelete, list }: UserListProps) {
  return (
    <div>
      <div className="flex px-2 py-2 items-center justify-between bg-background border">
        <div className="text-sm font-medium">{title}</div>
        <div>
          <Button 
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={() => onAdd(title)}>
            <IconPlus />
            Adicionar
          </Button>
        </div>
      </div>

      <div>
        {list.map((user) => {
          const isCoordenadores = title === "Coordenadores"
          const canDelete = !(isCoordenadores && list.length <= 1)

          return (
            <div
              key={user.id}
              className="flex px-2 py-2 items-center justify-between bg-gray-50 border"
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.img} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm font-regular">{user.name}</div>
              </div>

              <div>
                <button
                  onClick={() => {
                    if (!canDelete) return
                    onDelete(user.id)
                  }}
                  aria-disabled={!canDelete}
                  title={
                    canDelete
                      ? `Remover ${user.name}`
                      : "É obrigatório ter pelo menos 1 coordenador."
                  }
                  className={
                    canDelete
                      ? "text-red-700 hover:opacity-80 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }
                >
                  <IconTrash />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}