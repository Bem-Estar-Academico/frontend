import { api } from "@/api";
import type { ListUsersDTO } from "@/types/list-users-dto";
import type { UsersResponseDTO } from "@/types/users-response-dto";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

export const usersQueryOptions = (params: ListUsersDTO) => queryOptions({
    queryKey: ['Users'],
    queryFn: () => fetchUsers(params)
})

export async function fetchUsers(params: ListUsersDTO) {
    
    const { data } = await api.get<UsersResponseDTO>('/users/', { params });

    if (!data) {
        throw notFound();
    }

    return data;
}