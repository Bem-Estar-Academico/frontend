export interface Reviewer {
  id: number;
  name: string;
}

export interface Review {
  progress: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "APPEAL" | "REVIEW" | "CANCELLED";
  qtd_document: number;
  reviewer: Reviewer;
}

export interface StudentInfo {
  id: number;
  cpf: string;
  name: string;
  registration_number: string;
  created_at: string;
}

export interface RegistrationItem {
  id: number;
  registration_date: string;
  student: StudentInfo;
  review: Review;
}

export interface RegistrationsListResponse {
  registrations: RegistrationItem[];
  pending_count: number;
  approved_count: number;
  reject_count: number;
  review_count: number;
  appeal_count: number;
  cancelled_count: number;
}