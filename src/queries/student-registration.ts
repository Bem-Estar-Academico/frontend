import { api } from "@/api";
import type { StudentRegistrationDTO } from "@/types/student-registration";
import { queryOptions } from "@tanstack/react-query";

   export const studentRegistrationQueryOptions = (studentRegistrationId: number) =>  queryOptions({
    queryKey: ['student-registrations', studentRegistrationId],
    queryFn: () => fetchStudentRegistration(studentRegistrationId)
})

export async function fetchStudentRegistration(studentRegistration: number) {
    const { data } = await api.get<StudentRegistrationDTO>(`/student-registrations/${studentRegistration}`);
    console.log(data);
    return data;
}