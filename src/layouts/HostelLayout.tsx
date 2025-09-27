import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "@/components/hostel/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// 🔹 Map paths to names for breadcrumbs and page title
const routeNameMap: Record<string, string> = {
  "/hostel": "Dashboard",
  "/hostel/hostels": "Hostels",
  "/hostel/student-application": "Student Application",
  "/hostel/room-allocation": "Room Allocation",
  "/hostel/maintenance": "Maintenance",
  "/hostel/notifications": "Notifications",
  "/hostel/reports": "Reports",
  "/hostel/settings": "Settings",
  "/hostel/clearance": "Clearance",
};

const HostelLayout = () => {
  const location = useLocation();

  // Get the current route name from the map
  const currentRouteName =
    routeNameMap[location.pathname] || "Hostel Dashboard";

  // Update browser title whenever route changes
  useEffect(() => {
    document.title = `${currentRouteName} | My Hostel App`;
  }, [currentRouteName]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 border border-gray-100/30"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentRouteName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <ScrollArea className="px-4 py-2">
          <Outlet />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default HostelLayout;
