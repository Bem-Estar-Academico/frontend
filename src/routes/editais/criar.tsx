import { UsersList } from "@/components/users-list"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/editais/criar")({
  component: CreateEdital,
})

const allUsers = [
  {
    id: 1,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 1",
  },
  {
    id: 2,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 2",
  },
  {
    id: 3,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 3",
  },
  {
    id: 4,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 4",
  },
  {
    id: 5,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 5",
  },
  {
    id: 6,
    img: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    name: "User 6",
  },
]

type User = {
  id: number
  img: string
  name: string
}

function CreateEdital() {
  const [coordenadores, setCoordenadores] = useState<User[]>([])
  const [assistentes, setAssistentes] = useState<User[]>([])

  return (
    <div className="flex flex-col gap-6">
      <UsersList
        title="Coordenadores"
        onSelect={user => setCoordenadores(prev => [...prev, user])}
        onDelete={id => setCoordenadores(prev => prev.filter(u => u.id !== id))}
        list={coordenadores}
        allUsers={allUsers}
       
      />
      <UsersList
        title="Assistentes"
        onSelect={user => setAssistentes(prev => [...prev, user])}
        onDelete={id => setAssistentes(prev => prev.filter(u => u.id !== id))}
        list={assistentes}
        allUsers={allUsers}
        allowEdit={true}
      />
    </div>
  )
}
