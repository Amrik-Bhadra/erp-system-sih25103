import { useEffect, useMemo } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import StudentSidebar from "@/components/student/student-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// 🔹 Route-to-name mapping for breadcrumbs & page titles
const routeNameMap: Record<string, string> = {
  "/student": "Dashboard",
  "/student/personal-info": "Personal Information",
  "/student/examination": "Examination",
  "/student/results": "Results",
  "/student/library": "Library",
  "/student/hostel": "Hostel",
  "/student/fees": "Fees & Finance",
  "/student/attendance": "Attendance & Academics",
  "/student/notices": "Notices & Announcements",
  "/student/grievance": "Grievance / Support",
  "/student/reports": "Reports & Certificates",
  "/student/settings": "Settings / Account",
};

const StudentLayout = () => {
  const location = useLocation();

  // 🔹 Generate breadcrumb items dynamically from pathname
  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean); // ["student", "personal-info"]
    return paths.map((_, index) => {
      const fullPath = "/" + paths.slice(0, index + 1).join("/");
      return {
        path: fullPath,
        label: routeNameMap[fullPath] || "Unknown",
      };
    });
  }, [location.pathname]);

  // 🔹 Current route name = last breadcrumb
  const currentRouteName =
    breadcrumbs[breadcrumbs.length - 1]?.label || "Student Dashboard";

  // 🔹 Update browser tab title on route change
  useEffect(() => {
    document.title = `${currentRouteName} | Student Portal`;
  }, [currentRouteName]);

  return (
    <SidebarProvider>
      {/* 🔹 Left Sidebar */}
      <StudentSidebar />

      {/* 🔹 Main Content Area */}
      <SidebarInset>
        {/* Header with breadcrumbs */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200/50 bg-white px-4 dark:border-gray-800/50 dark:bg-gray-950 transition-[height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 h-6 border border-gray-100/30 dark:border-gray-700/50"
          />

          {/* Breadcrumb Navigation */}
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={crumb.path}>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <>
                      <Link to={crumb.path} className="hover:underline">
                        {crumb.label}
                      </Link>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Scrollable main content */}
        <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-2">
          <Outlet />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default StudentLayout;
