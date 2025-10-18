export type CreateStudentDTO = {
  cpf: string;
  email: string;
  full_name: string;
  is_active: boolean;
  password: string;
  student_registration: string;
  user_type: "STUDENT"
}