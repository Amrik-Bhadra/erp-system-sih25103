"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  Calendar,
  Ticket,
  FileText,
  ClipboardList,
  Calculator,
  Award,
  BarChart3,
  RefreshCw,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/examination"
  },
  {
    name: "Exam Scheduling",
    icon: Calendar,
    href: "/examination/scheduling"
  },
  {
    name: "Admit Card Management",
    icon: Ticket,
    href: "/examination/admit-cards"
  },
  {
    name: "Question Paper Management",
    icon: FileText,
    href: "/examination/question-papers"
  },
  {
    name: "Exam Conduction",
    icon: ClipboardList,
    href: "/examination/conduction"
  },
  {
    name: "Evaluation & Marks",
    icon: Calculator,
    href: "/examination/evaluation"
  },
  {
    name: "Result Processing",
    icon: Award,
    href: "/examination/results"
  },
  {
    name: "Reports & Analytics",
    icon: BarChart3,
    href: "/examination/reports"
  },
  {
    name: "Revaluation",
    icon: RefreshCw,
    href: "/examination/revaluation"
  },
  {
    name: "Notices & Communication",
    icon: Bell,
    href: "/examination/notices"
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/examination/settings"
  },
];

export function ExaminationSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Sidebar className="bg-white dark:bg-gray-950 border-r border-gray-200/50 dark:border-gray-800/50">
      <SidebarContent>
        {/* Brand Header */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200/50 dark:border-gray-800/50">
          <h1 className="text-xl font-bold text-red-600 dark:text-red-400">
            Examination Portal
          </h1>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href || 
                  (item.href !== '/examination' && location.pathname.startsWith(item.href));
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="cursor-pointer"
                    >
                      <div onClick={() => handleNavigation(item.href)}>
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Section */}
        <div className="mt-auto p-4 border-t border-gray-200/50 dark:border-gray-800/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="cursor-pointer text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <div onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  <span>Back to Main</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}