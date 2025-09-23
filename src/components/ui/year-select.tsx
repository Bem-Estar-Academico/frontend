import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

interface YearSelectProps {
  value?: string
  onChange?: (year: string) => void
  startYear?: number
  endYear?: number
  className?: string
}

export function YearSelect({
  value,
  onChange,
  startYear = new Date().getFullYear() - 10,
  endYear = new Date().getFullYear() + 10,
  className,
}: YearSelectProps) {
  const years = React.useMemo(() => {
    const list: string[] = []
    for (let y = endYear; y >= startYear; y--) {
      list.push(String(y))
    }
    return list
  }, [startYear, endYear])

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Ano" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
