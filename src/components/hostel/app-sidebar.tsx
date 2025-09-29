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
// import { TeamSwitcher } from "../admin/team-switcher";
import Logo from "/erp.png";
import { Link } from "react-router-dom";

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
        <Link to={'/'} className="flex items-center gap-2 border p-1">
          <div className="flex aspect-square items-center justify-center rounded-lg">
            <img src={Logo} className="w-10"/>
          </div>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate text-lg font-semibold">EduManager</span>
            <span className="truncate text-sm text-[#ccc] font-medium">Hostel</span>
          </div>
        </Link>
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
