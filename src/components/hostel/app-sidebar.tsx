import * as React from "react";
import {
  LayoutDashboard,
  Command,
  GalleryVerticalEnd,
  AudioWaveform,
  FileUser,
  BedDouble,
  DoorOpen,
  Settings,
  Wrench,
  File,
  Bell,
  Building,
} from "lucide-react";

// import { NavDocuments } from "@/components/hostel/nav-documents";
import { NavMain } from "@/components/hostel/nav-main";
// import { NavSecondary } from "@/components/hostel/nav-secondary";
import { NavUser } from "@/components/hostel/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "../admin/team-switcher";

const data = {
  user: {
    name: "Amrik Bhadra",
    email: "amrik.bhadra@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/hostel",
      icon: LayoutDashboard,
    },
    {
      title: "Hostels",
      url: "/hostel/hostels",
      icon: Building,
    },
    {
      title: "Student Application",
      url: "/hostel/student-application",
      icon: FileUser,
    },
    {
      title: "Room Allocation",
      url: "/hostel/room-allocation",
      icon: BedDouble,
    },
    {
      title: "Maintenance & Complaints",
      url: "/hostel/maintenance",
      icon: Wrench,
    },
    {
      title: "Clearance",
      url: "/hostel/clearance",
      icon: DoorOpen,
    },
    {
      title: "Reports",
      url: "/hostel/reports",
      icon: File,
    },
    {
      title: "Settings",
      url: "/hostel/settings",
      icon: Settings,
    },
    {
      title: "Notifications",
      url: "/hostel/notifications",
      icon: Bell,
    },
  ],
  teams: [
    {
      name: "Admission Team",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Hostel Team",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Finance Team",
      logo: Command,
      plan: "Free",
    },
  ],
};

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
