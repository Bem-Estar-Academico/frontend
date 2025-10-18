import { api } from "@/api";
import type { StudentRegistration } from "@/types/student-registration";
import { queryOptions } from "@tanstack/react-query";

export const studentsRegistrationsQueryOptions = (editalId: number) =>  queryOptions({
    queryKey: ['editais', editalId, 'student-registrations'],
    queryFn: () => fetchStudentsRegistrations(editalId)
})

export async function fetchStudentsRegistrations(editalId: number) {
    const { data } = await api.get<{registrations: StudentRegistration[], total: number}>(`/student-registrations/notice/${editalId}`);
    return data;
}