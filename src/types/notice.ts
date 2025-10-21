export type Document = {
  id: number
  name: string
  file_type: string
  file_size: number
  notice_id: number
  file_key: string
  uploaded_at: string
  file_url: string
}

export type User = {
  id: number
  email: string
  full_name: string
  user_type: string
}

export type TeamMember = {
  id: number
  user_id: number
  role: string
  assigned_at: string
  user: User
}

export type Notice = {
  id: number
  title: string
  year: number
  registration_start_date: string
  registration_end_date: string
  appeal_start_date: string
  appeal_end_date: string
  preliminary_result_date: string
  final_result_date: string
  description: string
  food_allowance: boolean
  housing_allowance: boolean
  daycare_allowance: boolean
  graduation_scholarship: boolean
  created_at: string
  updated_at: string
  documents: Document[]
  team_members: TeamMember[]
}
