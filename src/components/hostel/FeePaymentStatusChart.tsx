"use client"

import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

export const description = "Fee Payment Status Pie Chart with a legend"

// Updated data with blue shades
const chartData = [
  { name: "Paid", value: 120, fill: "#3b82f6" },       // blue-500
  { name: "Pending", value: 30, fill: "#60a5fa" },     // blue-400
  { name: "Overdue", value: 10, fill: "#93c5fd" },     // blue-300
]

const chartConfig = {
  visitors: {
    label: "Payments",
  },
  Paid: {
    label: "Paid",
    color: "#3b82f6",
  },
  Pending: {
    label: "Pending",
    color: "#60a5fa",
  },
  Overdue: {
    label: "Overdue",
    color: "#93c5fd",
  },
}

export function FeeStatusChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Fee Payment Status</CardTitle>
        <CardDescription>Current Semester</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
