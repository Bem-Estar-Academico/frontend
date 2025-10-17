const formData = {
  sections: [
    {
      id: "s1",
      title: "Programas de Interesse e Critérios de Elegibilidade",
      description: "Esta seção inicial serve para entender as solicitações do estudante e verificar critérios básicos de elegibilidade para os auxílios.",
      questions: [
        {
          id: "q5",
          question: "Quais programas você deseja solicitar?",
          type: "checkbox",
          required: true,
          options: [
            { id: "bpg", label: "Bolsa Pró-Graduando" },
            { id: "aa", label: "Auxílio Alimentação - apenas para unidades educacionais que não possuem restaurante universitário." },
            { id: "am", label: "Auxílio Moradia" },
            { id: "ac", label: "Auxílio Creche" },
            { id: "ru", label: "Residência Universitária" }
          ]
        },
        {
          id: "q21",
          question: "Graduação:",
          type: "radio",
          required: true,
          options: [
            { id: "primeira", label: "Estou cursando a primeira graduação." },
            { id: "outra", label: "Estou cursando ou concluí outra graduação." }
          ]
        },
        {
          id: "q22",
          question: "Se está cursando ou concluiu outra graduação, especifique o curso e a instituição:",
          type: "text",
          required: true,
          placeholder: "Ex: Direito - UFPE"
        },
        {
          id: "q36",
          question: "Estudou o Ensino Médio em:",
          type: "radio",
          required: true,
          options: [
            { id: "priv_bolsa", label: "Escola privada com bolsa integral" },
            { id: "pub_priv_bolsa", label: "Escola pública e escola privada com bolsa integral" },
            { id: "pub_priv", label: "Escola pública e escola privada" }
          ]
        }
      ]
    },
    {
      id: "s2",
      title: "Identificação e Dados Acadêmicos do Estudante",
      questions: [
        {
          id: "q6",
          question: "Nome completo:",
          type: "text",
          required: true,
          placeholder: "Digite seu nome completo"
        },
        {
          id: "q7",
          question: "RG:",
          type: "text",
          required: true,
          placeholder: "Digite seu RG"
        },
        {
          id: "q8",
          question: "CPF:",
          type: "text",
          required: true,
          placeholder: "Digite seu CPF"
        },
        {
          id: "q9",
          question: "Telefone/Celular:",
          type: "text",
          required: true,
          placeholder: "(XX) XXXXX-XXXX"
        },
        {
          id: "q10",
          question: "E-mail:",
          type: "email",
          required: true,
          placeholder: "seuemail@exemplo.com"
        },
        {
          id: "q11",
          question: "Endereço (Onde reside atualmente):",
          type: "text",
          required: true,
          placeholder: "Endereço completo"
        },
        {
          id: "q12",
          question: "Tipo de Logradouro:",
          type: "text",
          required: true,
          placeholder: "Ex: Rua, Av."
        },
        {
          id: "q13",
          question: "Nome de Logradouro:",
          type: "text",
          required: true,
          placeholder: "Nome da rua/avenida"
        },
        {
          id: "q14",
          question: "Número da residência:",
          type: "text",
          required: true,
          placeholder: "Ex: 123 ou S/N"
        },
        {
          id: "q15",
          question: "Complemento:",
          type: "text",
          required: true,
          placeholder: "Ex: Apto 101, Fundos"
        },
        {
          id: "q16",
          question: "Bairro:",
          type: "text",
          required: true,
          placeholder: "Digite seu bairro"
        },
        {
          id: "q17",
          question: "CEP:",
          type: "text",
          required: true,
          placeholder: "XXXXX-XXX"
        },
        {
          id: "q19",
          question: "Estado:",
          type: "text",
          required: true,
          placeholder: "Ex: Alagoas"
        },
        {
          id: "q20",
          question: "Cidade de Procedência (se for diferente da residência atual):",
          type: "text",
          required: true,
          placeholder: "Cidade onde morava antes"
        },
        {
          id: "q23",
          question: "Curso:",
          type: "text",
          required: true,
          placeholder: "Ex: Ciência da Computação"
        },
        {
          id: "q24",
          question: "Matrícula:",
          type: "text",
          required: true,
          placeholder: "Ex: 2021001234"
        },
        {
          id: "q25",
          question: "Onde você estuda?",
          type: "radio",
          required: true,
          options: [
            { id: "ac_simoes", label: "Campus A.C. Simões (sede)" },
            { id: "ceca_sede", label: "CECA (sede)" },
            { id: "ceca_vicosa", label: "CECA (UE Viçosa)" },
            { id: "ara_sede", label: "Campus Arapiraca (sede)" },
            { id: "ara_palmeira", label: "Campus Arapiraca (UE Palmeira dos Índios)" },
            { id: "ara_penedo", label: "Campus Arapiraca (UE Penedo)" },
            { id: "sertao_sede", label: "Campus do Sertão (sede)" },
            { id: "sertao_santana", label: "Campus do Sertão (UE Santana do Ipanema)" }
          ]
        },
        {
          id: "q26",
          question: "Ano/semestre letivo de ingresso:",
          type: "text",
          required: true,
          placeholder: "Ex: 2024.1"
        },
        {
          id: "q27",
          question: "Período em que se encontra atualmente no curso:",
          type: "text",
          required: true,
          placeholder: "Ex: 3"
        },
        {
          id: "q28",
          question: "Turno matriculado:",
          type: "radio",
          required: true,
          options: [
            { id: "manha", label: "Manhã" },
            { id: "tarde", label: "Tarde" },
            { id: "noite", label: "Noite" },
            { id: "integral", label: "Integral" }
          ]
        },
        {
          id: "q29",
          question: "Forma de ingresso na Ufal:",
          type: "radio",
          required: true,
          options: [
            { id: "cotista", label: "Cotista" },
            { id: "ampla", label: "Ampla concorrência" },
            { id: "transf", label: "Transferência externa" }
          ]
        },
        {
          id: "q30",
          question: "Caso não tenha ingressado por nenhuma das modalidades da pergunta anterior, explique como se deu o ingresso na universidade:",
          type: "textarea",
          required: true,
          placeholder: "Explique sua forma de ingresso..."
        },
        {
          id: "q31",
          question: "Sexo (categoria biológica):",
          type: "radio",
          required: true,
          options: [
            { id: "masc", label: "Masculino" },
            { id: "fem", label: "Feminino" },
            { id: "inter", label: "Intersexo" },
            { id: "outro", label: "Outro" },
            { id: "pnr", label: "Prefiro não responder" }
          ]
        },
        {
          id: "q32",
          question: "Identidade de gênero (como cada pessoa se identifica):",
          type: "radio",
          required: true,
          options: [
            { id: "cis", label: "Cisgênero" },
            { id: "transgenero", label: "Transgênero" },
            { id: "transexual", label: "Transexual" },
            { id: "travesti", label: "Travesti" },
            { id: "intergenero", label: "Intergênero" },
            { id: "androgeno", label: "Andrógeno" },
            { id: "outro", label: "Outro" },
            { id: "pnr", label: "Prefiro não responder" }
          ]
        },
        {
          id: "q33",
          question: "Orientação Sexual:",
          type: "radio",
          required: true,
          options: [
            { id: "hetero", label: "Heterossexual" },
            { id: "homo", label: "Homossexual" },
            { id: "bi", label: "Bissexual" },
            { id: "pan", label: "Pansexual" },
            { id: "assex", label: "Assexuais" },
            { id: "outro", label: "Outro" },
            { id: "pnr", label: "Prefiro não responder" }
          ]
        },
        {
          id: "q34",
          question: "Estado Civil:",
          type: "radio",
          required: true,
          options: [
            { id: "solt", label: "Solteiro(a)" },
            { id: "casado", label: "Casado(a)" },
            { id: "divor", label: "Divorciado (a)" },
            { id: "viuvo", label: "Viúvo(a)" },
            { id: "uniao", label: "União Estável" }
          ]
        },
        {
          id: "q35",
          question: "Você é oriundo/a de uma entidade ou abrigo de acolhimento institucional e não foi adotado na idade de saída?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" }
          ]
        }
      ]
    },
    {
      id: "s3",
      title: "Caracterização do Núcleo Familiar",
      questions: [
        {
          id: "q37",
          question: "Escolaridade do pai:",
          type: "radio",
          required: true,
          options: [
            { id: "efc", label: "Ensino Fundamental completo" },
            { id: "efi", label: "Ensino Fundamental incompleto" },
            { id: "emc", label: "Ensino Médio completo" },
            { id: "emi", label: "Ensino Médio incompleto" },
            { id: "esc", label: "Ensino Superior completo" },
            { id: "esi", label: "Ensino Superior incompleto ou cursando" },
            { id: "na", label: "Não alfabetizado" },
            { id: "nsa", label: "Não se aplica" }
          ]
        },
        {
          id: "q38",
          question: "Escolaridade da mãe:",
          type: "radio",
          required: true,
          options: [
            { id: "efc", label: "Ensino Fundamental completo" },
            { id: "efi", label: "Ensino Fundamental incompleto" },
            { id: "emc", label: "Ensino Médio completo" },
            { id: "emi", label: "Ensino Médio incompleto" },
            { id: "esc", label: "Ensino Superior completo" },
            { id: "esi", label: "Ensino Superior incompleto ou cursando" },
            { id: "na", label: "Não alfabetizado" },
            { id: "nsa", label: "Não se aplica" }
          ]
        },
        {
          id: "q39",
          question: "Qual nível de escolaridade do mantenedor da família caso não seja o pai e/ou a mãe?",
          type: "radio",
          required: true,
          options: [
            { id: "efc", label: "Ensino Fundamental completo" },
            { id: "efi", label: "Ensino Fundamental incompleto" },
            { id: "emc", label: "Ensino Médio completo" },
            { id: "emi", label: "Ensino Médio incompleto" },
            { id: "esc", label: "Ensino Superior completo" },
            { id: "esi", label: "Ensino Superior incompleto ou cursando" },
            { id: "na", label: "Não alfabetizado" },
            { id: "nsa", label: "Não se aplica" }
          ]
        },
        {
          id: "q40",
          question: "Seus pais são separados?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" }
          ]
        },
        {
          id: "q41",
          question: "Reside com pai e/ou mãe?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" }
          ]
        },
        {
          id: "q42",
          question: "Em caso de não residir com pai e/ou mãe esclareça o motivo:",
          type: "textarea",
          required: true,
          placeholder: "Descreva o motivo..."
        },
        {
          id: "q43",
          question: "Em caso de não residir com pai e/ou mãe informe o endereço dele/s:",
          type: "textarea",
          required: true,
          placeholder: "Informe o endereço completo..."
        },
        {
          id: "q44",
          question: "Caso não resida com pai e/ou mãe, explique há quanto tempo e como se sustenta.",
          type: "textarea",
          required: true,
          placeholder: "Há quanto tempo e como se sustenta..."
        },
        {
          id: "q45",
          question: "Seu pai ou sua mãe está ausente da composição familiar?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" }
          ]
        },
        {
          id: "q46",
          question: "Em caso afirmativo, explique a ausência.",
          type: "textarea",
          required: true,
          placeholder: "Explique a situação de ausência..."
        },
        {
          id: "q47",
          question: "Telefone dos pais e/ou responsáveis, para o caso de emergência:",
          type: "text",
          required: true,
          placeholder: "(XX) XXXXX-XXXX"
        },
        {
          id: "q49",
          question: "Seu núcleo familiar de origem mora em:",
          type: "radio",
          required: true,
          options: [
            { id: "proprio", label: "Imóvel próprio" },
            { id: "alugado", label: "Imóvel alugado" },
            { id: "financiado", label: "Imóvel financiado" },
            { id: "cedido", label: "Imóvel cedido" },
            { id: "ocupado", label: "Imóvel ocupado" },
            { id: "rua", label: "Albergue ou em situação de rua" }
          ]
        },
        {
          id: "q50",
          question: "Caso o imóvel seja cedido, explique por quem foi:",
          type: "text",
          required: true,
          placeholder: "Ex: Parente, Amigo..."
        },
        {
          id: "q58",
          question: "Estudante ou membro da família nuclear é egresso do Sistema Prisional (em liberdade ou no regime semi-aberto)?",
          type: "radio",
          required: true,
          options: [
            { id: "nao", label: "Não" },
            { id: "sim", label: "Sim" }
          ]
        }
      ]
    },
    {
      id: "s4",
      title: "Análise Socioeconômica",
      alert: {
        type: "warning",
        title: "Atenção!",
        message: "As informações apresentadas neste campo/questionário devem estar em conformidade com os dados registrados no CadÚnico, que deve estar atualizado no momento do preenchimento. Caso sua situação familiar ou de renda tenha se alterado, procure a Secretaria de Assistência Social do seu município para atualização antes de concluir este questionário."
      },
      questions: [
        {
          id: "q1",
          question: "Número de Identificação Social - NIS do Candidato/a",
          type: "text",
          required: true,
          placeholder: "Digite seu NIS"
        },
        {
          id: "q2",
          question: "Número de Identificação Social - NIS do Responsável pela unidade familiar (núcleo familiar de origem)",
          type: "text",
          required: true,
          placeholder: "Digite o NIS do responsável"
        },
        {
          id: "q3",
          question: "Número Código do grupo familiar no comprovante de Cadastro do CadÚnico do candidato/a",
          type: "text",
          required: true,
          placeholder: "Digite o código do grupo familiar"
        },
        {
          id: "q4",
          question: "Número do Código do Grupo familiar no comprovante de Cadastro do CadÚnico do responsável pela unidade familiar (núcleo familiar de origem)",
          type: "text",
          required: true,
          placeholder: "Digite o código do grupo familiar do responsável"
        },
        {
          id: "q51",
          question: "Caso não haja fornecimento de energia ou não haja cobrança da conta de energia, explique a situação:",
          type: "textarea",
          required: true,
          placeholder: "Explique a situação..."
        },
        {
          id: "q52",
          question: "Existe transporte público (municipal e/ou intermunicipal) na localidade onde mora?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" }
          ]
        },
        {
          id: "q53",
          question: "Qual/quais o/s meio/s de transporte/s utilizado/s para o deslocamento até a UFAL?",
          type: "checkbox",
          required: true,
          options: [
            { id: "urb", label: "Transporte urbano municipal (ônibus, mototáxi)" },
            { id: "inter_cust", label: "Transporte intermunicipal integralmente custeado pelo estudante" },
            { id: "inter_pref_sem", label: "Transporte intermunicipal cedido pela prefeitura sem contrapartida financeira do estudante" },
            { id: "inter_pref_com", label: "Transporte intermunicipal cedido pela prefeitura com contrapartida financeira do estudante" },
            { id: "veiculo", label: "Veículo motorizado próprio" },
            { id: "carona_com", label: "De carona compartilhando despesas" },
            { id: "carona_sem", label: "De carona sem contribuição" },
            { id: "bike", label: "De bicicleta" },
            { id: "ape", label: "A pé" },
            { id: "outro", label: "Outro meio" }
          ]
        },
        {
          id: "q55",
          question: "Qual o tempo gasto para chegar à Ufal?",
          type: "radio",
          required: true,
          options: [
            { id: "30m", label: "Até 30 minutos" },
            { id: "30m_1h", label: "Entre 30 minutos e 1 hora" },
            { id: "1h", label: "Acima de 1 hora" }
          ]
        },
        {
          id: "q56",
          question: "Qual(is) desse(s) equipamento(s) para acesso às atividades remotas você possui?",
          type: "checkbox",
          required: true,
          options: [
            { id: "desk", label: "Computador desktop (computador de mesa)" },
            { id: "note", label: "Notebook" },
            { id: "tablet", label: "Tablet" },
            { id: "smart", label: "Smartphone" },
            { id: "nenhum", label: "Não possuo" }
          ]
        },
        {
          id: "q57",
          question: "Qual(is) o(s) tipo(s) de conexão de internet disponível(is) na sua residência?",
          type: "checkbox",
          required: true,
          options: [
            { id: "cabo", label: "Internet cabeada" },
            { id: "radio", label: "Internet a rádio" },
            { id: "3g4g", label: "3G ou 4G" },
            { id: "vizinho", label: "Uso internet do/a vizinho/a" },
            { id: "nenhum", label: "Não tenho internet em casa" }
          ]
        },
        {
          id: "q59",
          question: "Estudante está em situação de refúgio no Brasil?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" }
          ]
        },
        {
          id: "q60",
          question: "Por motivo da graduação reside em moradia diversa da casa do seu núcleo familiar de origem?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" }
          ]
        },
        {
          id: "q61",
          question: "Caso sim, reside em:",
          type: "radio",
          required: true,
          options: [
            { id: "proprio", label: "Imóvel próprio" },
            { id: "alugado", label: "Imóvel alugado" },
            { id: "financiado", label: "Imóvel financiado" },
            { id: "cedido", label: "Imóvel cedido" },
            { id: "ocupado", label: "Imóvel ocupado" },
            { id: "pensionato", label: "Pensionato ou hospedaria" },
            { id: "rua", label: "Albergue ou em situação de rua" },
            { id: "rua_ufal", label: "Residência Universitária Alagoana (RUA/Ufal)" },
            { id: "nsa", label: "Não se aplica" }
          ]
        },
        {
          id: "q62",
          question: "Divide essa moradia?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" },
            { id: "na", label: "Não se aplica" }
          ]
        },
        {
          id: "q63",
          question: "Caso divida a moradia, com quem divide?",
          type: "text",
          required: true,
          placeholder: "Ex: Colegas de quarto, família..."
        },
        {
          id: "q64",
          question: "Caso divida a moradia, há divisão das despesas?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" },
            { id: "na", label: "Não se aplica" }
          ]
        }
      ]
    },
    {
      id: "s5",
      title: "Saúde do Estudante e do Núcleo Familiar",
      questions: [
        {
          id: "q48",
          question: "Está gestante?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" },
            { id: "na", label: "Não se aplica" }
          ]
        },
        {
          id: "q65",
          question: "Quando necessita de cuidados de saúde, você utiliza:",
          type: "radio",
          required: true,
          options: [
            { id: "sus", label: "O Sistema Único de Saúde - SUS" },
            { id: "plano", label: "Plano de Saúde" },
            { id: "particular", label: "Serviços particulares" }
          ]
        },
        {
          id: "q66",
          question: "Qual a despesa mensal com plano de saúde e/ou serviços particulares (na residência de seu núcleo familiar de origem)?",
          type: "text",
          required: true,
          placeholder: "R$ 0,00"
        },
        {
          id: "q67",
          question: "Caso você ou alguém do seu núcleo familiar faça uso de medicamento de uso contínuo, qual a despesa mensal?",
          type: "text",
          required: true,
          placeholder: "R$ 0,00"
        },
        {
          id: "q68",
          question: "Você ou alguém do seu núcleo familiar possui problema de saúde que requeira acompanhamento ambulatorial periódico?",
          type: "radio",
          required: true,
          options: [
            { id: "sim", label: "Sim" },
            { id: "nao", label: "Não" }
          ]
        },
        {
          id: "q69",
          question: "Caso a resposta anterior tenha sido afirmativa. (Explique):",
          type: "textarea",
          required: true,
          placeholder: "Explique a situação"
        },
        {
          id: "q70",
          question: "Você passa ou já passou por alguma situação descrita abaixo?",
          type: "checkbox",
          required: true,
          options: [
            { id: "fisica", label: "Violência física" },
            { id: "sexual", label: "Violência sexual" },
            { id: "psico", label: "Violência psicológica" },
            { id: "patri", label: "Violência patrimonial" },
            { id: "assedio", label: "Assédio moral" },
            { id: "disc", label: "Discriminações" },
            { id: "prec", label: "Preconceitos" },
            { id: "pnr", label: "Prefiro não responder" },
            { id: "nao", label: "Não, nenhuma das situações" }
          ]
        },
        {
          id: "q71",
          question: "Caso se sinta confortável, comente sobre a situação:",
          type: "textarea",
          required: false,
          placeholder: "Comente se desejar..."
        }
      ]
    },
    {
      id: "s6",
      title: "Relato Final",
      questions: [
        {
          id: "q72",
          question: "Relate sobre sua dinâmica familiar:",
          type: "textarea",
          required: false,
          rows: 10,
          description: "a) renda; b) necessidades acadêmicas; c) condições de moradia; d) condições de saúde e/ou outras informações que possuem impacto no seu desempenho acadêmico e permanência na UFAL.\n\nDinâmica familiar (composição, fragilidades de vínculos afetivos, etc.), renda (situação laborativa do/a estudante e membros familiares, despesas familiares, etc.), necessidades acadêmicas (alimentação, moradia, transportes, etc.), condições de moradia (acessibilidade da residência, deslocamento à universidade, etc.) e condições de saúde (doenças crônicas e/ou deficiências etc.).",
          placeholder: "Descreva sua dinâmica familiar, renda, moradia, saúde..."
        },
        {
          id: "q_esclarecimentos",
          question: "Esclarecimentos dos documentos apresentados por você.",
          type: "textarea",
          required: true,
          rows: 5,
          placeholder: "Use este espaço para explicar qualquer documento enviado."
        }
      ]
    },
    {
      id: "s7",
      title: "Documentos Finais",
      questions: [
        {
          id: "q73",
          question: "Anexe aqui o arquivo único em PDF com a documentação obrigatória. Tamanho máximo 10MB.",
          type: "file",
          required: true,
          accept: "application/pdf",
          maxSize: 10485760
        },
        {
          id: "q74",
          question: "Declaração:",
          type: "checkbox-single",
          required: true,
          options: [
            {
              id: "declaracao",
              label: "Ratifico serem verdadeiras as informações prestadas, estando ciente de que a informação falsa incorrerá nas penas do crime do art. 299 do Código Penal (falsidade ideológica), além de, caso configurada a prestação de informação falsa, apurada posteriormente à adesão a quaisquer dos programas da Assistência Estudantil, em procedimento que assegure o contraditório e a ampla defesa, ensejará o desligamento, sem prejuízo das sanções penais cabíveis."
            }
          ]
        }
      ]
    }
  ]
};

export default formData;