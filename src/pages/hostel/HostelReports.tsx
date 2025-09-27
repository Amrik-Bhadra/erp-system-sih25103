import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";
import { HostelOccupancyTable } from "@/components/hostel/hostel-occupancy-table";
import { PendingApplicationsTable } from "@/components/hostel/pending-application-table";
import { MaintenanceTicketsTable } from "@/components/hostel/maintenance-ticket-table";
import { RevenueCollectionTable } from "@/components/hostel/revenue-collection-table";
import { HostelOccupancyChart } from "@/components/hostel/hostel-occupany-chart";
import { PendingApplicationsChart } from "@/components/hostel/pending-applications-chart";
import { MaintenanceTicketsChart } from "@/components/hostel/maintenance-tickets-chart";
import { RevenueCollectionChart } from "@/components/hostel/revenue-collection-chart";

const HostelReports = () => {
  // const [searchText,] = React.useState("");
  // const [searchText, setSearchText] = React.useState("");

  return (
    <div className="space-y-6">
      {/* ===== Tabs for Report Types ===== */}
      <Tabs defaultValue="occupancy" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        {/* ===== Occupancy Report ===== */}
        <TabsContent value="occupancy">
          <h2 className="text-lg font-semibold mb-4">
            Hostel Occupancy Report
          </h2>
          {/* Table component */}
          <HostelOccupancyTable />
          <HostelOccupancyChart />
        </TabsContent>

        {/* ===== Applications Report ===== */}
        <TabsContent value="applications">
          <h2 className="text-lg font-semibold mb-4">
            Pending Applications & Allocations
          </h2>
          <PendingApplicationsTable />
          <PendingApplicationsChart />
        </TabsContent>

        {/* ===== Maintenance Report ===== */}
        <TabsContent value="maintenance">
          <h2 className="text-lg font-semibold mb-4">
            Maintenance Tickets & Resolution
          </h2>
          <MaintenanceTicketsTable />
          <MaintenanceTicketsChart />
        </TabsContent>

        {/* ===== Revenue Report ===== */}
        <TabsContent value="revenue">
          <h2 className="text-lg font-semibold mb-4">
            Revenue / Fine Collection
          </h2>
          <RevenueCollectionTable />
          <RevenueCollectionChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostelReports;
