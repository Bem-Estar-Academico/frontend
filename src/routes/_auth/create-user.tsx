import { createFileRoute } from "@tanstack/react-router";
import UserCreateForm from "./-components/user-create-form";

export const Route = createFileRoute("/_auth/create-user")({
  component: UserCreateForm,
});
