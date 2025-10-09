"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export const description = "A bar chart"

const chartData = [
  { period: "2022.1", total: 186 },
  { period: "2022.2", total: 305 },
  { period: "2023.1", total: 237 },
  { period: "2023.2", total: 73 },
  { period: "2024.1", total: 209 },
  { period: "2024.2", total: 214 },
]

const chartConfig = {
  total: {
    label: "Estudantes",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartTotalIVS() {
  return (

    
    <Card >
      <CardHeader>
        <CardTitle>Estudantes com IVS</CardTitle>
        <CardDescription>Quantidade de estudantes com IVS válido nos últimos 6 períodos</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.substring(2)}
            />
            <ChartTooltip
              cursor={false}
              content={(props: CustomTooltipProps) => <ChartTooltipContent {...props} hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
