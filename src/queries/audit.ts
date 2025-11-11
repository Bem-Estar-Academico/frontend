import { api } from "@/api";
import type { AuditLog } from "@/types/audit";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

export const auditQueryOptions = queryOptions({
    queryKey: ['audit'],
    queryFn: fetchAudit
})

export async function fetchAudit() {
    
    const { data } = await api.get<AuditLog[]>('/audit/');

    if (!data) {
        throw notFound();
    }

    return data;
}