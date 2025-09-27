import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Occupancy {
  hostel: string;
  roomType: string;
  totalRooms: number;
  occupied: number;
  available: number;
}

// Example data
const data: Occupancy[] = [
  { hostel: "Arya Hostel", roomType: "Single", totalRooms: 50, occupied: 45, available: 5 },
  { hostel: "Bharat Hostel", roomType: "Double", totalRooms: 40, occupied: 30, available: 10 },
  { hostel: "Chandra Hostel", roomType: "Single", totalRooms: 60, occupied: 55, available: 5 },
];

export function HostelOccupancyChart() {
  return (
    <div className="w-full mb-6">
      <h3 className="text-lg font-semibold mb-2">Occupancy Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hostel" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="occupied" fill="#4f46e5" name="Occupied Rooms" />
          <Bar dataKey="available" fill="#10b981" name="Available Rooms" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
