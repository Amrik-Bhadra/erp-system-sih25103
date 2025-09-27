import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Applications Trend Line Chart with Gradient"

// Updated data
const chartData = [
  { month: "Jan", applications: 25 },
  { month: "Feb", applications: 35 },
  { month: "Mar", applications: 30 },
  { month: "Apr", applications: 40 },
]

// Chart config using blue shades
const chartConfig = {
  applications: {
    label: "Applications",
    color: "#3b82f6", // blue-500
  },
}

export function ApplicationsTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications Trend</CardTitle>
        <CardDescription>Current Semester</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              {/* Define gradient */}
              <defs>
                <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartConfig.applications.color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={chartConfig.applications.color} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent indicator="line" />} />

              {/* Area for gradient under the line */}
              <Area
                type="monotone"
                dataKey="applications"
                stroke="none" // no stroke for the area
                fill="url(#applicationsGradient)"
              />

              {/* Solid line on top */}
              <Line
                type="monotone"
                dataKey="applications"
                stroke={chartConfig.applications.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.applications.color }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey="applications"
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
