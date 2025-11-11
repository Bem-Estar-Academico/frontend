import { 
  FileText, 
  UserIcon, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Trash2, 
  Edit, 
  Plus, 
  Users,
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react'
import { type AuditLog } from '@/types/audit'
import { formatDateTime } from '@/lib/utils'

export function getActionIcon(action: AuditLog['action']) {
  const iconMap = {
    NOTICE_CREATED: Plus,
    NOTICE_UPDATED: Edit,
    NOTICE_DELETED: Trash2,
    REGISTRATION_SUBMITTED: UserIcon,
    REVIEW_STARTED: Eye,
    REVIEW_UPDATED: RefreshCw,
    REVIEW_APPROVED: CheckCircle,
    REVIEW_REJECTED: XCircle,
    APPEAL_SUBMITTED: AlertCircle,
    APPEAL_REVIEWED: FileText,
    SOCIAL_WORKER_ANALYSIS: FileText,
    TEAM_MEMBER_ASSIGNED: Users,
    DOCUMENT_UPLOADED: Upload,
    DOCUMENT_DELETED: Trash2,
    STATUS_CHANGED: RefreshCw,
  }
  
  return iconMap[action] || FileText
}

export function getActionColor(action: AuditLog['action']) {
  const colorMap = {
    NOTICE_CREATED: 'bg-green-500',
    NOTICE_UPDATED: 'bg-blue-500',
    NOTICE_DELETED: 'bg-red-500',
    REGISTRATION_SUBMITTED: 'bg-blue-500',
    REVIEW_STARTED: 'bg-purple-500',
    REVIEW_UPDATED: 'bg-purple-500',
    REVIEW_APPROVED: 'bg-green-500',
    REVIEW_REJECTED: 'bg-red-500',
    APPEAL_SUBMITTED: 'bg-orange-500',
    APPEAL_REVIEWED: 'bg-orange-500',
    SOCIAL_WORKER_ANALYSIS: 'bg-indigo-500',
    TEAM_MEMBER_ASSIGNED: 'bg-cyan-500',
    DOCUMENT_UPLOADED: 'bg-teal-500',
    DOCUMENT_DELETED: 'bg-red-500',
    STATUS_CHANGED: 'bg-amber-500',
  }
  
  return colorMap[action] || 'bg-gray-500'
}

export function renderNoticeCard(event: AuditLog) {
  const meta_data = event.meta_data || {}
  
  return (
    <div className="flex-1">
      <p className="text-sm font-medium mb-1">{event.description}</p>
      <p className="text-xs text-muted-foreground mb-2">
        {event.user.full_name} • {formatDateTime(event.created_at)}
      </p>
      {meta_data.notice_title && (
        <div className="mt-2 p-2 bg-muted rounded text-xs">
          <span className="font-medium">Edital:</span> {meta_data.notice_title}
        </div>
      )}
      {meta_data.changes && (
        <div className="mt-2 p-2 bg-muted rounded text-xs">
          <span className="font-medium">Alterações:</span> {meta_data.changes}
        </div>
      )}
    </div>
  )
}

export function renderRegistrationCard(event: AuditLog) {
  const meta_data = event.meta_data || {}
  
  return (
    <div className="flex-1">
      <p className="text-sm font-medium mb-1">{event.description}</p>
      <p className="text-xs text-muted-foreground mb-2">
        {event.user.full_name} • {formatDateTime(event.created_at)}
      </p>
      <div className="flex gap-2 mt-2">
        {meta_data.notice_title && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Edital:</span> {meta_data.notice_title}
          </div>
        )}
        {meta_data.student_name && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Estudante:</span> {meta_data.student_name}
          </div>
        )}
      </div>
    </div>
  )
}

export function renderReviewCard(event: AuditLog) {
  const meta_data = event.meta_data || {}
  
  return (
    <div className="flex-1">
      <p className="text-sm font-medium mb-1">{event.description}</p>
      <p className="text-xs text-muted-foreground mb-2">
        {event.user.full_name} • {formatDateTime(event.created_at)}
      </p>
      <div className="space-y-2 mt-2">
        {meta_data.student_name && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Estudante:</span> {meta_data.student_name}
          </div>
        )}
        {meta_data.status && (
          <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs">
            <span className="font-medium">Status:</span>
            <span className={`inline-flex items-center gap-1 ${
              meta_data.status === 'approved' ? 'text-green-600' : 
              meta_data.status === 'rejected' ? 'text-red-600' : 
              'text-amber-600'
            }`}>
              {meta_data.status === 'approved' ? <CheckCircle className="w-3 h-3" /> : 
               meta_data.status === 'rejected' ? <XCircle className="w-3 h-3" /> : 
               <AlertCircle className="w-3 h-3" />}
              {meta_data.status === 'approved' ? 'Aprovado' : 
               meta_data.status === 'rejected' ? 'Reprovado' : 
               'Pendente'}
            </span>
          </div>
        )}
        {meta_data.comments && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Comentários:</span> {meta_data.comments}
          </div>
        )}
      </div>
    </div>
  )
}

