import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Controller, type Control } from "react-hook-form";
import z from "zod";
import type { FormFields } from "../inscricao.$subscriptionId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CircleCheck } from "lucide-react";
import { Label } from "@/components/ui/label";

export const eligibilityCriteria = [
  { id: "rede-publica", label: "Egresso da rede pública de educação básica" },
  {
    id: "bolsista-integral",
    label:
      "Egresso da rede privada na condição de bolsista integral na educação básica",
  },
  {
    id: "vagas-reservadas",
    label:
      "Matriculado nas vagas reservadas de que trata a lei no 12.711, de 29 de Agosto de 2012",
  },
  {
    id: "abrigo",
    label:
      "Estudante oriundo de entidade ou de abrigo de acolhimento institucional não adotado em idade de saída",
  },
  {
    id: "vulnerabilidade",
    label:
      "Integrante de grupo familiar em situação de vunerabilidade socioeconômica, observado o limite de renda bruta familiar mensal per capita de até 1 (um) salário mínimo",
  },
  {
    id: "quilombola",
    label: "Ser estudante quilombola, indígena ou de comunidades tradicionais",
  },
];

export const criteriaSchema = z.object({
  criteria: z
    .array(
      z.enum(
        eligibilityCriteria.map((criterion) => criterion.id) as [
          string,
          ...string[],
        ],
      ),
    ),
});

export const nonEligibilityNotice = {
    id: "non-eligibility-notice",
    label: "Não atende aos critérios de elegibilidade"
}

export function SectionCriteria({
  control,
}: Readonly<{control: Control<FormFields> }>) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Critérios de Elegibilidade</CardTitle>

        </CardHeader>
      

        <CardContent>
          <div className="space-y-3">
            <Controller
                name="criteria"
                control={control}
                render={({ field, fieldState }) => (
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldGroup data-slot="checkbox-group" className="grid gap-2 ">
                      {eligibilityCriteria.map((criterion) => (
                        <Field
                          key={criterion.id}
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <Label className="w-full min-h-[60px] hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                              <Checkbox
                                id="toggle-2"
                                checked={field.value.includes(criterion.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, criterion.id]
                                    : field.value.filter((value: string) => value !== criterion.id)
                                  field.onChange(newValue)
                                }}
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                              />
                              <div className="grid gap-1.5 font-normal text-md">
                                 {criterion.label}
                              </div>
                            </Label>
                        </Field>
                      ))}
                    
                    </FieldGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldSet>
                )}
              />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
