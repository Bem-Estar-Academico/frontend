import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createFileRoute, notFound, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateNoticeMutationOptions } from "@/mutations/notice" 
import { usersQueryOptions } from "@/queries/users"
import type { UpdateNoticeDTO } from "@/types/notice" 
import { Spinner } from "@/components/ui/spinner"
import { editalQueryOptions } from "@/queries/edital"
import { editalSchema, type EditalFormData, getEditalErrorMessage } from "@/lib/-edital-form-schema"
import { EditalForm } from "@/components/-edital-form"

export const Route = createFileRoute("/_app/editais/$id/editar")({
  component: () => (
    <>
      <title>Editar Edital | BEA</title>
      <EditEdital/>
    </>
  ),
  beforeLoad: async ({context: { auth }}) => {
    if (!auth?.hasRole("COORDINATOR")) {
      throw notFound()
    }
  }
})

function EditEdital() {
  const navigate = useNavigate()
  const { id: editalId } = useParams({ from: Route.id })
  const noticeIdNum = parseInt(editalId)
  const queryClient = useQueryClient()

  const { data: notice, isLoading: isLoadingNotice } = useQuery(editalQueryOptions(noticeIdNum))
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

  useEffect(() => {
    if (notice) {
      const benefits: string[] = []
      if (notice.food_allowance) benefits.push("auxilio_alimentacao")
      if (notice.housing_allowance) benefits.push("auxilio_moradia")
      if (notice.daycare_allowance) benefits.push("auxilio_creche")
      if (notice.graduation_scholarship) benefits.push("bolsa_pro_graduando")

      form.reset({
        title: notice.title,
        description: notice.description,
        social_workers: notice.team_members.map((member) => member.user.id),
        benefit: benefits,
        applicationStart: new Date(notice.registration_start_date),
        applicationEnd: notice.registration_end_date ? new Date(notice.registration_end_date) : undefined,
        preliminaryResult: notice.preliminary_result_date ? new Date(notice.preliminary_result_date) : undefined,
        appealStart: notice.appeal_start_date ? new Date(notice.appeal_start_date) : undefined,
        appealEnd: notice.appeal_end_date ? new Date(notice.appeal_end_date) : undefined,
        finalResult: notice.final_result_date ? new Date(notice.final_result_date) : undefined,
      })
    }
  }, [notice, form])

  const updateNoticeMutation = useMutation({
    ...updateNoticeMutationOptions(noticeIdNum),
    onSuccess: () => {
      toast.success("Edital atualizado com sucesso!")
      queryClient.invalidateQueries({ queryKey: editalQueryOptions(noticeIdNum).queryKey })
      navigate({ to: `/editais/${noticeIdNum}` })
    },
    onError: (error: any) => {
      const errorMessage = getEditalErrorMessage(error)
      toast.error('Erro ao atualizar edital', {
        description: errorMessage,
      })
    }
  })
  
  async function onSubmit(values: EditalFormData) {
    try {
      const payload: UpdateNoticeDTO = {
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
        // team_members: values.social_workers
      }

      await updateNoticeMutation.mutateAsync(payload)
      
    } catch (error: any) {
        console.error("Erro no onSubmit:", error)
    }
  }

  if (isLoadingNotice) {
    return (
      <div className="flex w-full h-full items-center justify-center p-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full max-w-full px-10 py-6">
      <h1 className="font-bold text-2xl mb-6">Editar Edital</h1>
      <EditalForm 
        form={form}
        onSubmit={onSubmit}
        socialWorkers={socialWorkers}
        submitButtonText="Salvar Alterações"
        isEdit={true}
      />
    </div>
  )
}