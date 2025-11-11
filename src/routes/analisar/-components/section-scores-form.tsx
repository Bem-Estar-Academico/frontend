import { Controller, type Control } from "react-hook-form";
import z from "zod";
import type { FormFields } from "../inscricao_.$subscriptionId";
import { evaluationForm } from "./evaluation-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const evaluationKeys = evaluationForm.map((c) => c.key);

export const scoresSchema = z.object({
  scores: z.record(
    z.enum(evaluationKeys as [string, ...string[]]),
    z.string()
  ),
});

export function SectionScoresForm({
  control,
}: Readonly<{control: Control<FormFields> }>) {
  return (
    <div className="space-y-4">
        {evaluationForm.map((criteria) => (
            <FieldGroup>
            <Controller
            name={`scores.${criteria.key}`}
            control={control}
            render={({ field, fieldState }) => (
                <Field
                orientation="responsive"
                data-invalid={fieldState.invalid}
                >
                <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                        {criteria.question}
                    </FieldLabel>
                    
                    {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                </FieldContent>
                <Select
                    name={field.name}
                    value={field.value ? field.value : undefined}
                    onValueChange={field.onChange}
                >
                    <SelectTrigger
                    id="form-rhf-select-language"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px]"
                    >
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                        {criteria.options.map((opt) => (
                            <SelectItem key={opt.key} value={opt.key}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                </Field>
            )}
            />
        </FieldGroup>
        ))}
    </div>
  );
}
