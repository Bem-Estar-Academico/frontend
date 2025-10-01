import { Cell, Pie, PieChart, Tooltip } from "recharts";

export interface RegistrationData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface RegistrationStatusGraphicProps {
  dataRegistration: Array<RegistrationData>;
}

export default function RegistrationStatusGraphic({
  dataRegistration,
}: Readonly<RegistrationStatusGraphicProps>) {
  const countValue = dataRegistration.reduce(
    (acc, item) => acc + item.value, 0
  );

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
          <Tooltip
            formatter={(value: number) => {
              const percent = ((value / countValue) * 100).toFixed(1) + "%";
              return [`${value} (${percent})`];
            }}
            contentStyle={{
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "6px",
            }}
          />
        </PieChart>
      </div>
      <div className="grid grid-cols-2 place-items-center">
        {dataRegistration.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center gap-2 w-25 h-7 ${
              index + 2 > dataRegistration.length ? "col-span-2" : ""
            }`}
          >
            <div
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            >
              {" "}
            </div>
            <span className="text-sm text-gray-800">{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
