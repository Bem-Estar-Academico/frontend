import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { IconCircleCheckFilled, IconCircleXFilled, IconCircle, IconHelpCircleFilled, IconProgress } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "bg-background text-muted-foreground inline-flex items-center justify-center rounded-md border-1 px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-4 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        aproved:
          "[&>svg]:text-green-500",
        denied:
          "[&>svg]:text-red-600",
        pending:
          "[&>svg]:text-muted-foreground",
        appeal:
          "[&>svg]:text-purple-600",
        review:
          "[&>svg]:text-blue-500",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
)

const variantIcons = {
  aproved: { Icon: IconCircleCheckFilled },
  denied: { Icon: IconCircleXFilled },
  pending: { Icon: IconCircle },
  appeal: { Icon: IconHelpCircleFilled },
  review: { Icon: IconProgress },
}

const variantText = {
  aproved: "Deferido",
  denied: "Indeferido",
  pending: "Pendente",
  appeal: "Recurso",
  review: "Em Análise",
}

function StatusBadge({
  className,
  variant = "pending",
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
      {icon ? (<icon.Icon/>) : null}
      {variant ? variantText[variant] : null}
    </Comp>
  )
}

export { StatusBadge, statusBadgeVariants }