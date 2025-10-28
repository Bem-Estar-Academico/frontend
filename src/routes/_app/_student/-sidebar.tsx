import { GalleryVerticalEnd } from "lucide-react";
import formData, { type FormQuestion } from "./-data";
import { useWatch } from "react-hook-form";
import { useCallback, useMemo } from "react";
import type { FormValues } from "./-schema";

export function CreateStudentRegistrationFormSidebar({form, changeTab, activeTab}: {activeTab: string, form: any, changeTab: (tab: string) => void}) {

    const formValues = useWatch({ control: form.control });
    const isQuestionAnswered = useCallback((question: FormQuestion): boolean => {
    const value = form.getValues(question.id as keyof FormValues);

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
    }, [form]);

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
    }, [formValues, isQuestionAnswered]);
    return (
       <div className="flex flex-col h-full w-64 border-r">
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
                    onClick={() => changeTab(section.id)}
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
                    
                    
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            isComplete ? "bg-green-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${progress?.percentage || 0}%` }}
                        />
                    </div>
                    
                    
                    <p className="text-[10px] text-gray-500 text-left">
                        {progress?.answered}/{progress?.total} respondidas
                    </p>
                    </button>
                );
                })}
            </div>
            </div> 
    )
}