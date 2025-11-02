import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "./-components/login-form";
import LogoCard from "./-components/logo-card";

export const Route = createFileRoute("/_auth/login")({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/',
  }),
  beforeLoad: async ({ context, search }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({ to: search.redirect })
    }
  },
  component: LoginPage,
});

export default function LoginPage() {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate({ to: "/" });
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <title>Login | BEA</title>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <LoginForm onSuccess={onSuccess}/>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-r from-green-100 via-cyan-200 to-blue-400 py-24">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-extrabold font-display text-blue-900/90 mb-3 tracking-tight drop-shadow-[0_3px_6px_rgba(255,255,255,0.4)]">
            Bem Estar Acadêmico
          </h1>
          <LogoCard />
        </div>
      </div>
    </div>
  )
}