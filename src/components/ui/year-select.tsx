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
  startYear?: number,
  endYear?: number,
  defaultYear?: string,
  onChange?: (year: string) => void,
  className?: string
}

export function YearSelect({
  startYear = new Date().getFullYear() - 10,
  endYear = new Date().getFullYear() + 10,
  defaultYear,
  onChange,
  className,
}: YearSelectProps) {
  const years = React.useMemo(() => {
    const list: string[] = [];
    for (let y = endYear; y >= startYear; y--) {
      list.push(String(y));
    }
    return list;
  }, [startYear, endYear]);
  
  return (
    <Select
      defaultValue={defaultYear}
      onValueChange={(val) => {
        if (onChange) {
          onChange(val);
        }
      }}
    >
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
  );
}
