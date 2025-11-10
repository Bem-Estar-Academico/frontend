import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Filter } from '@/components/filter'
import { mockEvents } from './-data'
import { renderAuditCard, getActionIcon, getActionColor } from './-components/audit-events-card'

export const Route = createFileRoute('/_app/_staff/_coordinator/auditoria')({
  component: () => (
    <>
      <title>Auditoria | BEA</title>
      <RouteComponent/>
    </>
  ),
})

const actionTypeOptions = [
  { label: 'Edital Criado', value: 'NOTICE_CREATED' },
  { label: 'Edital Atualizado', value: 'NOTICE_UPDATED' },
  { label: 'Edital Deletado', value: 'NOTICE_DELETED' },
  { label: 'Inscrição Enviada', value: 'REGISTRATION_SUBMITTED' },
  { label: 'Análise Iniciada', value: 'REVIEW_STARTED' },
  { label: 'Análise Atualizada', value: 'REVIEW_UPDATED' },
  { label: 'Análise Aprovada', value: 'REVIEW_APPROVED' },
  { label: 'Análise Reprovada', value: 'REVIEW_REJECTED' },
  { label: 'Recurso Enviado', value: 'APPEAL_SUBMITTED' },
  { label: 'Recurso Analisado', value: 'APPEAL_REVIEWED' },
  { label: 'Análise Assistente Social', value: 'SOCIAL_WORKER_ANALYSIS' },
  { label: 'Membro Atribuído', value: 'TEAM_MEMBER_ASSIGNED' },
  { label: 'Documento Enviado', value: 'DOCUMENT_UPLOADED' },
  { label: 'Documento Deletado', value: 'DOCUMENT_DELETED' },
  { label: 'Status Alterado', value: 'STATUS_CHANGED' },
]

const userTypeOptions = [
  { label: 'Estudante', value: 'STUDENT' },
  { label: 'Coordenador', value: 'COORDINATOR' },
  { label: 'Assistente Social', value: 'SOCIAL_WORKER' },
]

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedActionTypes, setSelectedActionTypes] = useState<Set<string>>(new Set())
  const [selectedUserTypes, setSelectedUserTypes] = useState<Set<string>>(new Set())

  const filteredEvents = mockEvents.filter((event) => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesDescription = event.description.toLowerCase().includes(searchLower)
      const matchesUserName = event.user.full_name.toLowerCase().includes(searchLower)
      const matchesUserEmail = event.user.email.toLowerCase().includes(searchLower)
      const matchesMetadata = event.metadata 
        ? JSON.stringify(event.metadata).toLowerCase().includes(searchLower)
        : false
      
      if (!matchesDescription && !matchesUserName && !matchesUserEmail && !matchesMetadata) {
        return false
      }
    }

    if (selectedActionTypes.size > 0 && !selectedActionTypes.has(event.action)) {
      return false
    }

    if (selectedUserTypes.size > 0 && !selectedUserTypes.has(event.user.user_type)) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen px-10 py-6">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold mb-1">Auditoria de Ações</h1>
            <p className="text-muted-foreground text-sm">Rastreie todas as ações realizadas nos Editais</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6 mt-6 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por usuário, ação, edital ou documento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Filter
            title="Tipo de Ação"
            options={actionTypeOptions}
            selectedValues={selectedActionTypes}
            onChange={setSelectedActionTypes}
          />

          {/* <Filter
            title="Entidade"
            options={entityTypeOptions}
            selectedValues={selectedEntityTypes}
            onChange={setSelectedEntityTypes}
          /> */}

          <Filter
            title="Tipo de Usuário"
            options={userTypeOptions}
            selectedValues={selectedUserTypes}
            onChange={setSelectedUserTypes}
          />
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Timeline de Eventos</h2>
              <p className="text-sm text-muted-foreground">({filteredEvents.length} eventos)</p>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum evento encontrado com os filtros aplicados.
            </div>
          ) : (
            <div className="space-y-0">
              {filteredEvents.map((event, index) => {
                const Icon = getActionIcon(event.action)
                const colorClass = getActionColor(event.action)
                
                return (
                  <div key={event.id} className="relative flex items-center gap-4 pb-8">
                    {index !== filteredEvents.length - 1 && (
                      <div className="absolute left-[18px] bg-muted-foreground top-10 w-0.5 h-full"></div>
                    )}

                    <div className={`${colorClass} text-white rounded-full p-2.5 shrink-0 relative z-10`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      {renderAuditCard(event)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}