import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputFile({ title } : { title: string }) {
  return (
    <div className="grid w-full max-w-xs items-center gap-3">
      <Label htmlFor="file" className="text-xs font-medium">{title}</Label>
      <Input id="file" type="file" className="!text-xs file:text-xs w-52"/>
    </div>
  )
}