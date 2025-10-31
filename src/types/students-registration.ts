export type UserType = "NTI" | "STUDENT" | "COORDINATOR" | "SOCIAL_WORKER";

export type RegistrationStatus = 
  | "PENDING" 
  | "APPROVED" 
  | "REJECTED" 
  | "REVIEW" 
  | "APPEAL"
  | "CANCELLED";

export interface Student {
  id: number;
  email: string;
  full_name: string;
  user_type: UserType;
  registration_number: string;
  cpf: string;
}

export interface Notice {
  id: number;
  title: string;
  registration_start_date: string;
  registration_end_date: string;
  appeal_start_date: string;
  appeal_end_date: string;
  preliminary_result_date: string;
  final_result_date: string;
  description: string;
  food_allowance: boolean;
  housing_allowance: boolean;
  daycare_allowance: boolean;
  graduation_scholarship: boolean;
}

export interface Registration {
  id: number;
  student_id: number;
  notice_id: number;
  status: RegistrationStatus;
  registration_date: string;
  created_at: string;
  updated_at: string;
  answer: {
    additionalProp1?: Record<string, any>;
    [key: string]: any;
  };
  requested_food_allowance: boolean;
  requested_housing_allowance: boolean;
  requested_daycare_allowance: boolean;
  requested_graduation_scholarship: boolean;
  student: Student;
  notice: Notice;
  documents_count: number;
}

export interface RegistrationsResponse {
  registrations: Registration[];
  total: number;
}