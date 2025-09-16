import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { IconCircleCheckFilled, IconCircleXFilled, IconCircle, IconHelpCircleFilled, IconProgress } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border-1 px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        allowed:
          "bg-background text-muted-foreground",
        denied:
          "bg-background text-muted-foreground",
        pending:
          "bg-background text-muted-foreground",
        appeal:
          "bg-background text-muted-foreground",
        review:
          "bg-background text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
)

const variantIcons = {
  allowed: { Icon: IconCircleCheckFilled, className: "text-[#22C55E]" },
  denied: { Icon: IconCircleXFilled, className: "text-[#DC2626]" },
  pending: { Icon: IconCircle, className: "text-[#737373]" },
  appeal: { Icon: IconHelpCircleFilled, className: "text-[#9333EA]" },
  review: { Icon: IconProgress, className: "text-[#3B82F6]" },
}


const variantText = {
  allowed: "Deferido",
  denied: "Indeferido",
  pending: "Pendente",
  appeal: "Recurso",
  review: "Em Análise",
}

function StatusBadge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof statusBadgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"
  const icon = variant ? variantIcons[variant] : null

  return (
    <Comp
      className={cn(statusBadgeVariants({ variant }), className)}
      {...props}
    >
      {icon ? (
        <icon.Icon className={cn("size-4", icon.className)} />
      ) : null}
      {variant ? variantText[variant] : null}
    </Comp>
  )
}

export { StatusBadge, statusBadgeVariants }