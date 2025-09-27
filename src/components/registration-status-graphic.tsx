import { Cell, Pie, PieChart } from "recharts";

interface RegistrationStatusGraphicProps {
  dataRegistration: object[];
}

export default function RegistrationStatusGraphic({
  dataRegistration,
}: RegistrationStatusGraphicProps) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h3>Status das Inscrições</h3>
        <PieChart width={200} height={200}>
          <Pie
            data={dataRegistration}
            innerRadius={40}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {dataRegistration.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="grid grid-cols-2 gap-y-3 gap-x-8 place-items-center">
        {dataRegistration.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center gap-2 ${
              index + 2 > dataRegistration.length ? "col-span-2" : ""
            }`}
          >
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-800">{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
