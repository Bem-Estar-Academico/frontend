import type { Student, StudentRegistration } from "./student-registration"


export type ReviewRegistration = {
    id: number,
    review: Record<string, any>,
    ivs: number,
    ocr_analisys: Record<string, any>,
    status: "PENDING" | "APPROVED" | "REJECTED" | "APPEAL" | "ANALISYS" | "CANCELLED"
    approved_food_allowance: boolean,
    approved_housing_allowance: boolean,
    approved_daycare_allowance: boolean,
    approved_graduation_scholarship: boolean,
    social_worker_id: number,
    student_registration_id: number,
    created_at: string,
    updated_at: string,
}

export type Appeal = {
    id: number,
    requested_documents: Record<string, string>,
    created_at: string,
    updated_at: string,
    review_registration_id: number
}

export type ReviewRegistrationResponseDTO = ReviewRegistration & {
  
  social_worker: Pick<Student, 'id' | 'email' | 'full_name' | 'user_type'>,
  student_registration: StudentRegistration,
  appeals: Appeal[]
}