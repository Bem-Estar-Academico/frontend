export type Review = {
  id: number,
  status: "PENDING" | "REVIEW" | "APPEAL" | "APPROVED" | "REJECTED",
  ivs: number,
  expires_at: string,
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
}