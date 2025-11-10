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
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconCircle,
  IconHelpCircleFilled,
  IconProgress,
} from "@tabler/icons-react"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { getColumns } from "./columns"

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

export type Row = {
  id: number
  cpf: string
  nome: string
  matricula: string
  status: "Pendente" | "Em Análise" | "Em Recurso" | "Deferido" | "Indeferido"
  assistenteSocial: string
  documentos: number
  dataInscricao: string
}

export interface StudentDataTableProps {
  initialState?: InitialTableState;
  pageSizeOptions?: number[];
  data: Row[];
  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [8, 16, 24, 32, 40]

export function StudentDataTable({ data, initialState, pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS, isLoading = false }: Readonly<StudentDataTableProps>) {
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

  const table = useReactTable<Row>({
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
            placeholder="Buscar estudante"
            onChange={(event) => table.setGlobalFilter(String(event.target.value))}
          />
          <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statusOptions} />
        </div>  

        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer" onClick={() => setMaskPersonal((v) => !v)}>
            {maskPersonal ? <><Eye />Mostrar</> : <><EyeOff />Esconder</>}
          </Button>
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