import * as React from "react";
import {
  AudioWaveform,
  BedDouble,
  UserRoundPlus,
  Banknote,
  Command,
  GalleryVerticalEnd,
  Settings2,
  BookOpen,
} from "lucide-react";

import { NavMain } from "@/components/admin/nav-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/admin/nav-user";
// import { TeamSwitcher } from "@/components/admin/team-switcher";
import Logo from '/erp.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// This is sample data.
const data = {
  user: {
    name: "Amrik Bhadra",
    email: "amrik.bhadra@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  navMain: [
    {
      title: "Admission",
      url: "#",
      icon: UserRoundPlus,
      isActive: false,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Branch",
          url: "#",
        },
        {
          title: "Admission List",
          url: "#",
        },
      ],
    },
    {
      title: "Fee",
      url: "#",
      icon: Banknote,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Hostel",
      url: "#",
      icon: BedDouble,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Hostel List",
          url: "#",
        },
      ],
    },
    {
      title: "Library",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to={'/'} className="flex items-center gap-2 border p-1">
          <div className="flex aspect-square items-center justify-center rounded-lg">
            <img src={Logo} className="w-10" />
          </div>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate text-lg font-semibold">EduManager</span>
            <span className="truncate text-sm text-[#ccc] font-medium">
              Admin
            </span>
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
};

export default AppSidebar;
