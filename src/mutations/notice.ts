import { api } from '@/api';
import type { CreateNoticeDTO } from '@/types/create-notice-dto';
import type { Notice, UpdateNoticeDTO } from '@/types/notice';
import { mutationOptions } from '@tanstack/react-query';

export const createNoticeMutationOptions = mutationOptions({
    mutationFn: async (data: CreateNoticeDTO) => {
        const response = await api.post<Notice>('/notices/', data);

        return response.data;
    }
})

export const updateNoticeMutationOptions = (noticeId: number) => mutationOptions({
    mutationFn: async (data: UpdateNoticeDTO) => {
        const response = await api.put<Notice>(`/notices/${noticeId}`, data);

        return response.data;
    }
})