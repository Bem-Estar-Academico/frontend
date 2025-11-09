import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFormDraft } from "@/hooks/use-form-draft";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import type { UseFormReturn } from "react-hook-form";

type ReviewHeaderProps = {
  studentRegistration: {
    id: number;
    notice: {
      id: number;
    };
    student: {
      full_name: string;
      registration_number: string;
      cpf: string;
    };
  };
  reviewId: number;
  form: UseFormReturn<any>;
}

export function ReviewHeader({ studentRegistration, form, reviewId }: ReviewHeaderProps) {
  const { saveStatus } = useFormDraft({ form, type: 'REVIEW', reviewId });
 
  return (
    <header className="flex w-full h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        
        <div className="flex items-center gap-6">
          <Button  variant={'ghost'}  asChild>
            <Link to="/editais/$id" params={ { id: String(studentRegistration.notice.id) } }> <IconArrowLeft size={18} /> Voltar</Link>
          </Button>
          <h2 className="text-lg font-semibold">Analisar Inscrição</h2>
          <Badge className="ml-8 font-semibold">Inscrição #{studentRegistration.id}</Badge>
          <Separator orientation="vertical" className="data-[orientation=vertical]:h-6" />
          <div className="flex gap-12 items-center">
            <span>{studentRegistration.student.full_name}</span>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Matrícula</span>
              <span className="text-sm font-semibold">{studentRegistration.student.registration_number}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">CPF</span>
              <span className="text-sm font-semibold">{studentRegistration.student.cpf}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 px-4 ml-auto h-full">
        {saveStatus === 'synced' && (
          <Badge className="text-xs bg-green-100 text-green-800">Todas as alterações salvas</Badge>
        )}
        {saveStatus === 'saving' && (
          <Badge className="text-xs bg-yellow-100 text-yellow-800">Salvando alterações...</Badge>
        )}
        {saveStatus === 'dirty' && (
          <Badge className="text-xs bg-red-100 text-red-800">Alterações não salvas</Badge>
        )}
      </div>
    </header>
  )
}