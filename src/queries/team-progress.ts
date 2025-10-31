import { api } from "@/api";
import type { SocialWorkerProgressResponseDTO } from "@/types/team-progress-dto";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

export const teamProgressQueryOptions = (editalId?: number) => queryOptions({
    queryKey: ['team', 'progress', editalId],
    queryFn: () => fetchTeamProgress(1 as number),
    enabled: !!editalId,
})

export async function fetchTeamProgress(editalId: number) {
    const { data } = await api.get<SocialWorkerProgressResponseDTO[]>(`/notices/${editalId}/team`);

    if (!data) {
        throw notFound();
    }

    return data;
}