import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputFile } from "@/components/ui/input-file";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import formData from "./-data";

export const Route = createFileRoute("/_student/form/")({
  component: Form,
});

function renderTextInput(question: any) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label htmlFor={question.id} className="text-sm" isRequired={question.required}>
        {question.number ? `${question.number}. ` : ''}{question.question}
      </Label>
      {question.description && (
        <p className="text-xs text-gray-500">{question.description}</p>
      )}
      <Input 
        id={question.id} 
        type={question.type === "email" ? "email" : "text"}
        placeholder={question.placeholder}
        className="!text-xs placeholder:text-xs"
      />
    </div>
  );
}

function renderTextarea(question: any) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label htmlFor={question.id} className="text-sm" isRequired={question.required}>
        {question.number ? `${question.number}. ` : ''}{question.question}
      </Label>
      {question.description && (
        <p className="text-xs text-gray-500 whitespace-pre-line">{question.description}</p>
      )}
      <Textarea 
        id={question.id}
        placeholder={question.placeholder}
        rows={question.rows}
        className="!text-xs placeholder:text-xs"
      />
    </div>
  );
}

function renderRadio(question: any) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label className="text-sm mb-3" isRequired={question.required}>
        {question.number ? `${question.number}. ` : ''}{question.question}
      </Label>
      {question.description && (
        <p className="text-xs text-gray-500 mb-2">{question.description}</p>
      )}
      <RadioGroup>
        {question.options.map((option: any) => (
          <div className="flex items-center gap-3" key={option.id}>
            <RadioGroupItem value={option.id} id={`${question.id}_${option.id}`} />
            <Label htmlFor={`${question.id}_${option.id}`} className="text-xs font-[400]">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function renderCheckbox(question: any) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label className="text-sm mb-3" isRequired={question.required}>
        {question.number ? `${question.number}. ` : ''}{question.question}
      </Label>
      {question.description && (
        <p className="text-xs text-gray-500 mb-2">{question.description}</p>
      )}
      <div className="flex flex-col gap-2">
        {question.options.map((option: any) => (
          <div className="flex items-center gap-3" key={option.id}>
            <Checkbox id={`${question.id}_${option.id}`} />
            <Label htmlFor={`${question.id}_${option.id}`} className="text-xs font-[400]">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderCheckboxSingle(question: any) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label className="text-sm" isRequired={question.required}>
        {question.number ? `${question.number}. ` : ''}{question.question}
      </Label>
      <div className="flex items-center gap-3 p-4 border rounded-md">
        <Checkbox id={`${question.id}_${question.options[0].id}`} />
        <Label 
          htmlFor={`${question.id}_${question.options[0].id}`} 
          className="text-xs font-[400] text-gray-600"
        >
          {question.options[0].label}
        </Label>
      </div>
    </div>
  );
}

function renderFileInput(question: any) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Label className="text-sm" isRequired={question.required}>
        {question.number ? `${question.number}. ` : ''}{question.question}
      </Label>
      <InputFile title="Selecionar Arquivo PDF" />
    </div>
  );
}

function renderQuestion(question: any) {
  switch (question.type) {
    case "text":
    case "email":
      return renderTextInput(question);
    case "textarea":
      return renderTextarea(question);
    case "radio":
      return renderRadio(question);
    case "checkbox":
      return renderCheckbox(question);
    case "checkbox-single":
      return renderCheckboxSingle(question);
    case "file":
      return renderFileInput(question);
    default:
      return null;
  }
}

export function Form() {
  const [activeTab, setActiveTab] = useState(formData.sections[0].id);

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
          {formData.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center gap-2 p-2 pl-3 min-h-12 border justify-between rounded-tr-md rounded-br-md shadow-sm transition 
                ${
                  activeTab === section.id
                    ? "bg-blue-100"
                    : "bg-card hover:bg-slate-100"
                }`}
            >
              <p className="text-xs text-left max-w-48">{section.title}</p>
              <div className="flex items-center justify-center size-6 rounded-full bg-slate-300">
                <p className="text-xs font-bold">{idx + 1}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CONTEÚDO DAS TABS */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {formData.sections.map((section) => (
            <TabsContent value={section.id} className="mb-6" key={section.id}>
              {/* Title */}
              <div className="p-4 border-b">
                <p className="text-md font-medium">{section.title}</p>
              </div>
              
              {/* Form Content */}
              <div className="flex flex-col px-8 py-4 gap-8">
                {/* Description */}
                {section.description && (
                  <div>
                    <p className="text-xs font-[400] text-gray-500">
                      {section.description}
                    </p>
                  </div>
                )}

                {/* Alert */}
                {section.alert && (
                  <div className={`${
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
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}