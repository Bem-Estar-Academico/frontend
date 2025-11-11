export type CreateStudentDTO = {
  cpf: string;
  email: string;
  full_name: string;
  is_active: boolean;
  password: string;
  registration_number: string;
  user_type: "STUDENT"
}