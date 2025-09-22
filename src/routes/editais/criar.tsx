import { UsersList } from "@/components/users-list"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { YearSelect } from "@/components/ui/year-select"

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
    <div className="flex w-full max-w-lg flex-col gap-6 px-4 py-4">
      <Tabs defaultValue="1">
        <TabsList>
          <TabsTrigger value="1">1</TabsTrigger>
          <TabsTrigger value="2">2</TabsTrigger>
          <TabsTrigger value="3">3</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <div className="text-lg font-medium py-2">Identificação do Edital</div>
          <div className="grid gap-6 py-2">
            <div className="grid gap-3">
              <Label htmlFor="tab-name">Título do Edital</Label>
              <Input id="tab-name" placeholder="ex.: Cadastramento Socioeconômico 2025" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tab-number">Número do Edital</Label>
              <Input id="tab-number" placeholder="ex.: Edital nº 05/2025" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tab-year">Ano de vigência</Label>
              <YearSelect />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tab-responsible">Órgão responsável</Label>
              <Input id="tab-responsible" placeholder="" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="2">
          <div className="text-lg font-medium py-2">Equipe responsável</div>
          <div className="flex flex-col gap-6">
            <UsersList
              title="Coordenadores"
              onSelect={user => setCoordenadores(prev => [...prev, user])}
              onDelete={id => setCoordenadores(prev => prev.filter(u => u.id !== id))}
              list={coordenadores}
              allUsers={allUsers}
              allowEdit={true}
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
        </TabsContent>
        <TabsContent value="3">
          <div className="text-lg font-medium py-2">Benefícios Ofertados</div>
          <div className="flex flex-col gap-6 py-2">
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Auxílio Alimentação</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Auxílio Moradia</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Auxílio Creche</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Bolsa Pró-Graduando</Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
