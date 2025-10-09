import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from 'react';

const eligibilityCriteria = [
  { id: 'rede-publica', label: 'Egresso da rede pública de educação básica' },
  { id: 'bolsista-integral', label: 'Egresso da rede privada na condição de bolsista integral na educação básica' },
  { id: 'vagas-reservadas', label: 'Matriculado nas vagas reservadas de que trata a lei no 12.711, de 29 de Agosto de 2012' },
  { id: 'abrigo', label: 'Estudante oriundo de entidade ou de abrigo de acolhimento institucional não adotado em idade de saída' },
  { id: 'vulnerabilidade', label: 'Integrante de grupo familiar em situação de vunerabilidade socioeconômica, observado o limite de renda bruta familiar mensal per capita de até 1 (um) salário mínimo' },
  { id: 'quilombola', label: 'Ser estudante quilombola, indígena ou de comunidades tradicionais' },
];

export function CriteriosContent() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const isAnyCriterionSelected = useMemo(() => {
    return Object.values(checkedState).some(isChecked => isChecked);
  }, [checkedState]);

  return (
    <>
      <h3 className="mb-8 text-2xl font-bold text-gray-800">
        Critérios de Elegibilidade
      </h3>

      <div className="space-y-3">
        {eligibilityCriteria.map((criterion) => (
          <Label
            key={criterion.id}
            htmlFor={criterion.id}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-50"
          >
            <span className="pr-4 text-sm font-medium text-gray-700">{criterion.label}</span>
            <Checkbox
              id={criterion.id}
              checked={!!checkedState[criterion.id]}
              onCheckedChange={(checked) => handleCheckboxChange(criterion.id, !!checked)}
            />
          </Label>
        ))}
      </div>
      {!isAnyCriterionSelected && (
        <p className="mt-4 text-center text-sm font-medium text-red-600">
          Estudante não atende a nenhum critério de elegibilidade
        </p>
      )}
    </>
  );
}