import { api } from '@/api';
import { queryClient } from '@/main';
import type { ReviewRegistration } from '@/types/review-response.dto';
import type { UpdateReviewDTO } from '@/types/update-review-dto';
import { mutationOptions } from '@tanstack/react-query';

export const updateReviewMutationOptions = mutationOptions({
    mutationFn: async ({reviewId, studentRegistrationId, ...data}: {reviewId: number, studentRegistrationId: number, data: UpdateReviewDTO}) => {
        const response = await api.put<ReviewRegistration>(`/student-registrations/reviews/${reviewId}`, data.data);

        return response.data;
    },
    onSuccess: (_data, { studentRegistrationId }) => {
        queryClient.invalidateQueries({queryKey: ['student-registrations', studentRegistrationId, 'review']});
    }

});