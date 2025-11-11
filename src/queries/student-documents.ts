import { api } from "@/api";
import type { Document } from "@/types/document";
import { queryOptions } from "@tanstack/react-query";

export const studentRegistrationDocumentsQueryOptions = (studentRegistrationId: number) => queryOptions({
    queryKey: ['student-registrations', studentRegistrationId, 'documents'],
    queryFn: () => fetchStudentRegistrationDocuments(studentRegistrationId)
})

export async function fetchStudentRegistrationDocuments(studentRegistrationId: number) {
    const { data } = await api.get<{ documents: Document[], total: number }>(`/student-documents/registration/${studentRegistrationId}`);
    return data;
}