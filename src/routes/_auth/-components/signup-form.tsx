import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Spinner } from "@/components/ui/spinner"
import { useMutation } from "@tanstack/react-query"
import { createStudentMutationOptions } from "@/mutations/create-student"
import { Link } from "@tanstack/react-router"


const formSchema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    student_registration: z
      .string()
      .min(8, { message: "A matrícula deve ter no mínimo 8 dígitos." })
      .regex(/^\d+$/, {
        message: "A matrícula deve conter apenas números.",
      }),
    cpf: z
      .string()
      .min(11, { message: "O CPF deve ter pelo menos 11 caracteres." }),
    email: z.string().email({ message: "Email inválido." }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
    confirmPassword: z.string().min(8, { message: "A confirmação de senha deve ter pelo menos 8 caracteres." }),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      student_registration: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createStudentMutation.mutateAsync({
        full_name: values.name,
        student_registration: values.student_registration,
        cpf: values.cpf.replaceAll(".", "").replaceAll("-", ""),
        email: values.email,
        password: values.password,
        is_active: true,
        user_type: "STUDENT",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Erro ao criar estudante:", error)
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha o formulário abaixo para criar sua conta.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Field>
            <FieldLabel htmlFor="name">Nome</FieldLabel>
            <Input id="name" type="text" placeholder="Nome" {...register("name")} />
            <div className="min-h-[8px] mt-1">
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="Email" {...register("email")} />
            <div className="min-h-[8px] mt-1">
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="student_registration">Matrícula</FieldLabel>
            <Input
              id="student_registration"
              type="text"
              placeholder="12345678"
              {...register("student_registration")}
            />
            <div className="min-h-[8px] mt-1">
              {errors.student_registration && (
                <p className="text-xs text-red-500">{errors.student_registration.message}</p>
              )}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Input id="password" type="password" placeholder="Mínimo 8 caracteres" {...register("password")} />
            <div className="min-h-[8px] mt-1">
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="cpf">CPF</FieldLabel>
            <Input id="cpf" type="text" placeholder="12345678900" {...register("cpf")} />
            <div className="min-h-[8px] mt-1">
              {errors.cpf && (
                <p className="text-xs text-red-500">{errors.cpf.message}</p>
              )}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirme sua senha</FieldLabel>
            <Input id="confirmPassword" type="password" placeholder="Repita a senha" {...register("confirmPassword")} />
            <div className="min-h-[8px] mt-1">
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </Field>
        </div>

        <Field className="mt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="justify-center w-full"
          >
            {isSubmitting && <Spinner />}
            {isSubmitting ? "Cadastrando..." : "Criar conta"}
          </Button>
          <FieldDescription className="px-6 text-center mt-2">
            Já possui uma conta? <Link to="/login" search={{ redirect: "/" }} className="underline hover:text-primary">Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}