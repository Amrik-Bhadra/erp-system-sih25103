import { useEffect, useMemo } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import LibrarySidebar from "@/components/library/library-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const routeNameMap: Record<string, string> = {
  "/library": "Dashboard",
  "/library/manage-books": "Manage Books",
  "/library/issue-books": "Issue Books",
  "/library/return-books": "Return Books",
  "/library/fines": "Fines",
  "/library/notices": "Notices",
  "/library/reports": "Reports",
  "/library/settings": "Settings",
};

const LibraryLayout = () => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.map((_, index) => {
      const fullPath = "/" + paths.slice(0, index + 1).join("/");
      return { path: fullPath, label: routeNameMap[fullPath] || "Unknown" };
    });
  }, [location.pathname]);

  const currentRouteName = breadcrumbs[breadcrumbs.length - 1]?.label || "Library Dashboard";

  useEffect(() => {
    document.title = `${currentRouteName} | Library Portal`;
  }, [currentRouteName]);

  return (
    <SidebarProvider>
      <LibrarySidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b border-gray-200/50 bg-white px-4 dark:border-gray-800/50 dark:bg-gray-950">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-6 border border-gray-100/30 dark:border-gray-700/50" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={crumb.path}>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <>
                      <Link to={crumb.path} className="hover:underline">{crumb.label}</Link>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-2">
          <Outlet />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LibraryLayout;
