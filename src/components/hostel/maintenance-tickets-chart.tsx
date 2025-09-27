import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// ----- Dummy Data -----
interface Maintenance {
  hostel: string;
  room: string;
  category: string;
  raisedBy: string;
  status: "Pending" | "In-Progress" | "Resolved";
}

const data: Maintenance[] = [
  { hostel: "Arya Hostel", room: "101", category: "Plumbing", raisedBy: "Amit Sharma", status: "Pending" },
  { hostel: "Bharat Hostel", room: "202", category: "Electricity", raisedBy: "Neha Gupta", status: "In-Progress" },
  { hostel: "Chandra Hostel", room: "303", category: "Cleaning", raisedBy: "Rohan Verma", status: "Resolved" },
];

// ----- Transform data for chart -----
type ChartDataType = { category: string; Pending: number; InProgress: number; Resolved: number };

const chartData: Record<string, ChartDataType> = {};

data.forEach((ticket) => {
  if (!chartData[ticket.category])
    chartData[ticket.category] = { category: ticket.category, Pending: 0, InProgress: 0, Resolved: 0 };

  if (ticket.status === "Pending") chartData[ticket.category].Pending += 1;
  if (ticket.status === "In-Progress") chartData[ticket.category].InProgress += 1;
  if (ticket.status === "Resolved") chartData[ticket.category].Resolved += 1;
});

const formattedData = Object.values(chartData);

export function MaintenanceTicketsChart() {
  return (
    <div className="w-full mb-6">
      <h3 className="text-lg font-semibold mb-2">Maintenance Tickets per Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Pending" fill="#facc15" name="Pending" />
          <Bar dataKey="InProgress" fill="#3b82f6" name="In-Progress" />
          <Bar dataKey="Resolved" fill="#22c55e" name="Resolved" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
