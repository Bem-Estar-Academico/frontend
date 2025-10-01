import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

interface SemesterSelectProps {
  value?: string
  semesters: string[]
  onChange?: (Semester: string) => void
  className?: string
}

export function SemesterSelect({
  value,
  semesters,
  onChange,
  className,
}: Readonly<SemesterSelectProps>) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Semestre" />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        <SelectGroup>
          {semesters.map((semester) => (
            <SelectItem key={semester} value={semester}>
              {semester}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
