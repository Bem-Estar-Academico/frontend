import { createFileRoute } from '@tanstack/react-router'
import { UserAuthForm } from "./-components/user-auth-form";
import { Link } from "@tanstack/react-router";


export const Route = createFileRoute('/_auth/login')({
  component: () => {
  return (
    <>
      <div className="flex flex-col h-screen w-full items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">LOGIN</h1>
            </div>
            <UserAuthForm />
            <Link to="/create-user" className="text-center">Crie uma conta</Link>
          </div>
        </div>
      </div>
    </>
  );
},
})
