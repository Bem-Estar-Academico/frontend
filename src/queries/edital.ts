import { api } from "@/api";
import type { EditalResponseDTO } from "@/types/edital-response-dto";
import { queryOptions } from "@tanstack/react-query";

export const editalQueryOptions = (editalId: number) => queryOptions({
    queryKey: ['editais', editalId],
    queryFn: () => fetchEdital(editalId)
})

export async function fetchEdital(editalId: number) {
    const { data } = await api.get<EditalResponseDTO>(`/notices/${editalId}`);
    return data;
}