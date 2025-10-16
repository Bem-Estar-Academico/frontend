import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with text"

const chartConfig = {
  total_percent: {
    label: "Total Processado",
    color: "var(--color-blue-500)",
  },
} satisfies ChartConfig


export interface ChartProgressProps {
  total_percent: number
}

export function ChartProgress({ total_percent }: ChartProgressProps) {

  const chartData = [{ total_percent, fill: "var(--color-total_percent)" }]

  return (
    <div className="flex flex-col p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Progresso</CardTitle>
        <CardDescription>Edital 2024.2</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={(-90) + 360 * (total_percent / 100)}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="total_percent" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {total_percent.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Finalizado
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
         Aumento de 5.2% em relação a semana passada <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando o total de inscrições finalizadas no edital.
        </div>
      </CardFooter>
    </div>
  )
}
