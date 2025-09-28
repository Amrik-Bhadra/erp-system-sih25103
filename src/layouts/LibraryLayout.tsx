// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { 
//   Book, 
//   Users, 
//   CreditCard, 
//   BarChart3, 
//   Bell, 
//   Settings, 
//   Home,
//   BookOpen,
//   Calendar,
//   LogOut
// } from "lucide-react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";

// interface LibraryLayoutProps {
//   children?: React.ReactNode;
// }

// const menuItems = [
//   { name: "Dashboard", icon: Home, href: "/library" },
//   { name: "Book Management", icon: Book, href: "/library/book-management" },
//   { name: "Issue & Return", icon: BookOpen, href: "/library/issue-return" },
//   { name: "Student Records", icon: Users, href: "/library/student-records" },
//   { name: "Fines & Payments", icon: CreditCard, href: "/library/fines-payments" },
//   { name: "Recommendations", icon: Calendar, href: "/library/recommendations" },
//   { name: "Reports & Analytics", icon: BarChart3, href: "/library/reports" },
//   { name: "Notices & Announcements", icon: Bell, href: "/library/notices" },
//   { name: "Settings", icon: Settings, href: "/library/settings" },
// ];

// export function LibraryLayout({ children }: LibraryLayoutProps) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeSection, setActiveSection] = useState(location.pathname);

//   const handleNavigation = (href: string) => {
//     setActiveSection(href);
//     navigate(href);
//   };

//   const handleLogout = () => {
//     navigate('/');
//   };

//   const getActiveSectionName = () => {
//     const currentItem = menuItems.find(item => item.href === activeSection);
//     return currentItem ? currentItem.name.replace('-', ' ') : 'Dashboard';
//   };

//   return (
//     <div className="flex h-screen bg-gray-50/40">
//       {/* Sidebar */}
//       <div className="hidden w-64 bg-white border-r border-gray-200 md:flex md:flex-col md:fixed md:inset-y-0">
//         <div className="flex flex-col flex-1 min-h-0">
//           <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-blue-600">
//             <h1 className="text-xl font-bold text-white">Library Portal</h1>
//           </div>
//           <div className="flex flex-col flex-1 overflow-y-auto">
//             <nav className="flex-1 px-4 py-4 space-y-2">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = activeSection === item.href;
//                 return (
//                   <Button
//                     key={item.name}
//                     variant={isActive ? "secondary" : "ghost"}
//                     className="w-full justify-start"
//                     onClick={() => handleNavigation(item.href)}
//                   >
//                     <Icon className="w-4 h-4 mr-3" />
//                     {item.name}
//                   </Button>
//                 );
//               })}
//             </nav>
//             <div className="p-4 border-t">
//               <Button 
//                 variant="outline" 
//                 className="w-full justify-start"
//                 onClick={handleLogout}
//               >
//                 <LogOut className="w-4 h-4 mr-3" />
//                 Back to Main
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex flex-col flex-1 md:pl-64">
//         <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
//           <div className="flex items-center">
//             <h2 className="text-lg font-semibold text-gray-800 capitalize">
//               {getActiveSectionName()}
//             </h2>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" size="sm">
//               <Bell className="w-4 h-4 mr-2" />
//               Notifications
//             </Button>
//             <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//               <span className="text-white text-sm font-medium">L</span>
//             </div>
//           </div>
//         </header>
//         <main className="flex-1 overflow-auto">
//           {/* This is the key fix - Use Outlet for nested routes */}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default LibraryLayout;

"use client";

import { useNavigate, useLocation, Outlet } from "react-router-dom";
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
  const navigate = useNavigate();

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