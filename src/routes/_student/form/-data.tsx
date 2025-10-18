const formData: FormDataStructure = {
  sections: [
    {
      id: "s1",
      title: "Dados Pessoais",
      description: "Seção de teste com inputs básicos",
      questions: [
        {
          id: "q1",
          question: "Nome completo:",
          type: "text",
          required: true,
          placeholder: "Digite seu nome"
        },
        {
          id: "q2",
          question: "E-mail:",
          type: "email",
          required: true,
          placeholder: "seu@email.com"
        },
        {
          id: "q3",
          question: "Estado Civil:",
          type: "radio",
          required: true,
          options: [
            { id: "solteiro", label: "Solteiro(a)" },
            { id: "casado", label: "Casado(a)" },
            { id: "outro", label: "Outro" }
          ]
        }
      ]
    },
    {
      id: "s2",
      title: "Preferências",
      alert: {
        type: "warning",
        title: "Atenção!",
        message: "Preencha com atenção as informações abaixo."
      },
      questions: [
        {
          id: "q4",
          question: "Quais áreas você tem interesse?",
          type: "checkbox",
          required: true,
          options: [
            { id: "tech", label: "Tecnologia" },
            { id: "art", label: "Artes" },
            { id: "sport", label: "Esportes" },
            { id: "music", label: "Música" }
          ]
        },
        {
          id: "q5",
          question: "Conte um pouco sobre você:",
          type: "textarea",
          required: true,
          rows: 5,
          placeholder: "Escreva aqui..."
        }
      ]
    },
    {
      id: "s3",
      title: "Documentos",
      questions: [
        {
          id: "q6",
          question: "Anexe seu documento (PDF):",
          type: "file",
          required: true,
          accept: "application/pdf",
          maxSize: 5242880
        },
        {
          id: "q7",
          question: "Termos e Condições:",
          type: "checkbox-single",
          required: true,
          options: [
            {
              id: "aceito",
              label: "Eu aceito os termos e condições e declaro que todas as informações fornecidas são verdadeiras."
            }
          ]
        }
      ]
    }
  ]
};

export interface FormOption {
  id: string;
  label: string;
}

export interface FormAlert {
  type: string;
  title: string;
  message: string;
}

export interface FormQuestion {
  id: string;
  question: string;
  type: "checkbox" | "radio" | "text" | "email" | "textarea" | "file" | "checkbox-single";
  required: boolean;
  options?: FormOption[];
  placeholder?: string;
  description?: string;
  rows?: number;
  accept?: string;
  maxSize?: number;
}

export interface FormSection {
    id: string;
    title: string;
    description?: string;
    alert?: FormAlert;
    questions: FormQuestion[];
}

export interface FormDataStructure {
    sections: FormSection[];
}

export interface FormProps {
    formData: FormDataStructure;
}

export default formData;