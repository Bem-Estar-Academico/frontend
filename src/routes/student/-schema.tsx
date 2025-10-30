import { z } from 'zod';
import formData from './-data';

const requiredString = z.string({
  required_error: "Este campo é obrigatório",
}).min(1, "Este campo é obrigatório");

const schemaShape = formData.sections
  .flatMap(section => section.questions)
  .reduce((acc, q) => {
    let fieldSchema: z.ZodTypeAny;

    switch (q.type) {
      case 'text':
      case 'textarea':
        fieldSchema = q.required ? requiredString : z.string().optional();
        break;

      case 'email':
        fieldSchema = q.required 
          ? requiredString.email("E-mail inválido") 
          : z.string().email("E-mail inválido").optional().or(z.literal(""));
        break;
        
      case 'radio':
        fieldSchema = q.required ? requiredString : z.string().optional();
        break;

      case 'checkbox':
        fieldSchema = q.required 
          ? z.array(z.string()).min(1, "Selecione ao menos uma opção") 
          : z.array(z.string()).optional();
        break;

      case 'checkbox-single':
        fieldSchema = q.required 
          ? z.boolean().refine(val => val === true, "Este campo é obrigatório") 
          : z.boolean().optional();
        break;

      case 'file': {
        const maxSize = q.maxSize || 10 * 1024 * 1024;
        
        const acceptedTypes = q.accept 
          ? q.accept.split(',').map(t => t.trim()) 
          : ['application/pdf'];

        const fileSchema = z
          .instanceof(File, { message: "Por favor, anexe um arquivo." })
          .refine(
            (file) => file.size <= maxSize,
            `O arquivo não pode ser maior que ${maxSize / 1024 / 1024}MB.`
          )
          .refine(
            (file) => acceptedTypes.includes(file.type),
            `Tipo de arquivo inválido. Somente ${acceptedTypes.join(', ')} são aceitos.`
          );
          
        fieldSchema = q.required 
          ? fileSchema 
          : fileSchema.optional().nullable();
        break;
      }
      default:
        fieldSchema = z.any();
    }

    acc[q.id] = fieldSchema;
    return acc;
  }, {} as Record<string, z.ZodTypeAny>);

  
const beneficiosSchema = z.object({
    requested_food_allowance: z.boolean(),
    requested_housing_allowance: z.boolean(),
    requested_daycare_allowance: z.boolean(),
    requested_graduation_scholarship: z.boolean(),
})
export const formSchema = z.object({
  has_food_allowance: z.boolean(),
  has_housing_allowance: z.boolean(),
  has_daycare_allowance: z.boolean(),
  has_graduation_scholarship: z.boolean(),
} ).extend({
  ...schemaShape,
}).merge(beneficiosSchema).superRefine((data, ctx) => {
    if (data.has_food_allowance && !data.requested_food_allowance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione se deseja solicitar o Auxílio Alimentação.",
      });
    }
    if (data.has_housing_allowance && !data.requested_housing_allowance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione se deseja solicitar o Auxílio Moradia.",
      });
    }
    if (data.has_daycare_allowance && !data.requested_daycare_allowance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione se deseja solicitar o Auxílio Creche.",
      });
    }
    if (data.has_graduation_scholarship && !data.requested_graduation_scholarship) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione se deseja solicitar a Bolsa de Graduação.",
      });
    }
});

export type FormValues = z.infer<typeof formSchema>;

export const getInitialValues = (): FormValues => {
  return formData.sections
    .flatMap(section => section.questions)
    .reduce((acc, q) => {
      switch (q.type) {
        case 'text':
        case 'email':
        case 'textarea':
        case 'radio':
          acc[q.id] = "";
          break;
        case 'checkbox':
          acc[q.id] = [];
          break;
        case 'checkbox-single':
          acc[q.id] = false;
          break;
        case 'file':
          acc[q.id] = null;
          break;
        default:
          acc[q.id] = undefined;
      }
      return acc;
    }, {} as Record<string, any>);
};