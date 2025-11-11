import type { UseFormReturn } from "react-hook-form"
import { UsersList } from "@/components/users-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { availableBenefits, type EditalFormData } from "@/lib/-edital-form-schema"
import { DatePickerField, CheckboxItem } from "@/components/-edital-form-fields"

const PLACEHOLDER_IMAGE = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"

interface EditalFormProps {
  form: UseFormReturn<EditalFormData>
  onSubmit: (values: EditalFormData) => Promise<void>
  socialWorkers?: Array<{ id: number; full_name: string }>
  submitButtonText?: string
  isEdit?: boolean
}

export function EditalForm({ 
  form, 
  onSubmit, 
  socialWorkers = [],
  submitButtonText = "Criar Edital",
  isEdit = false
}: EditalFormProps) {
  const formattedSocialWorkers = socialWorkers.map(user => ({
    id: user.id,
    name: user.full_name,
    img: PLACEHOLDER_IMAGE
  }))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
        {/* Seção 1: Informações do Edital */}
        <div className="bg-white p-6 rounded-md border">
          <h3 className="text-lg font-medium py-2">Informações do Edital</h3>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Título do Edital</FormLabel>
                  <FormControl>
                    <Input placeholder="ex.: Cadastramento Socioeconômico 2025.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="row-start-2 row-span-2">
              <Label className="font-medium py-2" isRequired>Benefícios Ofertados</Label>
              <div className="flex flex-col gap-6 py-2">
                <FormField
                  control={form.control}
                  name="benefit"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col gap-4 pb-2">
                        {availableBenefits.map((item) => (
                          <CheckboxItem key={item.id} item={item} field={field} />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o objetivo do edital..." 
                        className="resize-none"
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div> 

          <div className="col-span-2 grid grid-cols-3 gap-6 mt-10 py-2">
            <DatePickerField isRequired control={form.control} name="applicationStart" title="Início das Inscrições" />
            <DatePickerField control={form.control} name="applicationEnd" title="Término das Inscrições" />
            <DatePickerField control={form.control} name="preliminaryResult" title="Resultado Preliminar" />
            <DatePickerField control={form.control} name="appealStart" title="Início da Fase de Recursos" />
            <DatePickerField control={form.control} name="appealEnd" title="Término da Fase de Recursos" />
            <DatePickerField control={form.control} name="finalResult" title="Resultado Final" />
          </div>
        </div>

        {/* Seção 2: Equipe */}
        <div className='bg-white p-6 rounded-md border'>
          <h3 className="text-lg font-medium py-2">Equipe Responsável</h3>
          <div className="grid gap-6 py-2">
            <FormField
              control={form.control}
              name="social_workers"
              render={({ field }) => {
                const selectedUsers = formattedSocialWorkers.filter(u => field.value?.includes(u.id))
                return (
                  <FormItem>
                    <FormControl>
                      <UsersList
                        title={"Assistentes Sociais"}
                        list={selectedUsers}
                        allUsers={formattedSocialWorkers}
                        allowEdit={true}
                        onSelect={(user) => field.onChange([...(field.value || []), user.id])}
                        onDelete={(id) => field.onChange((field.value || []).filter((uid: number) => uid !== id))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
        </div>
       
        <Button 
          type="submit" 
          className="self-end w-3xs mb-12" 
          disabled={form.formState.isSubmitting || (isEdit && !form.formState.isDirty)}
        >
          {form.formState.isSubmitting && <Spinner />}
          {form.formState.isSubmitting ? `${isEdit ? 'Salvando' : 'Criando'}...` : submitButtonText}
        </Button>     
      </form>
    </Form>
  )
}