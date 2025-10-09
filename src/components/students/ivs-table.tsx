import * as React from "react"
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type InitialTableState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  Eye,
  EyeOff,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconCircle,
  IconHelpCircleFilled,
  IconProgress,
} from "@tabler/icons-react"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

const MASK = "******"

export function getColumns(masked: boolean): ColumnDef<StudentIVS>[] {
  return [
    {
      accessorKey: "cpf",
      header: ({ column }) => <DataTableColumnHeader column={column} title="CPF" />,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const value = row.getValue("cpf") as string
        return (
          <div className="text-center">
            {masked ? MASK : value}
          </div>
        )
      },
    },
    {
      accessorKey: "name",
      enableGlobalFilter: true,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
      cell: ({ row }) => {
        const value = row.getValue("name") as string
        return <div className="text-center">{masked ? MASK : value}</div>
      },
    },
    {
      accessorKey: "registration",
      header: ({ column }) => <DataTableColumnHeader title="Matrícula" column={column} />,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const value = row.getValue("registration") as string
        return <div className="text-center">{masked ? MASK : value}</div>
      },
    },
    {
      accessorKey: "ivs",
      header: ({ column }) => <DataTableColumnHeader title="IVS" column={column} />,
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-center text-gray-600">
          {row.getValue("ivs")}
        </div>
      ),
    },
    {
      accessorKey: "approved_at",
      enableGlobalFilter: false,
      header: ({ column }) => <DataTableColumnHeader title="Data de Cadastro" column={column} />,
      cell: ({ row }) => {
        const date = new Date(row.getValue("approved_at"))
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
      accessorKey: "expires_at",
      enableGlobalFilter: false,
      header: ({ column }) => <DataTableColumnHeader title="Data de Expiração" column={column} />,
      cell: ({ row }) => {
        const date = new Date(row.getValue("expires_at"))
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
        
          <Link to="/consultar-ivs/$id" params={{ id: String(student.id) }} >
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Ver perfil</span>
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        )
      },
      enableHiding: false,
    },
  ]
}

export type StudentIVS = {
  id: number
  cpf: string
  name: string
  registration: string
  ivs: number,
  approved_at: string
  expires_at: string
}

export interface StudentDataTableProps {
  initialState?: InitialTableState;
  pageSizeOptions?: number[];
  data: StudentIVS[];
  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [8, 16, 24, 32, 40]

export function IVSDataTable({ data, initialState, pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS, isLoading = false }: Readonly<StudentDataTableProps>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [maskPersonal, setMaskPersonal] = React.useState(false)

  const columns = React.useMemo(() => getColumns(maskPersonal), [maskPersonal])
  
  const tableData = React.useMemo(
    () => (isLoading ? new Array(30).fill({}) : data),
    [isLoading, data]
  );

  const tableColumns = React.useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => (
              <Skeleton className="h-4 bg-gray-300 rounded-sm" />
            )
          }))
        : columns,
    [isLoading, columns]
  );

  const table = useReactTable<StudentIVS>({
    data: tableData,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
      ...initialState,
      pagination: {
        pageSize: pageSizeOptions?.[0] ?? 8,
        pageIndex: 0,
        ...initialState?.pagination,  
      },
    }
  })

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            className="min-w-[380px] focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black"
            placeholder="Buscar estudante"
            onChange={(event) => table.setGlobalFilter(String(event.target.value))}
          />
        </div>  

        <div className="flex items-center gap-2">
          <Button variant="secondary" className="cursor-pointer" onClick={() => setMaskPersonal((v) => !v)}>
            <EyeOff className="size-[16px]" />
          </Button>
          <Button variant="secondary" className="cursor-pointer">Exportar</Button>
        </div>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleFlatColumns().length} className="h-14 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} pageSizeOptions={pageSizeOptions}/>
    </div>
  )
}