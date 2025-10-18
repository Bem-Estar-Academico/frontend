export type User = {
  id: number;
  cpf: string;
  created_at: string;
  email: string;
  full_name: string;
  is_active: boolean;
  student_registration: string;
  updated_at: string;
  user_type: "STUDENT" | "COORDINATOR" | "SOCIAL_WORKER";
};