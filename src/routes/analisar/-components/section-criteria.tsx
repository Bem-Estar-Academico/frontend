import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Controller, type Control } from "react-hook-form";
import z from "zod";
import type { FormFields } from "../inscricao.$subscriptionId";

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
    )
    .min(1, "Selecione ao menos um critério de elegibilidade"),
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
      <h3 className="mb-8 text-2xl font-bold text-gray-800">
        Critérios de Elegibilidade
      </h3>

      <div className="space-y-3">
         <Controller
              name="criteria"
              control={control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldGroup data-slot="checkbox-group">
                    {eligibilityCriteria.map((criterion) => (
                      <Field
                        key={criterion.id}
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <Checkbox
                          id={`form-rhf-checkbox-${criterion.id}`}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          checked={field.value.includes(criterion.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, criterion.id]
                              : field.value.filter((value: string) => value !== criterion.id)
                            field.onChange(newValue)
                          }}
                        />
                        <FieldLabel
                          htmlFor={`form-rhf-checkbox-${criterion.id}`}
                          className="font-normal"
                        >
                          {criterion.label}
                        </FieldLabel>
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

      <Button variant={"ghost"} className="mt-4 text-center text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700">
        Estudante não atende a nenhum critério de elegibilidade
      </Button>
    </>
  );
}