import { createFileRoute } from "@tanstack/react-router";
import { ChartMeanIVS } from "../-components/chart-mean-ivs";
import { ChartEditalResults } from "../-components/chart-edital-results";
import { ChartTotalIVS } from "../-components/chart-total-ivs";
import { IVSDataTable, type StudentIVS } from "@/components/students/ivs-table";
import { ivsQueryOptions } from "@/queries/ivs";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_app/_social-workers/consultar-ivs/")({
    component: () => (
    <>
      <title>Consultar IVS | BEA</title>
      <IVS/>
    </>
  ),
});

export function IVS() {
  const { data } = useSuspenseQuery(ivsQueryOptions);

  const studentsIVS: StudentIVS[] = data.map(item => ({
    id: item.student.id,
    email: item.student.email,
    full_name: item.student.full_name,
    user_type: item.student.user_type,
    registration_number: item.student.registration_number,
    cpf: item.student.cpf,
    ivs: item.ivs_score,
    approved_at: item.expiration_date,
    expires_at: item.expiration_date
  }));

  return (
    <div className="space-y-4 px-10 py-6">
      <h2 className="font-bold text-2xl">Consultar IVS</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 '>
        <ChartMeanIVS />
        <ChartEditalResults />
        <ChartTotalIVS />
      </div>
     
      <IVSDataTable data={studentsIVS} />
    </div>
  );
}