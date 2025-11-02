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
import { Link } from "@tanstack/react-router"
import { useAuth } from "@/contexts/auth"


const formSchema = z.object({
    email: z.string().email({
        message: "Por favor, insira um endereço de email válido.",
    }),
    password: z.string().min(1, {
        message: "A senha é obrigatória.",
    }),
});

export function LoginForm({
  className,
  onSuccess,
  ...props
}: React.ComponentProps<"form"> & { onSuccess?: () => void }) {
    const { login } = useAuth();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = form

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await login(values.email, values.password);
            onSuccess?.();
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            setError("root", {
                type: "manual",
                message: error?.response?.data?.detail || "Erro ao fazer login",
            });
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
                <h1 className="text-2xl font-bold">Acesse sua conta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Informe seus dados de login para entrar na plataforma.
                </p>
            </div>
            
            <div className="flex flex-col gap-x-6 gap-y-4">
            {errors.root && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
            )}

            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="Email" disabled={isSubmitting} {...register("email")} />
                <div className="min-h-[20px] mt-1">
                {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
                </div>
            </Field>

            <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <Input id="password" type="password" placeholder="Mínimo 8 caracteres" disabled={isSubmitting} {...register("password")} />
                <div className="min-h-[20px] mt-1">
                {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
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
                {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <FieldDescription className="px-6 text-center mt-2">
                Não possui uma conta? <Link to="/cadastro" className="underline hover:text-primary">Cadastre-se</Link>
            </FieldDescription>
            </Field>
        </FieldGroup>
        </form>
    )
}