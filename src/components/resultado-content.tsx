// Um componente auxiliar para criar os inputs de seleção (dropdowns)
const SelectInput = ({
  label,
  options,
}: {
  label: string;
  options: string[];
}) => (
  <div>
    <label
      htmlFor={label}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={label}
      name={label}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Componente principal do conteúdo do resultado
export function ResultadoContent() {
  const auxilios = [
    "Bolsa Pró-Graduando",
    "Auxílio Alimentação",
    "Auxílio Moradia",
    "Auxílio Creche",
  ];

  return (
    <div className="grid grid-col-2 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Cadastramento Socioeconômico
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Coluna da Esquerda */}
        <div className="space-y-6 md:col-span-2">
          <div className="flex items-baseline space-x-8">
            {/* IVS */}
            <div>
              <p className="text-sm font-medium text-gray-500">IVS</p>
              <p className="text-2xl font-bold text-gray-800">150,7</p>
            </div>

            {/* Resultado */}
            <div className="w-48">
              <SelectInput
                label="Resultado"
                options={["Deferido", "Indeferido", "Em análise"]}
              />
            </div>
          </div>

          {/* Seção de Auxílios */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Auxílios</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {auxilios.map((auxilio) => (
                <SelectInput
                  key={auxilio}
                  label={auxilio}
                  options={["Selecione uma opção", "Concedido", "Não Concedido"]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="space-y-2">
          <label
            htmlFor="observacoes"
            className="block text-sm font-medium text-gray-700"
          >
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            rows={10}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Escreva aqui..."
          />
          <p className="text-xs text-gray-500">
            Use este campo para realizar anotações adicionais necessárias para o
            processo de avaliação da inscrição.
          </p>
        </div>
      </div>
    </div>
  );
}