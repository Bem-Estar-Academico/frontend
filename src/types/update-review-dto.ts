import type { ReviewRegistration } from "./review-response.dto"

export type UpdateReviewDTO = (
    {
        status: "APPROVED" | "REJECTED",
    } 
    & Pick<ReviewRegistration, 
        'ivs' |
        'review' |
        'approved_daycare_allowance' | 
        'approved_food_allowance' | 
        'approved_graduation_scholarship' | 
        'approved_housing_allowance'>
) | ({
    status: "APPEAL",
    appeal: Record<string, any>
}
    & Pick<ReviewRegistration, 
        'ivs' |
        'review' |
        'approved_daycare_allowance' | 
        'approved_food_allowance' | 
        'approved_graduation_scholarship' | 
        'approved_housing_allowance'>
)