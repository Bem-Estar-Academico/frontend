import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createStudentMutationOptions } from "@/mutations/create-student";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const formFieldsConfig = [
  {
    name: "email",
    label: "Email",
    placeholder: "seu@email.com",
    type: "email",
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "********",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirmar Senha",
    placeholder: "********",
    type: "password",
  },
  {
    name: "full_name",
    label: "Nome Completo",
    placeholder: "João da Silva",
    type: "text",
  },
  {
    name: "student_registration",
    label: "Matrícula",
    placeholder: "xxxxxxxx",
    type: "text",
  },
  {
    name: "cpf",
    label: "CPF",
    placeholder: "000.000.000-00",
    type: "text",
  }
] as const;

const formSchema = z
  .object({
    full_name: z.string().min(2, {
      message: "Nome deve ter no mínimo 2 caracteres.",
    }),
    student_registration: z
      .string()
      .min(8, { message: "A matrícula deve ter no mínimo 8 dígitos." })
      .regex(/^\d+$/, {
        message: "A matrícula deve conter apenas números.",
      }),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF inválido. Use o formato XXX.XXX.XXX-XX.",
    }),
    email: z.string().email({
      message: "Por favor, insira um endereço de email válido.",
    }),
    password: z.string().min(8, {
      message: "A senha deve ter no mínimo 8 caracteres.",
    }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });


interface CreateStudentFormProps {
  onSuccess?: () => void;
}

export default function CreateStudentForm({ onSuccess }: Readonly<CreateStudentFormProps>) {
  const createStudentMutation = useMutation(createStudentMutationOptions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      student_registration: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    return createStudentMutation.mutateAsync({
      full_name: values.full_name,
      student_registration: values.student_registration,
      cpf: values.cpf,
      email: values.email,
      password: values.password,
      is_active: true,
      user_type: "STUDENT",
    }).then(() => {
      onSuccess?.();
    });
  }

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex items-center pt-8">
          <h1 className="text-2xl font-semibold tracking-tight w-full">
            Inscrever-se
          </h1>
          <img src="/logo-ufal.png" alt="Logo UFAL" className="w-10" />
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {formFieldsConfig.map((formField) => (
                <FormField
                  key={formField.name}
                  control={form.control}
                  name={formField.name}
                
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formField.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={formField.placeholder}
                          type={formField.type}
                            disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex w-full items-center justify-center pb-8">
                <Button disabled={isSubmitting} type="submit" className="justify-center w-full">
                  {isSubmitting && <Spinner />}
                  {isSubmitting ? "Cadastrando..." : "Criar conta"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
