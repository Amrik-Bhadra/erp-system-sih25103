import { SectionCards } from "@/components/hostel/section-cards";
import { ChartAreaInteractive } from "@/components/hostel/chart-area-interactive";
import { RoomOccupancyChart } from "@/components/hostel/RoomOccupancyChart";
import { ApplicationsTrendChart } from "@/components/hostel/ApplicationsTrendChart";
import { FeeStatusChart } from "@/components/hostel/FeePaymentStatusChart";
import { ComplaintResolutionChart } from "@/components/hostel/ComplaintResolutionChart";

const HostelDashboard = () => {
  const stats = {
    totalHostels: 5,
    totalRooms: 200,
    pendingApplications: 12,
    pendingComplaints: 3,
    pendingExits: 2,
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 1️⃣ Overview / Summary Cards */}
      <SectionCards stats={stats} />

      {/* 2️⃣ Key Metrics Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Room Occupancy per Hostel */}
        <RoomOccupancyChart />

        {/* Applications Trend */}
        <ApplicationsTrendChart />
      </div>

      {/* 3️⃣ Status / Pie / Donut Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Fee Payment Status */}
        <FeeStatusChart />

        {/* Complaint Resolution Status */}
        <ComplaintResolutionChart />
      </div>

      {/* 4️⃣ Optional: Interactive Visitors Chart */}
      <div className="">
        <ChartAreaInteractive />
      </div>
    </div>
  );
};

export default HostelDashboard;
