import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/contexts/auth';
import { StudentEditaisComponent } from './-student-page';
import { StaffEditaisComponent } from './-staff-page';

export const Route = createFileRoute('/_app/editais/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
   const auth = useAuth();

   if (auth.hasRole('STUDENT')) return <StudentEditaisComponent />;

   return <StaffEditaisComponent />;
}

