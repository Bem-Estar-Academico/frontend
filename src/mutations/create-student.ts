import { api } from '@/api';
import type { CreateStudentDTO } from '@/types/create-student-dto';
import type { User } from '@/types/user';
import { mutationOptions } from '@tanstack/react-query';

export const createStudentMutationOptions = mutationOptions({
    mutationFn: async (data: CreateStudentDTO) => {
        const response = await api.post<User>('/auth/register', data);

        return response.data;
    }
})