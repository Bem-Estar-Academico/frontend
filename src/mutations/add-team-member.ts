import { api } from '@/api';
import type { AddTeamMemberDTO } from '@/types/add-team-member-dto';
import { mutationOptions } from '@tanstack/react-query';

export const addTeamMemberMutationOptions = (noticeId: number) => mutationOptions({
    mutationFn: async (data: AddTeamMemberDTO) => {
        const response = await api.post(`/notices/${noticeId}/team`, null, {
            params: {
                user_id: data.user_id,
            }
        });

        return response.data;
    }
})