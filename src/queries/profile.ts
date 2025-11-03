import { api } from "@/api";
import type { User } from "@/types/user"
import { queryOptions } from "@tanstack/react-query";

export const profileQueryOptions = (token?: string) => queryOptions({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    enabled: !!token    
})

export async function fetchProfile() {
    const { data } = await api.get<User>('/auth/me');

    return data;
}