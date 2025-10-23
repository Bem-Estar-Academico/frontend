import { api } from '@/api';
import { mutationOptions } from '@tanstack/react-query';

export const loginMutationOptions = mutationOptions({
    mutationFn: async (credentials: { email: string; password: string }) => {
        const formData = new URLSearchParams();
        formData.append('username', credentials.email);
        formData.append('password', credentials.password);

        const response = await api.post<{access_token: string, token_type: 'Bearer'}>('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data;
    }
})