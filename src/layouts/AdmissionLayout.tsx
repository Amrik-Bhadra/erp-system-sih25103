import { useEffect, useMemo } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import AdmissionSidebar from "@/components/admission/admission-sidebar";
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
  "/admission": "Dashboard",
  "/admission/new": "New Admissions",
  "/admission/students": "Student Records",
  "/admission/forms": "Admission Forms",
  "/admission/exams": "Examinations Data",
  "/admission/library": "Library Access",
  "/admission/fees": "Fee & Finance",
  "/admission/reports": "Reports & Certificates",
  "/admission/logs": "Audit & Logs",
  "/admission/settings": "Settings / Account",
};

const AdmissionLayout = () => {
  const location = useLocation();

  // 🔹 Generate breadcrumb items dynamically from pathname
  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean); // ["admission", "forms"]
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
    breadcrumbs[breadcrumbs.length - 1]?.label || "Admission Dashboard";

  // 🔹 Update browser tab title on route change
  useEffect(() => {
    document.title = `${currentRouteName} | Admission Cell`;
  }, [currentRouteName]);

  return (
    <SidebarProvider>
      {/* 🔹 Left Sidebar */}
      <AdmissionSidebar />

      {/* 🔹 Main Content Area */}
      <SidebarInset>
        {/* Header with breadcrumbs */}
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-transparent transition-[height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 border border-gray-100/30"
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

export default AdmissionLayout;
