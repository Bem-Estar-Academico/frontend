import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/contexts/auth';
import { StaffEditais } from './-staff-editais';
import { StudentEditaisList } from './-student-editais';

export const Route = createFileRoute('/_app/editais/')({
  component: EditaisList,
})

function EditaisList() {
  const auth = useAuth();

  if (auth.hasRole('STUDENT')) {
    return <StudentEditaisList />;
  }

  return <StaffEditais />;
}