import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CreateStudentForm from "./-components/create-student-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/cadastro")({
  component: () => (
    <>
      <title>Cadastro | BEA</title>
      <CreateStudentPage/>
    </>
  ),
});


function CreateStudentPage() {
  const navigate = useNavigate();

  const onSuccess = () => {
    toast.success("Conta criada com sucesso!");
    navigate({ to: "/login", search: { redirect: '/'} });
  };

  return (
    <CreateStudentForm onSuccess={onSuccess}/>
  )
}
  