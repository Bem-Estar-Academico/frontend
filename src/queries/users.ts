import { api } from "@/api";
import type { UsersResponseDTO } from "@/types/users-response-dto";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

export const usersQueryOptions = queryOptions({
    queryKey: ['Users'],
    queryFn: fetchUsers
})

export async function fetchUsers() {
    
    const { data } = await api.get<UsersResponseDTO>('/users/');

    if (!data) {
        throw notFound();
    }

    return data;
}