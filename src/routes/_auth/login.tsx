import { createFileRoute } from "@tanstack/react-router";
import { UserAuthForm } from "./-components/user-auth-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_auth/login")({
  component: () => {
    return (
        <div className="bg-gray-100 flex flex-col h-screen w-full items-center justify-center">
          <div className="lg:p-8">
            <div className="flex items-center w-full justify-center">
                <img
                  src="/logo-bea.png"
                  alt="Logo UFAL"
                  className="max-w-[120px]"
                  />
                </div>
            <div className="mt-4 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <Card >
                <CardHeader>
                  <CardTitle>Acesse sua conta</CardTitle>
                  <CardDescription>
                    Insira suas credenciais para acessar o sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserAuthForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    );
  },
});
