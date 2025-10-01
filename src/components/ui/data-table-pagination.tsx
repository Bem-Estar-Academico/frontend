import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({ table, pageSizeOptions = [5, 10, 20, 50] }: DataTablePaginationProps<TData>) {
  return (
     <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center gap-2 text-sm text-black ml-auto">
          <span>Itens por página</span>
          <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value: string) => table.setPageSize(Number(value))}>
            <SelectTrigger className="h-8 w-[70px] cursor-pointer text-black">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`} className="cursor-pointer">
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="cursor-pointer text-gray-700 hover:text-black" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
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

          <Button variant="ghost" size="sm" className="cursor-pointer text-gray-700 hover:text-black" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próximo
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
  )
} 