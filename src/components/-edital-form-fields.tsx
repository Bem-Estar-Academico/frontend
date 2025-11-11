import type { Control, ControllerRenderProps } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { EditalFormData } from "@/lib/-edital-form-schema"

export function DatePickerField({ 
  control, 
  name, 
  title, 
  isRequired 
}: Readonly<{ 
  control: Control<EditalFormData>
  name: 
    | "applicationStart"
    | "applicationEnd"
    | "preliminaryResult"
    | "appealStart"
    | "appealEnd"
    | "finalResult"
  title: string
  isRequired?: boolean
}>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DatePicker 
              isRequired={isRequired} 
              title={title} 
              value={field.value} 
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function CheckboxItem({ 
  item, 
  field 
}: Readonly<{ 
  item: { id: string, label: string }
  field: ControllerRenderProps<EditalFormData, "benefit">
}>) {
  return (
    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value?.includes(item.id)}
          onCheckedChange={(checked) =>
            checked
              ? field.onChange([...field.value, item.id])
              : field.onChange((field.value || []).filter((v: string) => v !== item.id))
          }
        />
      </FormControl>
      <FormLabel className="font-normal">{item.label}</FormLabel>
    </FormItem>
  )
}