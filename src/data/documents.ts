export const appeal_documents = [
    { label: "Cadastro Único", value: "cad_unico"},
    // { label: "Declaração Escolar", value: "decl_escolar"},
    // { label: "Declaração de Participação em Atividade Acadêmica", value: "decl_participacao_atividade_academica"},  
    // { label: "Comprovante de Confirmação de Matrícula", value: "comp_matricula"},
    { label: "Documento de Identificação", value: "doc_identificacao"},
    { label: "Cartão de Gestante", value: "cartao_gestante"},
    { label: "Laudo Médico", value: "laudo_medico"},
    // { label: "Declaração Comprobatória CRAS", value: "declaracao_cras"},
    // { label: "Declaração de Recolhimento Unidade Prisional", value: "decl_recolhimento_unidade_prisional"},
    // { label: "Alvará de Soltura", value: "alvara_soltura"},
    { label: "Solicitação de Refúgio", value: "solicitacao_refugio"},
    { label: "Declaração de entidade ou abrigo de acolhimento", value: "decl_entidade_abrigo"},
]

export const DOCUMENTS_MAP: Record<string, string> = {
  cad_unico: "Comprovante de Renda",
  doc_identificacao: "Documento de Identificação",
  cartao_gestante: "Cartão de Gestante",
  laudo_medico: "Laudo Médico",
  solicitacao_refugio: "Solicitação de Refúgio",
  decl_entidade_abrigo: "Declaração de entidade ou abrigo de acolhimento",
}