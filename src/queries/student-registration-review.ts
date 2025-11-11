import { api } from "@/api";
import type { ReviewRegistrationResponseDTO } from "@/types/review-response.dto";
import { queryOptions } from "@tanstack/react-query";

export const studentRegistrationReviewQueryOptions = (studentRegistrationId: number) => queryOptions({
    queryKey: ['student-registrations', studentRegistrationId, 'review'],
    queryFn: () => fetchStudentRegistrationReview(studentRegistrationId)
})

export async function fetchStudentRegistrationReview(studentRegistrationId: number) {
    const { data } = await api.get<ReviewRegistrationResponseDTO>(`/student-registrations/${studentRegistrationId}/review`);
    return data;
}