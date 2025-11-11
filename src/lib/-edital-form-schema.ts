import { z } from "zod"

export const availableBenefits = [
  { id: "auxilio_alimentacao", label: "Auxílio Alimentação" },
  { id: "auxilio_moradia", label: "Auxílio Moradia" },
  { id: "auxilio_creche", label: "Auxílio Creche" },
  { id: "bolsa_pro_graduando", label: "Bolsa Pró-Graduando" },
]

export const editalSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  social_workers: z.array(z.number()),
  benefit: z.array(z.string()).min(1, "Selecione ao menos um benefício."),
  applicationStart: z.date({
    required_error: "Selecione uma data de início para o edital.",
  }),
  applicationEnd: z.date().optional(),
  preliminaryResult: z.date().optional(),
  appealStart: z.date().optional(),
  appealEnd: z.date().optional(),
  finalResult: z.date().optional(),
})
.refine(
  (data) => !data.applicationEnd || data.applicationStart < data.applicationEnd,
  {
    path: ["applicationEnd"],
    message: "A data de término deve ser posterior à data de início.",
  }
)
.refine(
  (data) => !data.preliminaryResult || !data.applicationEnd || data.preliminaryResult > data.applicationEnd,
  {
    path: ["preliminaryResult"],
    message: "O resultado preliminar deve ocorrer após o fim das inscrições.",
  }
)
.refine(
  (data) => !data.appealStart || !data.preliminaryResult || data.appealStart > data.preliminaryResult,
  {
    path: ["appealStart"],
    message: "O início dos recursos deve ser após o resultado preliminar.",
  }
)
.refine(
  (data) => !data.appealEnd || !data.appealStart || data.appealEnd > data.appealStart,
  {
    path: ["appealEnd"],
    message: "O fim dos recursos deve ser após o início dos recursos.",
  }
)
.refine(
  (data) => !data.finalResult || !data.appealEnd || data.finalResult > data.appealEnd,
  {
    path: ["finalResult"],
    message: "O resultado final deve ocorrer após o término dos recursos.",
  }
)

export type EditalFormData = z.infer<typeof editalSchema>

export function getEditalErrorMessage(error: any): string {
  const status = error.response?.status

  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.response?.data?.detail && typeof error.response.data.detail === "string") {
    return error.response.data.detail
  }
  
  if (status === 400) {
    return "Dados inválidos. Verifique se todos os campos foram preenchidos corretamente."
  }
  if (status === 409) {
    return "Já existe um edital com este título e ano. Escolha um título ou ano diferente."
  }
  if (status === 401 || status === 403) {
    return "Você não tem permissão para esta ação."
  }
  if (status === 404) {
    return "Edital não encontrado. Não foi possível salvar."
  }

  return "Erro ao processar a solicitação. Por favor, tente novamente ou contate um administrador."
}