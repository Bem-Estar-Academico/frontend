import { api } from '@/api';
import type { CreateNoticeDTO } from '@/types/create-notice-dto';
import type { Notice } from '@/types/notice';
import { mutationOptions } from '@tanstack/react-query';

export const createNoticeMutationOptions = mutationOptions({
    mutationFn: async (data: CreateNoticeDTO) => {
        const response = await api.post<Notice>('/api/v1/notices/', data);

        return response.data;
    }
})