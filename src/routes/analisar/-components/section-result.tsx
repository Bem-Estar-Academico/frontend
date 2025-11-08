import { Controller, useWatch, type Control } from "react-hook-form";
import { FieldGroup, Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormFields } from "../inscricao_.$subscriptionId";

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
  { label: "Deferido", value: "true" },
  { label: "Indeferido", value: "false" },
] as const;

const ivsStatus = [
  { label: "Deferido", value: "APPROVED" },
  { label: "Indeferido", value: "REJECTED" },
  { label: "Indeferido com Recurso", value: "APPEAL" },
] as const;

type SectionResultProps = {
  control: Control<FormFields>;
  requestedAllowances: {
    food_allowance: boolean;
    housing_allowance: boolean;
    daycare_allowance: boolean;
    graduation_scholarship: boolean;
  }
  offeredAllowances: {
    food_allowance: boolean;
    housing_allowance: boolean;
    daycare_allowance: boolean;
    graduation_scholarship: boolean;
  }
};

export function SectionResult({control, offeredAllowances, requestedAllowances}: SectionResultProps) {
  const selectedStatus = useWatch({
    control: control,
    name: "status",
  });
  
  return (
   <Card className="w-full md:col-span-2">
    <CardHeader>
      <CardTitle className="text-xl">Resultado da Análise</CardTitle>
    </CardHeader>
    <CardContent>
       <div className="grid grid-cols-2 gap-8 w-full h-full">
        <div>
          <div className="flex flex-col gap-4">
            {/* <div className="flex items-center gap-4">
              Índice de Vulnerabilidade Socioeconômico: <Badge variant={'outline'} className="text-md">45.6</Badge>
            </div> */}
            <FieldGroup className="items-center">
              <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation={"horizontal"}
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent className="flex-0">
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
                        <SelectValue placeholder="Selecione o status" />
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
          
            <div className="mt-14">
              <h5 className="mb-4 font-semibold">Auxílios</h5>
              <FieldGroup>
                  {
                    offeredAllowances.graduation_scholarship && (
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
                              value={requestedAllowances.graduation_scholarship ? field.value : "not-requested"}
                              onValueChange={field.onChange}
                              disabled={!requestedAllowances.graduation_scholarship}
                            >
                              <SelectTrigger
                                id="form-rhf-select-language"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {!requestedAllowances.graduation_scholarship && (
                                  <SelectItem key="not-requested" value="not-requested">
                                    Não solicitado
                                  </SelectItem>
                                )}
                                {requestedAllowances.graduation_scholarship && allowanceStatus.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>
                        )}
                      />
                    )
                  }
                  {
                    offeredAllowances.food_allowance && (
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
                              value={requestedAllowances.food_allowance ? field.value : "not-requested"}
                              onValueChange={field.onChange}
                              disabled={!requestedAllowances.food_allowance}
                            >
                              <SelectTrigger
                                id="form-rhf-select-language"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {!requestedAllowances.food_allowance && (
                                  <SelectItem key="not-requested" value="not-requested">
                                    Não solicitado
                                  </SelectItem>
                                )}
                                {requestedAllowances.food_allowance && allowanceStatus.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>
                        )}
                      />
                    )
                  }
                  {
                    offeredAllowances.housing_allowance && (
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
                              value={requestedAllowances.housing_allowance ? field.value : "not-requested"}
                              onValueChange={field.onChange}
                              disabled={!requestedAllowances.housing_allowance}
                            >
                              <SelectTrigger
                                id="form-rhf-select-language"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {!requestedAllowances.housing_allowance && (
                                  <SelectItem key="not-requested" value="not-requested">
                                    Não solicitado
                                  </SelectItem>
                                )}
                                {requestedAllowances.housing_allowance && allowanceStatus.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>
                        )}
                      />
                    )
                  }
                  {
                    offeredAllowances.daycare_allowance && (
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
                              value={requestedAllowances.daycare_allowance ? field.value : "not-requested"}
                              onValueChange={field.onChange}
                              disabled={!requestedAllowances.daycare_allowance}
                            >
                              <SelectTrigger
                                id="form-rhf-select-language"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {!requestedAllowances.daycare_allowance && (
                                  <SelectItem key="not-requested" value="not-requested">
                                    Não solicitado
                                  </SelectItem>
                                )}
                                {requestedAllowances.daycare_allowance && allowanceStatus.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>
                        )}
                      />
                    )
                  }
              </FieldGroup>
            </div>
          </>
          }
          { selectedStatus === 'APPEAL' && 
            <>
      
                <AppealSection control={control} />
            </>
          }
        </div>
        <div className="">
          <Controller
            name="notes"
            control={control}
            render={({ field, fieldState }) => (
              <Field  data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-textarea-about">
                  Observações
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-rhf-textarea-about"
                  aria-invalid={fieldState.invalid}
                  placeholder="Insira suas observações aqui"
                  className="min-h-[120px] resize-none"
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
        </div>
      </div>
    </CardContent>
   </Card>
  )
}

export const appeal_documents = [
    { label: "Cadastro Único", value: "cad_unico"},
    { label: "Comprovante de Renda", value: "comp_renda"},
    { label: "Comprovante de Matrícula", value: "comp_matricula"},
    { label: "Documento de Identificação", value: "doc_identificacao"},
]

function AppealSection({ control }: { control: Control<FormFields> }) {
    return(
        <div className="mt-14">
            <h5 className="mb-4 font-semibold">Documentos para Recurso</h5>
            <FieldGroup>
                {appeal_documents.map((doc) => (
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
                                        <SelectItem value="required">Reenviar</SelectItem>
                                        <SelectItem value="not-required">Não Reenviar</SelectItem>
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
