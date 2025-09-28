import * as React from "react";
import {
  LayoutDashboard,
  User,
  FileText,
  GraduationCap,
  BookOpen,
  BedDouble,
  Wallet,
  CalendarCheck,
  Bell,
  HelpCircle,
  FileBadge,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/hostel/nav-main";
import { NavUser } from "@/components/hostel/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// import { TeamSwitcher } from "../admin/team-switcher";
import Logo from '/erp.png';
import { Link } from "react-router-dom";

// ✅ Sidebar configuration data
const data = {
  user: {
    name: "Amrik Bhadra",
    email: "amrik.bhadra@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/student",
      icon: LayoutDashboard,
    },
    {
      title: "Personal Information",
      url: "/student/personal-info",
      icon: User,
    },
    {
      title: "Examination",
      url: "/student/examination",
      icon: GraduationCap,
    },
    {
      title: "Results",
      url: "/student/results",
      icon: FileText,
    },
    {
      title: "Library",
      url: "/student/library",
      icon: BookOpen,
    },
    {
      title: "Hostel",
      url: "/student/hostel",
      icon: BedDouble,
    },
    {
      title: "Fees & Finance",
      url: "/student/fees",
      icon: Wallet,
    },
    {
      title: "Attendance & Academics",
      url: "/student/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Notices & Announcements",
      url: "/student/notices",
      icon: Bell,
    },
    {
      title: "Grievance / Support",
      url: "/student/grievance",
      icon: HelpCircle,
    },
    {
      title: "Reports & Certificates",
      url: "/student/reports",
      icon: FileBadge,
    },
    {
      title: "Settings",
      url: "/student/settings",
      icon: Settings,
    },
  ],
  teams: [
    {
      name: "Student Council",
      logo: GraduationCap,
      plan: "Member",
    },
    {
      name: "Library",
      logo: BookOpen,
      plan: "Active",
    },
    {
      name: "Hostel",
      logo: BedDouble,
      plan: "Resident",
    },
  ],
};

function StudentSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* 🔹 Header: Team switcher */}
      <SidebarHeader>
        <Link to={'/'} className="flex items-center gap-2 border p-1">
          <div className="flex aspect-square items-center justify-center rounded-lg">
            <img src={Logo} className="w-10" />
          </div>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate text-lg font-semibold">EduManager</span>
            <span className="truncate text-sm text-[#ccc] font-medium">
              Student
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* 🔹 Main Navigation */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* 🔹 Footer: User profile */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      {/* 🔹 Sidebar Rail (for collapsed state) */}
      <SidebarRail />
    </Sidebar>
  );
}

export default StudentSidebar;
