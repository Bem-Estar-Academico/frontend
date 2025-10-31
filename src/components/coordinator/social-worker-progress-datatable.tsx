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
import { Skeleton } from "@/components/ui/skeleton"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { SocialWorkerProgressResponseDTO } from "@/types/team-progress-dto"

const MASK = "******"
export interface StudentDataTableProps {
  initialState?: InitialTableState;
  pageSizeOptions?: number[];
  data: SocialWorkerProgressResponseDTO[];
  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [8, 16, 24, 32, 40]

export function SocialWorkerProgressDataTable({ data, initialState, pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS, isLoading = false }: Readonly<StudentDataTableProps>) {
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

  const table = useReactTable<SocialWorkerProgressResponseDTO>({
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
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            className="min-w-[380px] focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black"
            placeholder="Buscar assistente social"
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

export function getColumns(masked: boolean): ColumnDef<SocialWorkerProgressResponseDTO>[] {
  return [

    {
      accessorKey: "full_name",
      enableGlobalFilter: true,
      enableSorting: !masked,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
      cell: ({ row }) => {
        const value = row.getValue("full_name") as string
        return <div className="text-center">{masked ? MASK : value}</div>
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader title="E-mail" column={column} />,
      enableGlobalFilter: true,
      enableSorting: !masked,
      cell: ({ row }) => {
        const value = row.getValue("email") as string
        return <div className="text-center">{masked ? MASK : value}</div>
      },
    },
    {
      accessorKey: "last_review",
      enableGlobalFilter: false,
      header: ({ column }) => <DataTableColumnHeader title="Data da Última Análise" column={column} />,
      cell: ({ row }) => {
        const date = new Date(row.getValue("last_review"))

        if(isNaN(date.getTime())) {
          return <div className="text-center">---</div>
        }

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
      accessorKey: "progress",
      enableGlobalFilter: false,
      header: ({ column }) => <DataTableColumnHeader title="Progresso" column={column} />,
      cell: ({ row }) => {
        const progress = row.getValue("progress") as number
        let progressColor = "bg-gray-400"
        if (progress > 0 && progress < 50) progressColor = "bg-yellow-400"
        if (progress >= 50 && progress < 100) progressColor = "bg-green-400"
        if (progress === 100) {
          progressColor = "bg-green-500"
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
      id: "actions",
      enableGlobalFilter: false,
      cell: ({ row }) => {
        const member = row.original
        return (
          <Link to="/consultar-ivs/$id" params={{ id: String(member.id) }} >
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