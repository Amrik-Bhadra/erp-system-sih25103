import { useLocation, Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Utility for conditional class names

// Sidebar links for Library section
const libraryLinks = [
  { path: "/student/library", label: "Library Home" },
  { path: "/student/library/search", label: "Search Books" },
  { path: "/student/library/issued", label: "Issued Books" },
  { path: "/student/library/return", label: "Return Books" },
  { path: "/student/library/fines", label: "Fines" },
  { path: "/student/library/notices", label: "Library Notices" },
];

const LibrarySidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <ScrollArea className="h-screen px-3 py-4">
        <nav className="flex flex-col space-y-1">
          {libraryLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === link.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-200"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default LibrarySidebar;
