import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

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
import { useAuth } from "@/contexts/auth"

const formSchema = z.object({
  email: z.string().email("Por favor, insira um endereço de email válido."),
  password: z.string().min(1, "A senha é obrigatória."),
})

export function LoginForm({
  className,
  onSuccess,
  ...props
}: React.ComponentProps<"form"> & { onSuccess?: () => void }) {
  const { login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values.email, values.password)
      onSuccess?.()
    } catch (error: any) {
      console.error("Erro ao fazer login:", error)

      let message = "Não foi possível fazer login. Tente novamente."

      if (error.response?.data?.detail) {
        message = error.response.data.detail
      }

      if (error.response?.status === 401) {
        message = "Email ou senha inválidos."
      }

      if (error.response?.status === 500) {
        message = "Erro no servidor. Tente novamente mais tarde."
      }

      toast.error(message)
    }
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Entre na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Informe seus dados de acesso para continuar.
          </p>
        </div>
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className={className}
          {...props}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">Senha</FieldLabel>
                  <Input
                    {...field}
                    id="login-password"
                    type="password"
                    placeholder="Insira sua senha"
                    autoComplete="current-password"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <div className="flex flex-col gap-4">
            <Button
                type="submit"
                form="login-form"
                disabled={form.formState.isSubmitting}
                className="w-full justify-center"
            >
                {form.formState.isSubmitting && <Spinner />}
                {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
            </Button>

            <FieldDescription className="text-center">
                Não possui uma conta?{" "}
                <Link to="/cadastro" className="underline hover:text-primary">
                    Cadastre-se
                </Link>
            </FieldDescription>
        </div>
    </div>
  )
}
