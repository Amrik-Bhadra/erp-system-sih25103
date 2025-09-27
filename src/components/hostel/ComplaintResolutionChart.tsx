import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Label, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Complaint resolution chart with donut style"

const complaintData = [
  { name: "Resolved", value: 50, fill: "#3b82f6" },      // blue-500
  { name: "Pending", value: 20, fill: "#60a5fa" },       // blue-400
  { name: "In Progress", value: 15, fill: "#93c5fd" },   // blue-300
];

const chartConfig = {
  total: { label: "Total Complaints" },
  Resolved: { label: "Resolved", color: "#3b82f6" },
  Pending: { label: "Pending", color: "#60a5fa" },
  "In Progress": { label: "In Progress", color: "#93c5fd" },
}

export function ComplaintResolutionChart() {
  const totalComplaints = React.useMemo(() => {
    return complaintData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Complaint Resolution</CardTitle>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={complaintData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={5}
              >
                {complaintData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
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
                            {totalComplaints}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Complaints
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </CardHeader>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total complaints for the last period
        </div>
      </CardFooter>
    </Card>
  )
}
