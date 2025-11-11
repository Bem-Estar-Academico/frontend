import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { createNoticeMutationOptions } from "@/mutations/notice"
import { usersQueryOptions } from "@/queries/users"
import type { CreateNoticeDTO } from "@/types/create-notice-dto"
import { editalSchema, type EditalFormData, getEditalErrorMessage } from "@/lib/-edital-form-schema"
import { EditalForm } from "@/components/-edital-form"

export const Route = createFileRoute("/_app/editais/criar")({
  component: () => (
    <>
      <title>Criar Edital | BEA</title>
      <CreateEdital/>
    </>
  ),
  beforeLoad: async ({context: { auth }}) => {
    if (!auth?.hasRole("COORDINATOR")) {
      throw notFound()
    }
  }
})

function CreateEdital() {
  const navigate = useNavigate()
  const { data: socialWorkers } = useQuery(usersQueryOptions({ user_type: "SOCIAL_WORKER" }))
  
  const form = useForm<EditalFormData>({
    resolver: zodResolver(editalSchema),
    defaultValues: {
      title: "",
      description: "",
      social_workers: [],
      benefit: [],
    },
  })

  const createNoticeMutation = useMutation(createNoticeMutationOptions)
  
  async function onSubmit(values: EditalFormData) {
    try {
      const payload: CreateNoticeDTO = {
        title: values.title,
        registration_start_date: values.applicationStart.toISOString(),
        registration_end_date: values.applicationEnd?.toISOString(),
        appeal_start_date: values.appealStart?.toISOString(),
        appeal_end_date: values.appealEnd?.toISOString(),
        preliminary_result_date: values.preliminaryResult?.toISOString(),
        final_result_date: values.finalResult?.toISOString(),
        description: values.description,
        food_allowance: values.benefit.includes("auxilio_alimentacao"),
        housing_allowance: values.benefit.includes("auxilio_moradia"),
        daycare_allowance: values.benefit.includes("auxilio_creche"),
        graduation_scholarship: values.benefit.includes("bolsa_pro_graduando"),
        team_members: values.social_workers
      }

      const createdNotice = await createNoticeMutation.mutateAsync(payload)
      toast.success("Edital criado com sucesso!")
      navigate({ to: `/editais/${createdNotice.id}` })
      
    } catch (error: any) {
      const errorMessage = getEditalErrorMessage(error)
      toast.error('Erro ao criar edital', {
        description: errorMessage,
      })
    }
  }

  return (
    <div className="flex flex-col w-full h-full max-w-full px-10 py-6">
      <h1 className="font-bold text-2xl mb-6">Criar Edital</h1>
      <EditalForm 
        form={form}
        onSubmit={onSubmit}
        socialWorkers={socialWorkers}
        submitButtonText="Criar Edital"
        isEdit={false}
      />
    </div>
  )
}