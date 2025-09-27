import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SubjectBarChartProps {
  data: { subject: string; marks: number; fill?: string }[];
}

export function SubjectBarChart({ data }: SubjectBarChartProps) {
  const chartConfig = {
    marks: {
      label: "Earned Grade Points",
    },
    ...data.reduce((acc, curr) => {
      acc[curr.subject] = {
        label: curr.subject,
        color: curr.fill || "var(--chart-1)",
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>),
  } 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject-wise Marks</CardTitle>
        <CardDescription>Earned grade points for each subject</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 0, right: 10, top: 20, bottom: 20 }}
          >
            <YAxis
              dataKey="subject"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="marks" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="marks" radius={5} fill="var(--chart-1)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
