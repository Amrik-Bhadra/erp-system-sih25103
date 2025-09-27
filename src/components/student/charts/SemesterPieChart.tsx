import { Pie, PieChart } from "recharts";

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

interface SemesterPieChartProps {
  passCount: number;
  failCount: number;
  semester: number;
}

export function SemesterPieChart({
  passCount,
  failCount,
  semester,
}: SemesterPieChartProps) {
  const chartData = [
    { browser: "Pass", visitors: passCount, fill: "var(--chart-2)" },
    { browser: "Fail", visitors: failCount, fill: "var(--chart-3)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Count",
    },
    Pass: {
      label: "Pass",
      color: "var(--chart-2)",
    },
    Fail: {
      label: "Fail",
      color: "var(--chart-3)",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Semester {semester} - Pass/Fail Analysis</CardTitle>
        <CardDescription>Summary of subjects</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 min-h-[300px] min-w-[300px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[300px] w-full [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart width={300} height={300}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
