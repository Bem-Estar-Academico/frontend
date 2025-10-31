import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignupForm } from "./-components/signup-form";
import { toast } from "sonner";
import LogoCard from "./-components/logo-card";

export const Route = createFileRoute("/_auth/cadastro")({
  component: () => (
    <>
      <title>Cadastro | BEA</title>
      <SignupPage/>
    </>
  ),
});

export default function SignupPage() {
  const navigate = useNavigate();

  const onSuccess = () => {
    toast.success("Conta criada com sucesso!");
    navigate({ to: "/login", search: { redirect: '/'} });
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <SignupForm onSuccess={onSuccess}/>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-between bg-gradient-to-r from-green-100 via-cyan-200 to-blue-400 py-24">
        <div>
          {/* <h1 className="text-3xl font-bold mb-2">Bem Estar Acadêmico</h1> */}
          <p className="text-start font-medium text-black/60 max-w-md">
            O sistema BEA é uma plataforma web para o gerenciamento e agilização do processo de avaliação socioeconômica da Universidade Federal de Alagoas
          </p>
          <br/>
          <p className="text-start font-bold mb-2">Para você, estudante:</p>
          <ul className="list-disc list-inside text-start text-sm max-w-md flex flex-col gap-2">
            <li>Preencha seu cadastro de forma mais fácil diretamente na plataforma.</li>
            <li>Verifique o status do seu processo de cadastramento socioeconômico de forma rápida e eficiente.</li>
          </ul>
        </div>
        <LogoCard />
      </div>
    </div>
  )
}

  