import { api } from "@/api";
import type { StudentRegistration } from "@/types/student-registration";
import { queryOptions } from "@tanstack/react-query";

   export const studentRegistrationQueryOptions = (studentRegistrationId: number) =>  queryOptions({
    queryKey: ['student-registrations', studentRegistrationId],
    queryFn: () => fetchStudentRegistration(studentRegistrationId)
})

export async function fetchStudentRegistration(studentRegistration: number) {
    const { data } = await api.get<StudentRegistration>(`/student-registrations/${studentRegistration}`);
    return data;
}