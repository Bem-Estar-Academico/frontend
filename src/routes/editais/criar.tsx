import { UserList } from '@/components/users-list'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Route = createFileRoute('/editais/criar')({
  component: CreateEdital,
})

const allUsers = [
  { id: 1, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 1" },
  { id: 2, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 2" },
  { id: 3, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 3" },
  { id: 4, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 4" },
  { id: 5, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 5" },
  { id: 6, img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", name: "User 6" },
]

type User = {
  id: number,
  img: string,
  name: string
}

function CreateEdital() {
  const [open, setOpen] = useState(false)
  const [currentTitle, setCurrentTitle] = useState("")
  const [search, setSearch] = useState("")

  const [Coordenadores, setCoordenadores] = useState<User[]>([])
  const [Assistentes, setAssistentes] = useState<User[]>([])

  const handleAdd = (title: string) => {
    setCurrentTitle(title)
    setSearch("")
    setOpen(true)
  }

  const availableUsers = useMemo(() => {
    const currentIds =
      currentTitle === "Coordenadores"
        ? new Set(Coordenadores.map(u => u.id))
        : new Set(Assistentes.map(u => u.id))

    return allUsers
      .filter(u => !currentIds.has(u.id))
      .filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
  }, [currentTitle, search, Coordenadores, Assistentes])

  const handleSelectUser = (user: User) => {
    if (currentTitle === "Coordenadores") {
      setCoordenadores(prev => [...prev, user])
    } else if (currentTitle === "Assistentes") {
      setAssistentes(prev => [...prev, user])
    }
  }

  return (
    <div className="text-center space-y-6">
      <UserList
        title="Coordenadores"
        onAdd={handleAdd}
        onDelete={(id: number) =>
          setCoordenadores(prev => {
            if (prev.length <= 1) {
              alert("É obrigatório ter pelo menos 1 coordenador.")
              return prev
            }
            return prev.filter(u => u.id !== id)
          })
        }
        list={Coordenadores}
      />

      <UserList
        title="Assistentes"
        onAdd={handleAdd}
        onDelete={(id: number) =>
          setAssistentes(prev => prev.filter(u => u.id !== id))
        }
        list={Assistentes}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar em {currentTitle}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="drop-shadow-2xl">
              <Input
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                      variant="secondary"
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

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
