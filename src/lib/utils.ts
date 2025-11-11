import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cpfMask(value: string) {
  const cleanedValue = value.replaceAll(/\D/g, "");

  return cleanedValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+$/, "$1");
}

export function hideCpf(cpf: string): string {
  const cleanCPF = cpf.replaceAll(/\D/g, '');
  
  const visiblePart = cleanCPF.slice(0, 6);
  const hiddenPart = '***';
  const lastPart = cleanCPF.slice(9, 11);

  return `${visiblePart.slice(0, 3)}.${visiblePart.slice(3, 6)}.${hiddenPart}-${lastPart}`;
}

export function formatDate(date: string | null) {
  if (!date) return "A decidir";
  return new Date(date).toLocaleDateString("pt-BR", { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
};

export function formatDateTime(date: string | Date | null) {
  if (!date) return "—";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return parsedDate.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
