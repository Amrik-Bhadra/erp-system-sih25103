"use client";

import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { ExaminationSidebar } from "@/components/examination/examination-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

export function ExaminationLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveSectionName = () => {
    const path = location.pathname;
    if (path === '/examination') return 'Dashboard';
    if (path.includes('scheduling')) return 'Exam Scheduling';
    if (path.includes('admit-cards')) return 'Admit Card Management';
    if (path.includes('question-papers')) return 'Question Paper Management';
    if (path.includes('conduction')) return 'Exam Conduction';
    if (path.includes('evaluation')) return 'Evaluation & Marks';
    if (path.includes('results')) return 'Result Processing';
    if (path.includes('reports')) return 'Reports & Analytics';
    if (path.includes('revaluation')) return 'Revaluation';
    if (path.includes('notices')) return 'Notices & Communication';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <SidebarProvider>
      <ExaminationSidebar />
      <SidebarInset>
        {/* Header matching other portals exactly */}
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
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">EX</span>
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

export default ExaminationLayout;