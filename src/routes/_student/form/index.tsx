import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { GalleryVerticalEnd } from "lucide-react";
import { useState, type ChangeEvent, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import formData, { type FormQuestion, type FormOption } from "./-data";
import { formSchema, getInitialValues, type FormValues } from "./-schema";

export const Route = createFileRoute("/_student/form/")({
  component: Form,
});

interface RenderProps {
  question: FormQuestion;
  value: any;
  error?: string;
}

interface TextRenderProps extends RenderProps {
  onChange: (value: string) => void;
}

interface CheckboxRenderProps extends RenderProps {
  onCheckedChange: (optionId: string, checked: boolean) => void;
}

interface CheckboxSingleRenderProps extends RenderProps {
  onCheckedChange: (checked: boolean) => void;
}

interface FileRenderProps extends RenderProps {
  onFileChange: (file: File | null) => void;
}

function renderTextInput({ question, value, error, onChange }: TextRenderProps) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label htmlFor={question.id} className="text-sm" isRequired={question.required}>
        {question.question}
      </Label>
      {question.description && (
        <p className="text-xs text-gray-500">{question.description}</p>
      )}
      <Input
        id={question.id}
        type={question.type === "email" ? "email" : "text"}
        placeholder={question.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="!text-xs placeholder:text-xs max-w-2xl"
        
        aria-invalid={!!error}
        aria-describedby={error || undefined}
      />
      
      {error && <p id={error} className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function renderTextarea({ question, value, error, onChange }: TextRenderProps) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label htmlFor={question.id} className="text-sm" isRequired={question.required}>
        {question.question}
      </Label>
      {question.description && (
        <p className="text-xs text-gray-500 whitespace-pre-line">{question.description}</p>
      )}
      <Textarea
        id={question.id}
        placeholder={question.placeholder}
        rows={question.rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="!text-xs placeholder:text-xs"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function renderRadio({ question, value, error, onChange }: TextRenderProps) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label className="text-sm mb-3" isRequired={question.required}>
        {question.question}
      </Label>
      {question.description && (
        <p className="text-xs text-gray-500 mb-2">{question.description}</p>
      )}
      <RadioGroup value={value} onValueChange={onChange}>
        {question.options?.map((option: FormOption) => (
          <div className="flex items-center gap-3" key={option.id}>
            <RadioGroupItem value={option.id} id={`${question.id}_${option.id}`} />
            <Label htmlFor={`${question.id}_${option.id}`} className="text-xs font-[400]">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function renderCheckbox({ question, value, error, onCheckedChange }: CheckboxRenderProps) {
  const valueSet = new Set(value || []);
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label className="text-sm mb-3" isRequired={question.required}>
        {question.question}
      </Label>
      {question.description && (
        <p className="text-xs text-gray-500 mb-2">{question.description}</p>
      )}
      <div className="flex flex-col gap-2">
        {question.options?.map((option: FormOption) => (
          <div className="flex items-center gap-3" key={option.id}>
            <Checkbox
              id={`${question.id}_${option.id}`}
              checked={valueSet.has(option.id)}
              onCheckedChange={(checked) => onCheckedChange(option.id, !!checked)}
            />
            <Label htmlFor={`${question.id}_${option.id}`} className="text-xs font-[400]">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function renderCheckboxSingle({ question, value, error, onCheckedChange }: CheckboxSingleRenderProps) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label className="text-sm" isRequired={question.required}>
        {question.question}
      </Label>
      {question.options && (
        <div className="flex items-center gap-3 p-4 border rounded-md">
          <Checkbox
            id={`${question.id}_${question.options[0].id}`}
            checked={value}
            onCheckedChange={(checked) => onCheckedChange(!!checked)}
          />
          <Label
            htmlFor={`${question.id}_${question.options[0].id}`}
            className="text-xs font-[400] text-gray-600"
          >
            {question.options[0].label}
          </Label>
        </div>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function renderFileInput({ question, error, onFileChange }: FileRenderProps) {
  
  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    
    onFileChange(file); 
  };
  
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label className="text-sm" isRequired={question.required}>
        {question.question}
      </Label>
      <div className="grid w-full max-w-xs items-center gap-3">
        <Label htmlFor={question.id} className="text-xs font-medium">Selecionar Arquivo PDF</Label>
        <Input 
          id={question.id} 
          type="file" 
          className="!text-xs file:text-xs w-52" 
          onChange={handleFileSelection}
          accept={question.accept || "application/pdf"}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Form() {
  const [activeTab, setActiveTab] = useState(formData.sections[0].id);
  const [formValues, setFormValues] = useState<FormValues>(getInitialValues());
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleTextChange = (id: string, value: string) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const handleCheckboxChange = (questionId: string, optionId: string, checked: boolean) => {
    setFormValues(prev => {
      const currentValues = prev[questionId as keyof FormValues] as string[] || [];
      const newValues = checked
        ? [...currentValues, optionId]
        : currentValues.filter(val => val !== optionId);
      return { ...prev, [questionId]: newValues };
    });
    if (formErrors[questionId]) {
      setFormErrors(prev => ({ ...prev, [questionId]: "" }));
    }
  };

  const handleCheckboxSingleChange = (id: string, checked: boolean) => {
    setFormValues(prev => ({ ...prev, [id]: checked }));
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const handleFileChange = (id: string, file: File | null) => {
    setFormValues(prev => ({ ...prev, [id]: file }));
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  // Função para verificar se uma pergunta foi respondida
  const isQuestionAnswered = (question: FormQuestion): boolean => {
    const value = formValues[question.id as keyof FormValues];
    
    // Se a pergunta não é obrigatória, sempre considera como respondida
    if (!question.required) return true;
    
    switch (question.type) {
      case "text":
      case "email":
      case "textarea":
        return typeof value === "string" && value.trim().length > 0;
      case "radio":
        return typeof value === "string" && value.length > 0;
      case "checkbox":
        return Array.isArray(value) && value.length > 0;
      case "checkbox-single":
        return value === true;
      case "file":
        return value instanceof File;
      default:
        return false;
    }
  };

  // Calcular progresso de cada seção
  const sectionProgress = useMemo(() => {
    return formData.sections.map(section => {
      const requiredQuestions = section.questions.filter(q => q.required);
      const totalRequired = requiredQuestions.length;
      const answeredRequired = requiredQuestions.filter(q => isQuestionAnswered(q)).length;
      
      return {
        sectionId: section.id,
        answered: answeredRequired,
        total: totalRequired,
        percentage: totalRequired > 0 ? Math.round((answeredRequired / totalRequired) * 100) : 100
      };
    });
  }, [formValues]);

  function renderQuestion(question: FormQuestion) {
    const value = formValues[question.id as keyof FormValues];
    const error = formErrors[question.id];

    switch (question.type) {
      case "text":
      case "email":
        return renderTextInput({ question, value, error, onChange: (val) => handleTextChange(question.id, val) });
      case "textarea":
        return renderTextarea({ question, value, error, onChange: (val) => handleTextChange(question.id, val) });
      case "radio":
        return renderRadio({ question, value, error, onChange: (val) => handleTextChange(question.id, val) });
      case "checkbox":
        return renderCheckbox({ question, value, error, onCheckedChange: (optId, checked) => handleCheckboxChange(question.id, optId, checked) });
      case "checkbox-single":
        return renderCheckboxSingle({ question, value, error, onCheckedChange: (checked) => handleCheckboxSingleChange(question.id, checked) });
      case "file":
        return renderFileInput({ question, value, error, onFileChange: (file) => handleFileChange(question.id, file) });
      default:
        return null;
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});

    const validationResult = formSchema.safeParse(formValues);

    if (validationResult.success) {
      alert("Formulário Válido! Enviando JSON:\n" + JSON.stringify(validationResult.data, null, 2));
      console.log(JSON.stringify(validationResult.data, null, 2));
      return;
    }

    const errors = validationResult.error.flatten().fieldErrors;
    const formattedErrors: Record<string, string> = {};
    let firstErrorKey: string | null = null;

    for (const key in errors) {
      if (errors[key]) {
        formattedErrors[key] = errors[key]![0];
        if (!firstErrorKey) {
          firstErrorKey = key;
        }
      }
    }
    
    setFormErrors(formattedErrors);

    if (firstErrorKey) {
      const errorSection = formData.sections.find(s => 
        s.questions.some(q => q.id === firstErrorKey)
      );
      if (errorSection) {
        setActiveTab(errorSection.id);
      }
    }
  };


  return (
    <div className="flex h-dvh">
      {/* SIDEBAR */}
      <div className="flex flex-col w-64 border-r">
        <div className="flex items-center gap-2 p-4">
          <div className="bg-primary rounded-lg p-2">
            <GalleryVerticalEnd className="text-secondary size-4" />
          </div>
          <p className="text-xs font-semibold">
            Cadastramento
            <br />
            Socioeconômico - 2025.1
          </p>
        </div>

        <div className="flex flex-col gap-2 pr-2">
          {formData.sections.map((section, idx) => {
            const progress = sectionProgress.find(p => p.sectionId === section.id);
            const isComplete = progress?.percentage === 100;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex flex-col gap-2 p-2 pl-3 min-h-12 border rounded-tr-md rounded-br-md transition 
                  ${
                    activeTab === section.id
                      ? "bg-blue-100"
                      : "bg-card hover:bg-slate-100"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs text-left max-w-40">{section.title}</p>
                  <div className={`flex items-center justify-center size-6 rounded-full ${
                    isComplete ? "bg-green-500 text-white" : "bg-slate-300"
                  }`}>
                    <p className="text-xs font-bold">{idx + 1}</p>
                  </div>
                </div>
                
                {/* Barra de progresso */}
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isComplete ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${progress?.percentage || 0}%` }}
                  />
                </div>
                
                {/* Texto do progresso */}
                <p className="text-[10px] text-gray-500 text-left">
                  {progress?.answered}/{progress?.total} respondidas
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* TABS */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {formData.sections.map((section, sectionIdx) => (
            <TabsContent value={section.id} className="mb-6" key={section.id}>
              {/* Title */}
              <div className="p-4 border-b">
                <p className="text-md font-medium">{section.title}</p>
              </div>

              {/* Description */}
              {section.description && (
                <div className="p-4">
                  <p className="text-xs font-[400] text-gray-500">
                    {section.description}
                  </p>
                </div>
              )}
            
              {/* Form Content */}
              <div className="grid grid-cols-2 px-8 py-4 gap-8">
                {/* Alert */}
                {section.alert && (
                  <div className={`col-span-2 ${
                    section.alert.type === 'warning' 
                    ? 'bg-red-50 border-red-200'
                    : 'bg-blue-50 border-blue-200'
                  } border p-3 rounded-md`}>
                    <p className={`text-sm font-medium ${
                      section.alert.type === 'warning' 
                        ? 'text-red-800' 
                        : 'text-blue-800'
                    }`}>
                      {section.alert.title}
                    </p>
                    <p className={`text-xs ${
                      section.alert.type === 'warning' 
                        ? 'text-red-700' 
                        : 'text-blue-700'
                    }`}>
                      {section.alert.message}
                    </p>
                  </div>
                )}

                {/* Questions */}
                {section.questions.map((question) => renderQuestion(question))}

                {/* Botão de Envio */}
                {sectionIdx === formData.sections.length - 1 && (
                  <div className="col-span-2 flex justify-end pt-8">
                    <Button type="submit">
                      Enviar Cadastro
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </form>
    </div>
  );
}