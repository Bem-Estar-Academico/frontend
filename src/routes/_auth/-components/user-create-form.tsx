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
    name: "nomeCompleto",
    label: "Nome Completo",
    placeholder: "João da Silva",
    type: "text",
  },
  {
    name: "matricula",
    label: "Matrícula",
    placeholder: "xxxxxxxx",
    type: "text",
  },
  {
    name: "cpf",
    label: "CPF",
    placeholder: "000.000.000-00",
    type: "text",
  },
  {
    name: "dataNascimento",
    label: "Data de Nascimento",
    placeholder: "DD/MM/AAAA",
    type: "text",
  },
] as const;

const formSchema = z
  .object({
    nomeCompleto: z.string().min(2, {
      message: "Nome deve ter no mínimo 15 caracteres.",
    }),
    matricula: z
      .string()
      .min(8, { message: "A matrícula deve ter no mínimo 8 dígitos." })
      .regex(/^[0-9]+$/, {
        message: "A matrícula deve conter apenas números.",
      }),

    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF inválido. Use o formato XXX.XXX.XXX-XX.",
    }),

    dataNascimento: z
      .string()
      .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: "Data inválida. Use o formato DD/MM/AAAA.",
      }),
    email: z.string().email({
      message: "Por favor, insira um endereço de email válido.",
    }),

    password: z.string().min(8, {
      message: "A senha deve ter no mínimo 8 caracteres.",
    }),

    confirmPassword: z.string().min(8, {
      message: "A confirmação de senha deve ter no mínimo 8 caracteres.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export default function UserCreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCompleto: "",
      matricula: "",
      cpf: "",
      dataNascimento: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <div className="flex w-full items-center justify-center pb-8">
                  <Button type="submit" className="justify-center w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
