"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

export const description = "Room Occupancy Bar Chart"

// Updated data
const chartData = [
  { hostel: "Hostel A", occupied: 120, total: 150 },
  { hostel: "Hostel B", occupied: 90, total: 100 },
  { hostel: "Hostel C", occupied: 60, total: 80 },
]

// Chart config using shades of blue
const chartConfig = {
  occupied: {
    label: "Occupied",
    color: "#3b82f6", // blue-500
  },
  total: {
    label: "Total",
    color: "#60a5fa", // blue-400
  },
}

export function RoomOccupancyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Occupancy</CardTitle>
        <CardDescription>Current Semester</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="hostel"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="occupied" fill={chartConfig.occupied.color} radius={8} />
            <Bar dataKey="total" fill={chartConfig.total.color} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
