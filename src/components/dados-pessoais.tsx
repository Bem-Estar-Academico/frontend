import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller, type Control } from "react-hook-form";

export const testDadosPessoais = [{ id: "test", label: "Apenas um test" }];

interface DadosPessoaisContentProps {
  control: Control<any>;
  name: string;
}

export function DadosPessoaisContent({
  control,
  name,
}: Readonly<DadosPessoaisContentProps>) {
  return (
    <>
      <h3 className="mb-8 text-2xl font-bold text-gray-800">Dados Pessoais (Teste)</h3>

      <div className="space-y-3">
        {testDadosPessoais.map((item) => (
          <Controller
            key={item.id}
            name={`${name}.${item.id}`} 
            control={control}
            render={({ field }) => (
              <Label
                htmlFor={item.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-50"
              >
                <span className="pr-4 text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <Checkbox
                  id={item.id}
                  checked={!!field.value}
                  onCheckedChange={field.onChange} 
                />
              </Label>
            )}
          />
        ))}
      </div>
    </>
  );
}