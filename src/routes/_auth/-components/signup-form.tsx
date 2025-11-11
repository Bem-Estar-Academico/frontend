import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Link } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { createStudentMutationOptions } from "@/mutations/create-student"
import { cpfMask } from "@/lib/utils"

const formSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório."),
    registration_number: z
      .string()
      .min(8, "A matrícula deve ter no mínimo 8 dígitos.")
      .regex(/^\d+$/, "A matrícula deve conter apenas números."),
    cpf: z
      .string()
      .min(11, "O CPF deve ter pelo menos 11 caracteres."),
    email: z.string().email("Email inválido."),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(8, "A confirmação de senha deve ter pelo menos 8 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })

export function SignupForm({
  className,
  onSuccess,
  ...props
}: React.ComponentProps<"form"> & { onSuccess?: () => void }) {
  const createStudentMutation = useMutation(createStudentMutationOptions)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      registration_number: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createStudentMutation.mutateAsync({
        full_name: values.name,
        registration_number: values.registration_number,
        cpf: values.cpf.replaceAll(".", "").replaceAll("-", ""),
        email: values.email,
        password: values.password,
        is_active: true,
        user_type: "STUDENT",
      })
      onSuccess?.()
    } catch (error: any) {
      console.error("Erro ao criar estudante:", error)

      let message = "Não foi possível criar a conta. Tente novamente."

      if (error.response?.data?.detail) {
        message = error.response.data.detail
      }

      if (error.response?.status === 400) {
        message = "Email já cadastrado."
      }

      if (error.response?.status === 500) {
        message = "Erro no servidor. Tente novamente mais tarde."
      }

      toast.error(message)
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 mx-auto">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Preencha o formulário abaixo para criar sua conta.
        </p>
      </div>
      
      <form
        id="signup-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        {...props}
      >
        <FieldGroup>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-name">Nome</FieldLabel>
                  <Input
                    {...field}
                    id="signup-name"
                    type="text"
                    placeholder="Insira seu nome"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="signup-email"
                    type="email"
                    placeholder="Insira seu email"
                    autoComplete="email"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="registration_number"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-registration">Matrícula</FieldLabel>
                  <Input
                    {...field}
                    id="signup-registration"
                    type="text"
                    placeholder="Insira sua matrícula"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-password">Senha</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Insira sua senha"
                      autoComplete="new-password"
                      disabled={form.formState.isSubmitting}
                      aria-invalid={fieldState.invalid}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="cpf"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-cpf">CPF</FieldLabel>
                  <Input
                    {...field}
                    id="signup-cpf"
                    type="text"
                    placeholder="123.456.789-00"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      const masked = cpfMask(e.target.value)
                      field.onChange(masked)
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-confirm-password">Confirme sua senha</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repita a senha"
                      autoComplete="new-password"
                      disabled={form.formState.isSubmitting}
                      aria-invalid={fieldState.invalid}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </form>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          form="signup-form"
          disabled={form.formState.isSubmitting}
          className="w-full justify-center"
        >
          {form.formState.isSubmitting && <Spinner />}
          {form.formState.isSubmitting ? "Cadastrando..." : "Criar conta"}
        </Button>

        <FieldDescription className="text-center">
          Já possui uma conta?{" "}
          <Link to="/login" search={{ redirect: "/" }} className="underline hover:text-primary">
            Login
          </Link>
        </FieldDescription>
      </div>
    </div>
  )
}