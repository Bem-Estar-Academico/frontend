import { api } from "@/api";
import type { RegistrationsListResponse } from "@/types/notice-registrations";
import { queryOptions } from "@tanstack/react-query";

export const noticeRegistrationsQueryOptions = (editalId: number) =>  queryOptions({
    queryKey: ['edital', editalId, 'student-registrations'],
    queryFn: () => fetchNoticeRegistrations(editalId)
})

export async function fetchNoticeRegistrations(editalId: number) {
    const { data } = await api.get<RegistrationsListResponse>(`/student-registrations/notice/${editalId}`);
    return data;
}