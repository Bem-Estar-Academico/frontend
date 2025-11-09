import type { ColumnDef } from "@tanstack/react-table";
import type { Row } from "./student-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../ui/status-badge";
import { Files, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { DataTableColumnHeader } from "../ui/data-table-column-header";

const MASK = "*****"

function maskCPF(cpf: string): string {
  const cleanCPF = cpf.replaceAll(/\D/g, '');
  
  // quero o formato XXX.XXX.***-XX
  const visiblePart = cleanCPF.slice(0, 6);
  const hiddenPart = '***';
  const lastPart = cleanCPF.slice(9, 11);

  return `${visiblePart.slice(0, 3)}.${visiblePart.slice(3, 6)}.${hiddenPart}-${lastPart}`;
}

export function getColumns(masked: boolean): ColumnDef<Row>[] {
  return [
    {
      accessorKey: "cpf",
      header: ({ column }) => <DataTableColumnHeader column={column} title="CPF" />,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const value = row.getValue("cpf") as string
        return (
          <div className="text-center">
            {masked ? maskCPF(value) : value}
          </div>
        )
      },
    },
    {
      accessorKey: "nome",
      enableGlobalFilter: true,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
      cell: ({ row }) => {
        const value = row.getValue("nome") as string
        return <div className="text-center">{masked ? MASK : value}</div>
      },
    },
    {
      accessorKey: "matricula",
      header: ({ column }) => <DataTableColumnHeader title="Matrícula" column={column} />,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const value = row.getValue("matricula") as string
        return <div className="text-center">{masked ? MASK : value}</div>
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader title="Status" column={column} />,
      enableGlobalFilter: false,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      cell: ({ row }) => {
        const value = row.getValue("status") as string
        const map: Record<string, "approved" | "rejected" | "pending" | "appeal" | "review"> = {
          "Deferido": "approved",
          "Indeferido": "rejected",
          "Pendente": "pending",
          "Recurso": "appeal",
          "Em Análise": "review",
        }
        return (
          <div className="flex justify-center">
            <StatusBadge variant={map[value]} />
          </div>
        )
      },
    },
    {
      accessorKey: "assistenteSocial",
      header: ({ column }) => <DataTableColumnHeader title="Assistente Social" column={column} />,
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue("assistenteSocial")}
        </div>
      ),
    },
    {
      accessorKey: "documentos",
      header: ({ column }) => <DataTableColumnHeader title="Documentos" column={column} />,
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-center text-gray-600">
          <Files className="mr-2 h-4 w-4 text-gray-400" />
          {row.getValue("documentos")}
        </div>
      ),
    },
    {
      accessorKey: "dataInscricao",
      enableGlobalFilter: false,
      header: ({ column }) => <DataTableColumnHeader title="Data de Inscrição" column={column} />,
      cell: ({ row }) => {
        const date = new Date(row.getValue("dataInscricao"))
        const formattedDate = new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date)
        return (
          <div className="text-center">{formattedDate.replace(",", " às")}</div>
        )
      },
    },
    {
      id: "actions",
      enableGlobalFilter: false,
      cell: ({ row }) => {
        const student = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link to={`/analisar/inscricao/$subscriptionId`} params={{ subscriptionId: String(student.id) }}>
                  Analisar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                disabled
              >
                Ver informações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      enableHiding: false,
    },
  ]
}