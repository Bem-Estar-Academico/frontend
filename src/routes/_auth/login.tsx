import { createFileRoute } from "@tanstack/react-router";
import { UserAuthForm } from "./-components/user-auth-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_auth/login")({
  component: () => {
    return (
      <>
        <div className="flex flex-col h-screen w-full items-center justify-center">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <Card >
                <CardHeader className="items-center justify-center text-center">
                  <img
                    src="/logo-bea.png"
                    alt="Logo UFAL"
                    className="size-25"
                  />
                  <CardTitle >LOGIN</CardTitle>
                </CardHeader>
                <CardContent className="items-center justify-center text-center">
                  <UserAuthForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  },
});
