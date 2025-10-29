import { api } from "@/api";
import type { RegistrationsResponse } from "@/types/students-registration";
import { queryOptions } from "@tanstack/react-query";

export const studentRegistrationsQueryOptions = (studentId: number) =>  queryOptions({
    queryKey: ['student', studentId, 'student-registrations'],
    queryFn: () => fetchStudentRegistrations(studentId)
})

export async function fetchStudentRegistrations(studentId: number) {
    const { data } = await api.get<RegistrationsResponse>(`/student-registrations/student/${studentId}`);
    return data;
}

