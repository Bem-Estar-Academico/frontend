import { api } from "@/api";
import type { StudentRegistrationsDTO } from "@/types/student-registration";
import { queryOptions } from "@tanstack/react-query";

export const studentRegistrationsQueryOptions = () => queryOptions({
    queryKey: ['my-registrations'],
    queryFn: () => fetchStudentRegistrations()
})

export async function fetchStudentRegistrations() {
    const { data } = await api.get<StudentRegistrationsDTO>("/student-registrations/me");
    return data;
}

