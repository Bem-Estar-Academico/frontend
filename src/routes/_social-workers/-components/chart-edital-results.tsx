import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const description = "A donut chart with text"

const semesters = [
  "2022.1",
  "2022.2",
  "2023.1",
  "2023.2",
  "2024.1",
  "2024.2",
]

const data = [
  {
    semester: "2022.1",
    approved: 150,
    denied: 200,
    appeal: 120,
    pending: 80,
    review: 90,
  },
  {
    semester: "2022.2",
    approved: 150,
    denied: 100,
    appeal: 120,
    pending: 80,
    review: 90,
  },
  {
    semester: "2023.1",
    approved: 15,
    denied: 10,
    appeal: 12,
    pending: 8,
    review: 119,
  },
  {
    semester: "2023.2",
    approved: 150,
    denied: 100,
    appeal: 120,
    pending: 180,
    review: 90,
  },
  {
    semester: "2024.1",
    approved: 1150,
    denied: 100,
    appeal: 120,
    pending: 80,
    review: 90,
  },
  {
    semester: "2024.2",
    approved: 150,
    denied: 1100,
    appeal: 120,
    pending: 80,
    review: 90,
  },
]

const chartConfig = {
  approved: {
    label: "Deferidos",
    color: "var(--color-emerald-500)",
  },
  denied: {
    label: "Indeferidos",
    color: "var(--color-red-400)",
  },
  appeal: {
    label: "Recurso",
    color: "var(--color-purple-400)",
  },
  pending: {
    label: "Pendente",
    color: "var(--muted-foreground)",
  },
  review: {
    label: "Em Análise",
    color: "var(--color-blue-400)",
  },
} satisfies ChartConfig

export function ChartEditalResults() {
  const [selectedSemester, setSelectedSemester] = React.useState(semesters[semesters.length - 1])
  const totalStudents = React.useMemo(() => {
    const selectedSemesterData = data.find(item => item.semester === selectedSemester)
    console.log(selectedSemesterData)
    if (!selectedSemesterData) return 0
    return selectedSemesterData.approved + selectedSemesterData.denied + selectedSemesterData.appeal + selectedSemesterData.pending + selectedSemesterData.review
  }, [selectedSemester])

  const chartData = React.useMemo(() => {
    const selectedSemesterData = data.find(item => item.semester === selectedSemester)
    if (!selectedSemesterData) return []

    return [
      { status: "approved", total: selectedSemesterData.approved, fill: "var(--color-approved)" },
      { status: "denied", total: selectedSemesterData.denied, fill: "var(--color-denied)" },
      { status: "appeal", total: selectedSemesterData.appeal, fill: "var(--color-appeal)" },
      { status: "pending", total: selectedSemesterData.pending, fill: "var(--color-pending)" },
      { status: "review", total: selectedSemesterData.review, fill: "var(--color-review)" },
    ]
  }, [selectedSemester])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Resultados por Edital</CardTitle>
        <CardDescription>
           <Select
              value={selectedSemester ?? ""}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectGroup>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          
          className="mx-auto aspect-square max-h-[250px] min-h-[100px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={(props: CustomTooltipProps) => <ChartTooltipContent {...props} hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Inscritos
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart> 
        </ChartContainer>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {Object.entries(chartConfig).map(([key, { label, color }]) => {
            const item = chartData.find(item => item.status === key)
            if (!item || item.total === 0) return null
            return (
              <div key={key} className="flex items-center gap-2 py-1">
                <span className="h-3 w-3 rounded" style={{ backgroundColor: color }}></span>
                <span className="text-sm">{label}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