export function renderAppealCard(event: AuditLog) {
  const meta_data = event.meta_data || {}
  
  return (
    <div className="flex-1">
      <p className="text-sm font-medium mb-1">{event.description}</p>
      <p className="text-xs text-muted-foreground mb-2">
        {event.user.full_name} • {formatDateTime(event.created_at)}
      </p>
      <div className="space-y-2 mt-2">
        {meta_data.student_name && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Estudante:</span> {meta_data.student_name}
          </div>
        )}
        {meta_data.reason && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Motivo:</span> {meta_data.reason}
          </div>
        )}
        {meta_data.decision && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Decisão:</span> {meta_data.decision}
          </div>
        )}
      </div>
    </div>
  )
}

export function renderDocumentCard(event: AuditLog) {
  const meta_data = event.meta_data || {}
  
  return (
    <div className="flex-1">
      <p className="text-sm font-medium mb-1">{event.description}</p>
      <p className="text-xs text-muted-foreground mb-2">
        {event.user.full_name} • {formatDateTime(event.created_at)}
      </p>
      <div className="space-y-2 mt-2">
        {meta_data.document_name && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Documento:</span> {meta_data.document_name}
          </div>
        )}
        {meta_data.document_type && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Tipo:</span> {meta_data.document_type}
          </div>
        )}
        {meta_data.file_size && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Tamanho:</span> {meta_data.file_size}
          </div>
        )}
      </div>
    </div>
  )
}

export function renderTeamMemberCard(event: AuditLog) {
  const meta_data = event.meta_data || {}
  
  return (
    <div className="flex-1">
      <p className="text-sm font-medium mb-1">{event.description}</p>
      <p className="text-xs text-muted-foreground mb-2">
        {event.user.full_name} • {formatDateTime(event.created_at)}
      </p>
      <div className="flex gap-2 mt-2">
        {meta_data.assigned_to && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Atribuído para:</span> {meta_data.assigned_to}
          </div>
        )}
        {meta_data.role && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Função:</span> {meta_data.role}
          </div>
        )}
      </div>
    </div>
  )
}

export function renderStatusChangeCard(event: AuditLog) {
  const meta_data = event.meta_data || {}
  
  return (
    <div className="flex-1">
      <p className="text-sm font-medium mb-1">{event.description}</p>
      <p className="text-xs text-muted-foreground mb-2">
        {event.user.full_name} • {formatDateTime(event.created_at)}
      </p>
      <div className="flex gap-2 mt-2">
        {meta_data.old_status && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">De:</span> {meta_data.old_status}
          </div>
        )}
        {meta_data.new_status && (
          <div className="p-2 bg-muted rounded text-xs">
            <span className="font-medium">Para:</span> {meta_data.new_status}
          </div>
        )}
      </div>
    </div>
  )
}

export function renderAuditCard(event: AuditLog) {
  switch (event.action) {
    case 'NOTICE_CREATED':
    case 'NOTICE_UPDATED':
    case 'NOTICE_DELETED':
      return renderNoticeCard(event)
    
    case 'REGISTRATION_SUBMITTED':
      return renderRegistrationCard(event)
    
    case 'REVIEW_STARTED':
    case 'REVIEW_UPDATED':
    case 'REVIEW_APPROVED':
    case 'REVIEW_REJECTED':
    case 'SOCIAL_WORKER_ANALYSIS':
      return renderReviewCard(event)
    
    case 'APPEAL_SUBMITTED':
    case 'APPEAL_REVIEWED':
      return renderAppealCard(event)
    
    case 'DOCUMENT_UPLOADED':
    case 'DOCUMENT_DELETED':
      return renderDocumentCard(event)
    
    case 'TEAM_MEMBER_ASSIGNED':
      return renderTeamMemberCard(event)
    
    case 'STATUS_CHANGED':
      return renderStatusChangeCard(event)
    
    default:
      return (
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">{event.description}</p>
          <p className="text-xs text-muted-foreground">
            {event.user.full_name} • {formatDateTime(event.created_at)}
          </p>
        </div>
      )
  }
}