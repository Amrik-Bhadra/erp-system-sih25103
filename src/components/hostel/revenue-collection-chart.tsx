import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// ----- Dummy Data -----
interface Revenue {
  hostel: string;
  month: string;
  roomRent: number;
  fineCollection: number;
  total: number;
}

const data: Revenue[] = [
  { hostel: "Arya Hostel", month: "Jan 2025", roomRent: 50000, fineCollection: 2000, total: 52000 },
  { hostel: "Bharat Hostel", month: "Jan 2025", roomRent: 40000, fineCollection: 1500, total: 41500 },
  { hostel: "Chandra Hostel", month: "Jan 2025", roomRent: 60000, fineCollection: 3000, total: 63000 },
];

// ----- Component -----
export function RevenueCollectionChart() {
  return (
    <div className="w-full mb-6">
      <h3 className="text-lg font-semibold mb-2">Revenue Collection per Hostel</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hostel" />
          <YAxis />
          <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="roomRent" fill="#3b82f6" name="Room Rent" />
          <Bar dataKey="fineCollection" fill="#facc15" name="Fine Collection" />
          <Bar dataKey="total" fill="#22c55e" name="Total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
