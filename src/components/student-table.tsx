"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Files,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusBadge } from "./ui/status-badge"
import { DataTableFacetedFilter } from "./ui/data-table-faceted-filter"
import { 
  IconCircleCheckFilled, 
  IconCircleXFilled, 
  IconCircle, 
  IconHelpCircleFilled, 
  IconProgress 
} from "@tabler/icons-react"

const data: Student[] = [
  {
    cpf: "123.456.789-01",
    nome: "Ana Souza",
    matricula: "20250101",
    status: "Pendente",
    progresso: 0,
    documentos: 11,
    dataInscricao: "2025-02-06T13:19:00",
  },
  {
    cpf: "123.456.789-07",
    nome: "Lucas Martins",
    matricula: "20250106",
    status: "Pendente",
    progresso: 0,
    documentos: 22,
    dataInscricao: "2025-02-05T16:00:00",
  },
  {
    cpf: "772.910.068-13",
    nome: "Marli Clarice Silveira",
    matricula: "20240102",
    status: "Pendente",
    progresso: 0,
    documentos: 22,
    dataInscricao: "2025-02-05T14:41:00",
  },
  {
    cpf: "573.850.954-45",
    nome: "Severino Yuri Araújo",
    matricula: "22111481",
    status: "Pendente",
    progresso: 0,
    documentos: 22,
    dataInscricao: "2025-02-05T14:21:00",
  },
  {
    cpf: "123.456.789-05",
    nome: "Fernanda Costa",
    matricula: "20250105",
    status: "Em Análise",
    progresso: 20,
    documentos: 10,
    dataInscricao: "2025-02-04T09:45:00",
  },
  {
    cpf: "123.456.789-03",
    nome: "Beatriz Lima",
    matricula: "20250103",
    status: "Recurso",
    progresso: 40,
    documentos: 16,
    dataInscricao: "2025-02-04T13:38:00",
  },
  {
    cpf: "123.456.789-02",
    nome: "João Pereira",
    matricula: "20250102",
    status: "Deferido",
    progresso: 100,
    documentos: 28,
    dataInscricao: "2025-02-03T13:21:00",
  },
  {
    cpf: "123.456.789-04",
    nome: "Carlos Almeida",
    matricula: "20250104",
    status: "Indeferido",
    progresso: 100,
    documentos: 8,
    dataInscricao: "2025-02-03T13:19:00",
  },
  {
    cpf: "111.222.333-01",
    nome: "Mariana Ferreira",
    matricula: "20250107",
    status: "Pendente",
    progresso: 0,
    documentos: 15,
    dataInscricao: "2025-02-02T11:00:00",
  },
  {
    cpf: "222.333.444-02",
    nome: "Rafael Gonçalves",
    matricula: "20250108",
    status: "Deferido",
    progresso: 100,
    documentos: 30,
    dataInscricao: "2025-02-01T10:15:00",
  },
];

const statusOptions = [
  {
    value: "Pendente",
    label: "Pendente",
    icon: <IconCircle className="text-muted-foreground" />,
  },
  {
    value: "Em Análise",
    label: "Em Análise",
    icon: <IconProgress className="text-blue-500" />,
  },
  {
    value: "Recurso",
    label: "Recurso",
    icon: <IconHelpCircleFilled className="text-purple-600" />,
  },
  {
    value: "Deferido",
    label: "Deferido",
    icon: <IconCircleCheckFilled className="text-green-500" />,
  },
  {
    value: "Indeferido",
    label: "Indeferido",
    icon: <IconCircleXFilled className="text-red-600" />,
  },
]

export type Student = {
  cpf: string
  nome: string
  matricula: string
  status: "Pendente" | "Em Análise" | "Recurso" | "Deferido" | "Indeferido"
  progresso: number
  documentos: number
  dataInscricao: string
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "cpf",
    header: () => <div className="text-center">CPF</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("cpf")}</div>,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "matricula",
    header: () => <div className="text-center">Matrícula</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("matricula")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const value = row.getValue("status") as string
      const map: Record<
        string,
        "approved" | "denied" | "pending" | "appeal" | "review"
      > = {
        "Deferido": "approved",
        "Indeferido": "denied",
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
    accessorKey: "progresso",
    header: () => <div className="text-center">Progresso</div>,
    cell: ({ row }) => {
      const progress = row.getValue("progresso") as number
      let progressColor = "bg-gray-400"
      if (progress > 0 && progress < 100) progressColor = "bg-yellow-400"
      if (progress === 100) {
        const status = row.getValue("status") as string
        progressColor = status === "Deferido" ? "bg-green-500" : "bg-red-500"
      }

      return (
        <div className="flex items-center justify-center gap-2 min-w-[120px]">
          <div className="h-1 w-[50%] rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              style={{ width: `${progress}%` }}
              className={`h-1 rounded-full ${progressColor}`}
            />
          </div>
          <span className="text-xs text-gray-500">{`${progress}%`}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "documentos",
    header: () => <div className="text-center">Documentos</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center text-gray-600">
        <Files className="mr-2 h-4 w-4 text-gray-400" />
        {row.getValue("documentos")}
      </div>
    ),
  },
  {
    accessorKey: "dataInscricao",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de Inscrição
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
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
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(student.cpf)}
              >
                Copiar CPF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Ver detalhes do estudante
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableHiding: false,
  },
]


export function StudentDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  })

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            className="min-w-[380px] focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black"
            placeholder="Buscar estudante..."
            value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nome")?.setFilterValue(event.target.value)
            }
          />
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statusOptions}
          />
        </div>
      </div>
      <div className="border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-14 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center gap-2 text-sm text-black ml-auto">
          <span>Itens por página</span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: any) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px] cursor-pointer text-black">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[8, 16, 24, 32, 40].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="cursor-pointer"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer text-gray-700 hover:text-black"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Anterior
          </Button>

          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              onClick={() => table.setPageIndex(page - 1)}
              className={`cursor-pointer px-3 ${table.getState().pagination.pageIndex + 1 === page ? "text-black shadow-sm" : "text-gray-700 hover:text-black"}`}
              variant="ghost"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer text-gray-700 hover:text-black"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
