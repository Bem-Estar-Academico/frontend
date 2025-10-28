import { api } from "@/api";
import type { IVSResponseDTO } from "@/types/ivs-response.dto";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

export const ivsQueryOptions = queryOptions({
    queryKey: ['ivs'],
    queryFn: fetchIVS
})

export async function fetchIVS() {
    const { data } = await api.get<IVSResponseDTO[]>('/ivs');

    if (!data) {
        throw notFound();
    }

    return data;
}