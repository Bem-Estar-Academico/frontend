import { type UseFormRegister, type FieldValues, type Path } from "react-hook-form";

const SelectInput = <T extends FieldValues>({
  label,
  options,
  name,
  register,
  placeholder,
}: {
  label: string;
  options: string[];
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
}) => (
  <div className="grid grid-cols-2">
    <label
      htmlFor={name}
      className="content-center block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={name}
      {...register(name)}
      defaultValue=""
      className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

interface ResultadoContentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
}

export function ResultadoContent<T extends FieldValues>({
  register,
}: Readonly<ResultadoContentProps<T>>) {
  const auxilios = [
    "Bolsa Pró-Graduando",
    "Auxílio Alimentação",
    "Auxílio Moradia",
    "Auxílio Creche",
  ];

  return (
    <div className="grid grid-col-2 space-y-6 p-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Cadastramento Socioeconômico
      </h2>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-baseline gap-4">
          <div className="flex flex-col items-baseline gap-4">
            <div>
              <h3 className="font-semibold text-gray-500">IVS</h3>
              <p className="text-2xl font-bold text-gray-800">150,7</p>
            </div>
            <div>
              <SelectInput
                label="Resultado"
                // 4. Usamos 'as Path<T>' para garantir a tipagem dos nomes
                name={"resultado.statusGeral" as Path<T>}
                register={register}
                options={[
                  "Deferido",
                  "Indeferido com recurso",
                  "Indeferido",
                  "Em análise",
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Auxílios</h3>
            <div className="flex flex-col gap-8">
              {auxilios.map((auxilio) => (
                <SelectInput
                  key={auxilio}
                  label={auxilio}
                  name={`resultado.auxilios.${auxilio}` as Path<T>}
                  register={register}
                  placeholder="Selecione uma opção"
                  options={["Deferido", "Indeferido com recurso", "Indeferido"]}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="observacoes"
            className="block text-sm font-medium text-gray-700"
          >
            Observações
          </label>
          <textarea
            id="observacoes"
            {...register("resultado.observacoes" as Path<T>)}
            rows={20}
            className="p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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