import type { Student } from "./student-dto"

export type Review = {
  id: number,
  status: "PENDING" | "APPROVED" | "REJECTED" | "APPEAL" | "ANALISYS" | "CANCELLED",
  ivs: number,
  expires_at: string,
  qtd_documents: number,
}

export type Notice = {
  id: number
  title: string
  registration_end_date: string,
  appeal_start_date: string,
  appeal_end_date: string,
  registration_start_date: string,
  preliminary_result_date: string
}

export type StudentRegistrationDTO = {
  notice: Notice,
  review: Review, 
  requested_daycare_allowance: boolean,
  requested_food_allowance: boolean,
  requested_graduation_scholarship: boolean,
  requested_housing_allowance: boolean,
  student: Student
  answer: Record<string, any>,
  id: number,
}