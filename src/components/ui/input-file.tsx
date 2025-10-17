import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import React from "react";

type InputFileProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  id?: string;
};

export function InputFile({ title, id = "file", ...inputProps }: InputFileProps) {
  return (
    <div className="grid w-full max-w-xs items-center gap-3">
      <Label htmlFor={id} className="text-xs font-medium">{title}</Label>
      <Input id={id} type="file" className="!text-xs file:text-xs w-52" {...inputProps}/>
    </div>
  )
}