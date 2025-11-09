import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/contexts/auth';
import { StudentEditaisComponent } from './-student-page';
import { StaffEditaisComponent } from './-staff-page';
import { editalQueryOptions } from '@/queries/edital';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const Route = createFileRoute('/_app/editais/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const auth = useAuth();
  const { id } = Route.useParams();
  const { data: edital } = useSuspenseQuery(editalQueryOptions(Number(id)));

  useEffect(() => {
    document.title = `${edital.title} | BEA`;
  }, [edital.title]);

  if (auth.hasRole('STUDENT')) return <StudentEditaisComponent />;

  return <StaffEditaisComponent />;
}