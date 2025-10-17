export type Student = {
  id: number
  email: string
  full_name: string
  user_type: "COORDINATOR" | "STUDENT" | "SOCIAL_WORKER"
  student_registration: string
  cpf: string
}

export type Notice = {
  id: number
  title: string
  notice_number: string
  year: number
}

export type StudentRegistration = {
  notes: string
  id: number
  student_id: number
  notice_id: number
  status: "PENDING" | "APPROVED" | "REJECTED" | "APPEAL" | "ANALISYS"
  registration_date: string
  created_at: string
  updated_at: string
  student: Student
  notice: Notice
}
