import { api } from "@/api";
import type { StudentRegistrationDTO } from "@/types/student-registration";
import { queryOptions } from "@tanstack/react-query";

export const studentsRegistrationsByNoticeQueryOptions = (editalId: number) =>  queryOptions({
    queryKey: ['editais', editalId, 'student-registrations'],
    queryFn: () => fetchStudentsRegistrationsByNotice(editalId)
})

export async function fetchStudentsRegistrationsByNotice(editalId: number) {
    const { data } = await api.get<{registrations: StudentRegistrationDTO[], total: number}>(`/student-registrations/notice/${editalId}`);
    return data;
}