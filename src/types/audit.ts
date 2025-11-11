export type AuditAction =
  | "NOTICE_CREATED"
  | "NOTICE_UPDATED"
  | "NOTICE_DELETED"
  | "REGISTRATION_SUBMITTED"
  | "REVIEW_STARTED"
  | "REVIEW_UPDATED"
  | "REVIEW_APPROVED"
  | "REVIEW_REJECTED"
  | "APPEAL_SUBMITTED"
  | "APPEAL_REVIEWED"
  | "SOCIAL_WORKER_ANALYSIS"
  | "TEAM_MEMBER_ASSIGNED"
  | "DOCUMENT_UPLOADED"
  | "DOCUMENT_DELETED"
  | "STATUS_CHANGED";

export type AuditEntityType =
  | "NOTICE"
  | "REVIEW"
  | "REGISTRATION"
  | "USER"
  | "DOCUMENT"
  | "TEAM_MEMBER"
  | "SYSTEM";

export type AuditLog = {
  id: number;
  action: AuditAction;
  entity_type: AuditEntityType;
  entity_id: number;
  ip_address: string;
  user_agent: string; 
  user: User;
  description: string;
  meta_data?: Record<string, any>;
  created_at: string;
};

export type User = {
  id: number;
  email: string;
  full_name: string;
  user_type: "STUDENT" | "COORDINATOR" | "SOCIAL_WORKER";
  cpf: string;
  registration_number: string;
};
