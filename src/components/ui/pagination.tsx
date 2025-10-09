import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const generatePages = (): (number | string)[] => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1))
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages)
      } else if (page >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 px-5 py-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" /> Anterior
      </Button>

      {generatePages().map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={p}
            size="sm"
            onClick={() => onPageChange(Number(p))}
            className={`px-3 ${
              p === page ? "text-black shadow-sm" : "text-gray-700 hover:text-black"
            }`}
            variant="ghost"
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Próximo <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
