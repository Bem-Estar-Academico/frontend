import { type FormQuestion } from "./_student/-data";
import { type FormValues } from "./_student/-schema";

interface SectionContentProps {
  section: {
    id: string;
    title: string;
    description?: string;
    questions: FormQuestion[];
  };
  data: FormValues;
}

export function SectionContent({ section, data }: SectionContentProps) {
  const renderValue = (question: FormQuestion, value: any) => {
    if (!value && value !== false && value !== 0) {
      return <span className="text-gray-400 text-sm">Não informado</span>;
    }

    switch (question.type) {
      case "text":
      case "email":
      case "textarea":
        return <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">{value}</div>;

      case "radio":
        const selectedOption = question.options?.find(opt => opt.id === value);
        return <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">{selectedOption?.label || value}</div>;

      case "checkbox":
        const selectedOptions = question.options?.filter(opt => value?.includes(opt.id));
        return (
          <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">
            {selectedOptions && selectedOptions.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedOptions.map(opt => (
                  <li key={opt.id}>{opt.label}</li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-400">Nenhuma opção selecionada</span>
            )}
          </div>
        );

      case "checkbox-single":
        return (
          <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">
            {value ? (
              <span className="text-green-600">✓ {question.options?.[0]?.label}</span>
            ) : (
              <span className="text-gray-400">Não marcado</span>
            )}
          </div>
        );

      case "file":
        return (
          <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">
            {value ? (
              <div className="flex items-center gap-2">
                <span>📎 {typeof value === 'string' ? value : value.name}</span>
                <button className="text-blue-600 hover:underline text-xs">Visualizar</button>
              </div>
            ) : (
              <span className="text-gray-400">Nenhum arquivo enviado</span>
            )}
          </div>
        );

      default:
        return <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">{String(value)}</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
        {section.description && (
          <p className="text-sm text-gray-500">{section.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {section.questions.map((question) => (
          <div 
            key={question.id} 
            className={question.type === 'textarea' ? 'col-span-2' : ''}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {question.question}
            </label>
            {renderValue(question, data[question.id as keyof FormValues])}
          </div>
        ))}
      </div>
    </div>
  );
}