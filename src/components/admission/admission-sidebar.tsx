import * as React from "react";
import {
  LayoutDashboard,
  UserPlus,
  GraduationCap,
  Wallet,
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
import { TeamSwitcher } from "../admin/team-switcher";

// ✅ Sidebar configuration data for Admission Cell
const data = {
  user: {
    name: "Admission Officer",
    email: "admission@college.edu",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admission",
      icon: LayoutDashboard,
    },
    {
      title: "New Admissions",
      url: "/admission/new",
      icon: UserPlus,
    },
    {
      title: "Admissions",
      url: "/admission/admitted-list",
      icon: UserPlus,
    },
  ],
  teams: [
    {
      name: "Admission Cell",
      logo: UserPlus,
      plan: "Admin",
    },
    {
      name: "Examination",
      logo: GraduationCap,
      plan: "Linked",
    },
    {
      name: "Finance",
      logo: Wallet,
      plan: "Linked",
    },
  ],
};

const AdmissionSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* 🔹 Header: Team switcher */}
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
};

export default AdmissionSidebar;
