import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface SectionCardsProps {
  stats: {
    totalHostels: number;
    totalRooms: number;
    pendingApplications: number;
    pendingComplaints: number;
    pendingExits: number;
  };
}

export function SectionCards({ stats }: SectionCardsProps) {
  const navigate = useNavigate();

  const cards = [
    { label: "Total Hostels", value: stats.totalHostels, path: "/hostels" },
    { label: "Total Rooms", value: stats.totalRooms, path: "/rooms" },
    { label: "Pending Applications", value: stats.pendingApplications, path: "/applications" },
    { label: "Complaints Pending", value: stats.pendingComplaints, path: "/complaints" },
    { label: "Exit Requests Pending", value: stats.pendingExits, path: "/exit-requests" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-3">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate(card.path)}
        >
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold">{card.value}</CardTitle>
          </CardHeader>
          <CardFooter className="text-muted-foreground text-sm">
            Click to view details
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
