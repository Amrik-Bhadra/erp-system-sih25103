import {  useLocation, Outlet } from "react-router-dom";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

export function LibraryLayout() {
  const location = useLocation();
  // const navigate = useNavigate();

  const getActiveSectionName = () => {
    const path = location.pathname;
    if (path === '/library') return 'Dashboard';
    if (path.includes('book-management')) return 'Book Management';
    if (path.includes('issue-return')) return 'Issue & Return';
    if (path.includes('student-records')) return 'Student Records';
    if (path.includes('fines-payments')) return 'Fines & Payments';
    if (path.includes('recommendations')) return 'Recommendations';
    if (path.includes('reports')) return 'Reports & Analytics';
    if (path.includes('notices')) return 'Notices & Announcements';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <SidebarProvider>
      <LibrarySidebar />
      <SidebarInset>
        {/* Header matching Student portal exactly */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200/50 bg-white px-4 dark:border-gray-800/50 dark:bg-gray-950 transition-[height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 h-6 border border-gray-100/30 dark:border-gray-700/50"
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">
              {getActiveSectionName()}
            </h2>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">LA</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default LibraryLayout;