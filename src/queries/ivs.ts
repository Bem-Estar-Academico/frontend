import { api } from "@/api";
import type { IVSResponseDTO } from "@/types/ivs-response-dto";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

export const ivsQueryOptions = queryOptions({
    queryKey: ['ivs'],
    queryFn: fetchIVS
})

export async function fetchIVS() {
    const { data } = await api.get<IVSResponseDTO[]>('/ivs');

    if (!data) {
        throw notFound();
    }

    return data;
}

export const exportIvsQueryOptions = queryOptions({
    queryKey: ['ivs-csv'],
    queryFn: fetchIvsCsv
})

export async function fetchIvsCsv() {
  const response = await api.get('/ivs/export/excel', {
    responseType: 'blob',
  });

  if (!response.data) {
    throw new Error('Arquivo CSV não encontrado');
  }

  return response.data;
}
