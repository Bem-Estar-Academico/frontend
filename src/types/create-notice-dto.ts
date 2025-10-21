export type CreateNoticeDTO = {
    title: string,
    registration_start_date: string,
    registration_end_date?: string,
    appeal_start_date?: string,
    appeal_end_date?: string,
    preliminary_result_date?: string,
    final_result_date?: string,
    description: string,
    food_allowance: boolean,
    housing_allowance: boolean,
    daycare_allowance: boolean,
    graduation_scholarship: boolean
    team_members: number[]
}