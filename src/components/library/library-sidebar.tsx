import { Link, useLocation } from "react-router-dom";

const LibrarySidebar = () => {
  const location = useLocation();
  const links = [
    { path: "/library", label: "Dashboard" },
    { path: "/library/manage-books", label: "Manage Books" },
    { path: "/library/issue-books", label: "Issue Books" },
    { path: "/library/return-books", label: "Return Books" },
    { path: "/library/fines", label: "Fines" },
    { path: "/library/notices", label: "Notices" },
    { path: "/library/reports", label: "Reports" },
    { path: "/library/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Library Portal</h2>
      <ul className="flex flex-col gap-2">
        {links.map(link => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block p-2 rounded ${
                location.pathname === link.path ? "bg-blue-600 text-white" : "hover:bg-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LibrarySidebar;
