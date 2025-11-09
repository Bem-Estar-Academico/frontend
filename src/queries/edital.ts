import { api } from "@/api";
import { queryOptions } from "@tanstack/react-query";
import type { EditalResponseDTO } from "@/types/edital-response-dto";
import type { NoticeStatisticsResponse } from "@/types/notice";

export const editalQueryOptions = (editalId: number) =>
  queryOptions({
    queryKey: ['editais', editalId],
    queryFn: () => fetchEdital(editalId),
  });

export async function fetchEdital(editalId: number) {
  const { data } = await api.get<EditalResponseDTO>(`/notices/${editalId}`);
  return data;
}

export const noticeStatisticsQueryOptions = (editalId: number) =>
  queryOptions({
    queryKey: ['editais', editalId, 'statistics'],
    queryFn: () => fetchNoticeStatistics(editalId),
  });

export async function fetchNoticeStatistics(editalId: number) {
  const { data } = await api.get<NoticeStatisticsResponse>(
    `/notices/${editalId}/statistics`
  );
  return data;
}