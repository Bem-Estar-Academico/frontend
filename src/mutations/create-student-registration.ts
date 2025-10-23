import { api } from '@/api';
import { type CreateStudentRegistrationDTO } from '@/types/create-student-registration-dto';
import type { User } from '@/types/user';
import { mutationOptions } from '@tanstack/react-query';

export const createStudentRegistrationMutationOptions = mutationOptions({
    mutationFn: async ({editalId, ...data}: {editalId: number, data: CreateStudentRegistrationDTO}) => {
        const response = await api.post<User>(`/student-registrations/${editalId}`, data.data);

        return response.data;
    }
});