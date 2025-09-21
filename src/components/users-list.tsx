import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { useMemo, useState } from "react"

type User = { id: number; img: string; name: string }

interface UsersListProps {
  readonly title: string
  readonly onSelect: (user: User) => void
  readonly onDelete: (id: number) => void
  readonly list: User[]
  readonly allUsers: User[]
  readonly allowEdit?: boolean
}

export function UsersList({
  title,
  onSelect,
  onDelete,
  list,
  allUsers,
  allowEdit = false,
}: UsersListProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const handleOpen = () => {
    setSearch("")
    setOpen(true)
  }

  const handleSelectUser = (user: User) => {
    onSelect(user)
  }

  const availableUsers = useMemo(() => {
    const currentIds = new Set(list.map(u => u.id))
    return allUsers
      .filter(u => !currentIds.has(u.id))
      .filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, list, allUsers])

  return (
    <div>
      <div className="flex px-2 py-2 items-center justify-between bg-background border">
        <div className="text-sm font-medium">{title}</div>
        {allowEdit && <div>
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={handleOpen}
          >
            <IconPlus />
            Adicionar
          </Button>
        </div>}
      </div>

      <div>
        {list.length === 0 ? (
          <div className="h-14 px-2 py-2 text-sm font-regular content-center text-center text-muted-foreground bg-gray-50 border">
            A lista está vazia
          </div>
        ) : null}
        {list.map(user => {
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
              { allowEdit && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onDelete(user.id)
                    }}
                    title={`Remover ${user.name}`}
                    className={
                      "text-red-500 hover:bg-red-100 hover:text-red-700 cursor-pointer  disabled:cursor-not-allowed"
                    }
                    disabled={!allowEdit}
                  >
                    <IconTrash />
                  </Button>
                )
              }
            </div>
          )
        })}
      </div>
      {allowEdit && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Lista de Usuários</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="drop-shadow-2xl">
                <Input
                  placeholder="Pesquisar..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="max-h-60 overflow-y-auto border rounded-md">
                {availableUsers.length === 0 ? (
                  <p className="p-3 text-sm text-muted-foreground">
                    Nenhum usuário encontrado
                  </p>
                ) : (
                  availableUsers.map(user => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.img} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSelectUser(user)}
                        className="cursor-pointer"
                      >
                        Adicionar
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button variant="secondary" className="cursor-pointer">
                  Fechar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}