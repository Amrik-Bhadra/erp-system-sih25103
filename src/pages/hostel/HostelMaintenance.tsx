import { HostelComplaintsTable } from "@/components/hostel/hostel-maintenance-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { hostelComplaints as complaintsData } from "@/utils/dataProvider";

const HostelMaintenance = () => {
  // Count complaints by status for dashboard
  const total = complaintsData.length;
  const pending = complaintsData.filter((c) => c.status === "Pending").length;
  const inProgress = complaintsData.filter(
    (c) => c.status === "In-Progress"
  ).length;
  const resolved = complaintsData.filter((c) => c.status === "Resolved").length;

  return (
    <>
      {/* ===== Dashboard Overview ===== */}
      <div className="">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Complaints</CardDescription>
              <CardTitle className="text-2xl font-semibold">{total}</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp className="mr-1 h-4 w-4" />+{total}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex gap-2 font-medium line-clamp-1">
                Total complaints logged
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {pending}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  {pending}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex gap-2 font-medium line-clamp-1">
                Awaiting assignment
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>In-Progress</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {inProgress}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  {inProgress}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex gap-2 font-medium line-clamp-1">
                Currently being handled
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Resolved</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {resolved}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  {resolved}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex gap-2 font-medium line-clamp-1">
                Completed issues
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* ===== Complaints Table ===== */}
      <div className="rounded-md shadow-sm mt-5">
        <h2 className="text-lg font-semibold mb-4">Hostel Complaints</h2>
        <HostelComplaintsTable />
      </div>
    </>
  );
};

export default HostelMaintenance;
