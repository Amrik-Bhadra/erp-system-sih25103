import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Home, FileText, AlertCircle, LogOut } from "lucide-react";

interface SectionCardsProps {
  stats: {
    totalStudents: number;
    totalHostels: number;
    pendingApplications: number;
    pendingComplaints: number;
    pendingExits: number;
  };
}

export function AdmissionSectionCards({ stats }: SectionCardsProps) {
  const navigate = useNavigate();

  const cards = [
    { label: "Total Students", value: stats.totalStudents, path: "/students", icon: Users },
    { label: "Total Hostels", value: stats.totalHostels, path: "/hostels", icon: Home },
    { label: "Pending Applications", value: stats.pendingApplications, path: "/applications", icon: FileText },
    { label: "Complaints Pending", value: stats.pendingComplaints, path: "/complaints", icon: AlertCircle },
    { label: "Exit Requests Pending", value: stats.pendingExits, path: "/exit-requests", icon: LogOut },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.label}
            className="cursor-pointer hover:shadow-lg transition border border-gray-200/20 rounded-lg"
            onClick={() => navigate(card.path)}
          >
            <CardHeader className="flex items-center gap-3">
              {/* Icon with border */}
              <div className="p-3 border bg-white/20  rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 " />
              </div>
              <div>
                <CardDescription className="text-sm text-gray-400">{card.label}</CardDescription>
                <CardTitle className="text-2xl font-semibold text-white">{card.value}</CardTitle>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
