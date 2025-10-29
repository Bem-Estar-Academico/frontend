import { Controller, useWatch, type Control } from "react-hook-form";
import type { FormFields } from "../inscricao.$subscriptionId";
import { FieldGroup, Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import z from "zod";

export const resultSchema = z.object({
    approved_food_allowance: z.string().optional(),
    approved_housing_allowance: z.string().optional(),
    approved_daycare_allowance: z.string().optional(),
    approved_graduation_scholarship: z.string().optional(),
    appeal_documents: z.record(z.enum(["required", "not-required"])).optional(),
    status: z.enum(["APPROVED", "REJECTED", "APPEAL"]),
    notes: z.string().optional(),
})

const allowanceStatus = [
  { label: "Aprovado", value: "true" },
  { label: "Indeferido", value: "false" },
] as const;

const ivsStatus = [
  { label: "Aprovado", value: "APPROVED" },
  { label: "Indeferido", value: "REJECTED" },
  { label: "Recurso", value: "APPEAL" },
] as const;

export function SectionResult({control}: {control: Control<FormFields>}) {
  const selectedStatus = useWatch({
    control: control,
    name: "status",
  });
  
  return (
    <div>
      <div>
        <div className="my-4 flex items-center gap-4">
          Índice de Vulnerabilidade Socioeconômico: <Badge variant={'outline'} className="text-md">45.6</Badge>
        </div>
        <FieldGroup>
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                orientation={"horizontal"}
                data-invalid={fieldState.invalid}
              >
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-select-language">
                    Status
                  </FieldLabel>
                 
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="form-rhf-select-language"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {ivsStatus.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </FieldGroup>
      </div>
            
      {selectedStatus === "APPROVED" &&
       <>
        <Separator className="my-4" />
        <div className="mt-6">
          <h5 className="mb-4 font-semibold">Auxílios</h5>
          <FieldGroup>
            <Controller
              name="approved_graduation_scholarship"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation={"horizontal"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel>
                      Bolsa Pró-Graduando
                    </FieldLabel>
                  
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {allowanceStatus.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
              <Controller
              name="approved_food_allowance"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation={"horizontal"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel>
                      Auxílio Alimentação
                    </FieldLabel>
                  
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {allowanceStatus.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
              <Controller
              name="approved_housing_allowance"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation={"horizontal"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel>
                      Auxílio Moradia
                    </FieldLabel>
                  
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {allowanceStatus.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
              <Controller
              name="approved_daycare_allowance"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation={"horizontal"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel>
                      Auxílio Creche
                    </FieldLabel>
                  
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {allowanceStatus.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
        </div>
       </>
      }
      { selectedStatus === 'APPEAL' && 
        <>
            <Separator className="my-4" />
            <AppealSection control={control} />
        </>
      }

      <Controller
        name="notes"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="mt-4" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-textarea-about">
              Observações
            </FieldLabel>
            <Textarea
              {...field}
              id="form-rhf-textarea-about"
              aria-invalid={fieldState.invalid}
              placeholder="Insira suas observações aqui"
              className="min-h-[120px]"
            />
            {/* <FieldDescription>
              Tell us more about yourself. This will be used to help us
              personalize your experience.
            </FieldDescription> */}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button className="w-full max-w-xs mt-4">Finalizar</Button>
    </div>
  )
}

const documents = [
    { label: "Cadastro Único", value: "cad_unico"},
    { label: "Comprovante de Renda", value: "comp_renda"},
    { label: "Comprovante de Matrícula", value: "comp_matricula"},
    { label: "Documento de Identificação", value: "doc_identificacao"},
]

function AppealSection({ control }: { control: Control<FormFields> }) {
    return(
        <div>
            <h5 className="mb-4 font-semibold">Documentos para Recurso</h5>
            <FieldGroup>
                {documents.map((doc) => (
                    <Controller
                        key={doc.value}
                        name={`appeal_documents.${doc.value}`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field
                                orientation={"horizontal"}
                                data-invalid={fieldState.invalid}
                            >
                                <FieldContent>
                                    <FieldLabel>
                                        {doc.label}
                                    </FieldLabel>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </FieldContent>
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                        className="min-w-[120px]"
                                    >
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="required">Obrigatório</SelectItem>
                                        <SelectItem value="not-required">Não Obrigatório</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                ))}
            </FieldGroup>
        </div>
    )
}
