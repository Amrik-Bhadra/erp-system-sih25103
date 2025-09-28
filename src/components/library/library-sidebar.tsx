import * as React from "react";
import {
  LayoutDashboard,
  Book,
  BookOpen,
  Users,
  CreditCard,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  Library,
  BookMarked,
  UserCheck,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";

// Sidebar configuration data for Library
const data = {
  user: {
    name: "Library Admin",
    email: "library.admin@college.edu",
    avatar: "/avatars/library.jpg",
    role: "Head Librarian",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/library",
      icon: LayoutDashboard,
    },
    {
      title: "Book Management",
      url: "/library/book-management",
      icon: Book,
    },
    {
      title: "Issue & Return",
      url: "/library/issue-return",
      icon: BookOpen,
    },
    {
      title: "Student Records",
      url: "/library/student-records",
      icon: Users,
    },
    {
      title: "Fines & Payments",
      url: "/library/fines-payments",
      icon: CreditCard,
    },
    {
      title: "Recommendations",
      url: "/library/recommendations",
      icon: Calendar,
    },
    {
      title: "Reports & Analytics",
      url: "/library/reports",
      icon: BarChart3,
    },
    {
      title: "Notices & Announcements",
      url: "/library/notices",
      icon: Bell,
    },
    {
      title: "Settings",
      url: "/library/settings",
      icon: Settings,
    },
  ],
  teams: [
    {
      name: "Main Library",
      logo: Library,
      plan: "Active",
    },
    {
      name: "Digital Library",
      logo: BookMarked,
      plan: "Online",
    },
    {
      name: "Reference Section",
      logo: UserCheck,
      plan: "Staff Only",
    },
  ],
};

export function LibrarySidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* Header: Team switcher */}
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer: User profile */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      {/* Sidebar Rail (for collapsed state) */}
      <SidebarRail />
    </Sidebar>
  );
}

export default LibrarySidebar;