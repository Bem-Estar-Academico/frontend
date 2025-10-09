import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type CustomTooltipProps,
} from "@/components/ui/chart"


const chartData = [
  { period: "2022.1", mean: 186 },
  { period: "2022.2", mean: 305 },
  { period: "2023.1", mean: 237 },
  { period: "2023.2", mean: 73 },
  { period: "2024.1", mean: 209 },
  { period: "2024.2", mean: 214 },
]

const chartConfig = {
  mean: {
    label: "Média do IVS",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ChartMeanIVS() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="leading-none font-semibold">Média do Índice de Vulnerabilidade Social</CardTitle>
            <CardDescription className='text-muted-foreground text-sm'>
                Média dos IVS dos últimos 6 períodos (2022.1 - 2024.1)
            </CardDescription>
        </CardHeader>
       <CardContent>
         <ChartContainer config={chartConfig} className="min-h-[100px] box-border  w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.substring(2)}
            />
            <ChartTooltip
              cursor={false}
              content={(props: CustomTooltipProps) => <ChartTooltipContent {...props}  indicator="line" />}
            />
            <Area
              dataKey="mean"
              type="natural"
              fill="var(--color-mean)"
              fillOpacity={0.4}
              stroke="var(--color-mean)"
            />
          </AreaChart>
        </ChartContainer>
       </CardContent>
    </Card>
  )
}
