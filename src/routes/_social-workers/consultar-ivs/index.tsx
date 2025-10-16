import { createFileRoute } from "@tanstack/react-router";
import { ChartMeanIVS } from "../-components/chart-mean-ivs";
import { ChartEditalResults } from "../-components/chart-edital-results";
import { ChartTotalIVS } from "../-components/chart-total-ivs";
import { IVSDataTable } from "@/components/students/ivs-table";
import { studentsIVS } from "./-data";

export const Route = createFileRoute("/_social-workers/consultar-ivs/")({
  component: IVS,
});

export function IVS() {
  return (
    <div className="p-8 space-y-4">
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