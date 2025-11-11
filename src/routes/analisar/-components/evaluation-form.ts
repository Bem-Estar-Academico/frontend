export const evaluationForm =  [
    {
        key: 'criteria1',
        question: 'A inscrição atende aos requisitos básicos',
        options: [
            {
                key: 'yes',
                label: 'Sim',
                value: 1,
            },
            {
                key: 'no',
                label: 'Não',
                value: 2,
            }
        ],
    },  
    {
        key: 'criteria2',
        question: 'Cursando a primeira graduação',
        options: [
            {
                key: 'yes',
                label: 'Sim',
            },
            {
                key: 'no',
                label: 'Não',
            }
        ],
    }, 
    {
        key: 'criteria3',
        question: 'Ensino médio',
        options: [
            {
                key: '1',
                label: 'Escola privada com bolsa integral',
            },
            {
                key: '2',
                label: 'Escola pública e privada com bolsa integral',
            },
            {
                key: '3',
                label: 'Estudou apenas em escola pública',
            }
        ],
    },
    {
        key: 'criteria4',
        question: 'Forma de ingresso',
        options: [
            {
                key: '1',
                label: 'Cotista',
            },
            {
                key: '2',
                label: 'Ampla concorrência/Transferência externa',
            },
        ],
    },
    {
        key: 'criteria5',
        question: 'Tempo de deslocamento até a UFAL',
        options: [
            {
                key: '1',
                label: 'Menos de 30 minutos',
            },
            {
                key: '2',
                label: 'Entre 30 minutos e 1 hora',
            },
            {
                key: '3',
                label: 'Mais de 1 hora',
            },
        ],
    },
    {
        key: 'criteria9',
        question: 'Conexão de internet em casa',
        options: [
            {
                key: '1',
                label: 'Não possui internet em casa',
            },
            {
                key: '2',
                label: 'Usa internet compartilhada',
            },
            {
                key: '3',
                label: 'Possui internet em casa',
            },
        ],
    },
    {
        key: 'criteria6',
        question: 'Gestante',
        options: [
            {
                key: '1',
                label: 'Não',
            },
            {
                key: '2',
                label: 'Sim',
            },
        ],
    },
    {
        key: 'criteria7',
        question: 'Uso de medicamento contínuo',
        options: [
            {
                key: '1',
                label: 'Sim',
            },
            {
                key: '2',
                label: 'Não',
            },
        ],
    },
    {
        key: 'criteria8',
        question: 'Reside em moradia adversa',
        options: [
            {
                key: '1',
                label: 'Sim, em albergue ou em situação de rua',
            },
            {
                key: '2',
                label: 'Sim, em imóvel alugado/pensionato ou hospedaria',
            },
            {
                key: '3',
                label: 'Sim, em imóvel cedido/ocupado',
            },
            {
                key: '4',
                label: 'Não ou em imóvel próprio/financiado pela UFAL',
            },
        ],
    }
] as const