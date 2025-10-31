import type { EditalResponseDTO } from "./edital-response-dto"
import type { Student } from "./student-dto"

export interface IVSResponseDTO {
    student: Pick<Student, 'id' | 'email' | 'full_name' | 'user_type' | 'registration_number' | 'cpf'>
    notice: EditalResponseDTO
    ivs_score: number
    expiration_date: string
}