import { api } from "@/api";
import type { EditalResponseDTO } from "@/types/edital-response-dto";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

export const editaisQueryOptions = queryOptions({
    queryKey: ['editais'],
    queryFn: () => fetchEditais()
})

export async function fetchEditais() {
    
    const { data } = await api.get<EditalResponseDTO[]>('/notices/');

    if (!data) {
        throw notFound();
    }

    return data;
}