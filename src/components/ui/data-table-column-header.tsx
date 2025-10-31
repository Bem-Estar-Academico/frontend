import { cn } from "@/lib/utils"
import { IconArrowUp, IconArrowDown, IconArrowsUpDown } from "@tabler/icons-react"
import type { Column } from "@tanstack/react-table"
import { Button } from "./button"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
    if (!column.getCanSort()) {
        return <div className={cn("text-center", className)}>{title}</div>;
    }

    return (
    <div className="flex justify-center">
        <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            { column.getCanSort() &&
              <span   className={`ml-2 transform transition-transform duration-300`}>
                {column.getIsSorted() === "desc" && <IconArrowDown />}
                {column.getIsSorted() === "asc" && <IconArrowUp />}
                {!column.getIsSorted() && <IconArrowsUpDown />}
              </span>
            }
        </Button>
    </div>
    )
}