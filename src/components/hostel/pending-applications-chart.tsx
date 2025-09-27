import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// ----- Dummy Data -----
interface Application {
  studentName: string;
  hostel: string;
  roomType: string;
  status: "Pending" | "Allocated";
}

const data: Application[] = [
  { studentName: "Amit Sharma", hostel: "Arya Hostel", roomType: "Single", status: "Pending" },
  { studentName: "Neha Gupta", hostel: "Bharat Hostel", roomType: "Double", status: "Allocated" },
  { studentName: "Rohan Verma", hostel: "Chandra Hostel", roomType: "Single", status: "Pending" },
];

// ----- Transform data for chart -----
const chartData = data.reduce<Record<string, { hostel: string; Pending: number; Allocated: number }>>(
  (acc, curr) => {
    if (!acc[curr.hostel]) acc[curr.hostel] = { hostel: curr.hostel, Pending: 0, Allocated: 0 };
    acc[curr.hostel][curr.status] += 1;
    return acc;
  },
  {}
);

const formattedData = Object.values(chartData);

export function PendingApplicationsChart() {
  return (
    <div className="w-full mb-6">
      <h3 className="text-lg font-semibold mb-2">Application Status per Hostel</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hostel" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Pending" fill="#ef4444" name="Pending Applications" />
          <Bar dataKey="Allocated" fill="#22c55e" name="Allocated Applications" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
