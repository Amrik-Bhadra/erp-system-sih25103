// src/App.tsx
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// 🔹 Auth imports
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";

// 🔹 Hostel imports
import HostelLayout from "./layouts/HostelLayout";
import HostelDasboard from "./pages/hostel/HostelDasboard";
import HostelApplication from "./pages/hostel/HostelApplication";
import HostelRoomAllocation from "./pages/hostel/HostelRoomAllocation";
import HostelMaintenance from "./pages/hostel/HostelMaintenance";
import HostelNotifications from "./pages/hostel/HostelNotifications";
import HostelReports from "./pages/hostel/HostelReports";
import HostelSettings from "./pages/hostel/HostelSettings";
import HostelClearance from "./pages/hostel/HostelClearance";
import HostelList from "./pages/hostel/HostelList";

// 🔹 Student imports
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentProfile from "@/pages/student/StudentProfile";
import StudentExamination from "@/pages/student/StudentExamination";
import StudentResults from "@/pages/student/StudentResults";
import StudentLibrary from "@/pages/student/StudentLibrary";
import StudentHostel from "@/pages/student/StudentHostel";
import StudentFinance from "@/pages/student/StudentFinance";
import StudentAttendance from "@/pages/student/StudentAttendance";
import StudentNotices from "@/pages/student/StudentNotices";
import StudentGrievance from "@/pages/student/StudentGrievance";
import StudentCertificates from "@/pages/student/StudentCertificates";
import StudentSettings from "@/pages/student/StudentSettings";

// 🔹 Library (Librarian) imports
import LibraryLayout from "@/layouts/LibraryLayout";
import LibraryDashboard from "@/pages/library/LibraryDashboard";
import ManageBooks from "@/pages/library/ManageBooks";
import IssueBooks from "@/pages/library/IssueBooks";
import ReturnBooks from "@/pages/library/ReturnBooks";
import Fines from "@/pages/library/Fines";
import LibraryNotices from "@/pages/library/LibraryNotices";
import LibraryReports from "@/pages/library/LibraryReports";
import LibrarySettings from "@/pages/library/LibrarySettings";

// 🔹 Landing Page
import LandingPage from "./pages/LandingPage";

const App = () => {
  // 🔹 Hostel Routes
  const hostelRoutes = [
    {
      path: "/hostel",
      element: <HostelLayout />,
      children: [
        { index: true, element: <HostelDasboard /> },
        { path: "hostels", element: <HostelList /> },
        { path: "student-application", element: <HostelApplication /> },
        { path: "room-allocation", element: <HostelRoomAllocation /> },
        { path: "maintenance", element: <HostelMaintenance /> },
        { path: "notifications", element: <HostelNotifications /> },
        { path: "reports", element: <HostelReports /> },
        { path: "settings", element: <HostelSettings /> },
        { path: "clearance", element: <HostelClearance /> },
      ],
    },
  ];

  // 🔹 Student Routes
  const studentRoutes = [
    {
      path: "/student",
      element: <StudentLayout />,
      children: [
        { index: true, element: <StudentDashboard /> },
        { path: "personal-info", element: <StudentProfile /> },
        { path: "examination", element: <StudentExamination /> },
        { path: "results", element: <StudentResults /> },
        { path: "library", element: <StudentLibrary /> },
        { path: "hostel", element: <StudentHostel /> },
        { path: "finance", element: <StudentFinance /> },
        { path: "attendance", element: <StudentAttendance /> },
        { path: "notices", element: <StudentNotices /> },
        { path: "grievance", element: <StudentGrievance /> },
        { path: "certificates", element: <StudentCertificates /> },
        { path: "settings", element: <StudentSettings /> },
      ],
    },
  ];

  // 🔹 Library (Librarian) Routes
  const libraryRoutes = [
    {
      path: "/library",
      element: <LibraryLayout />,
      children: [
        { index: true, element: <LibraryDashboard /> },
        { path: "manage-books", element: <ManageBooks /> },
        { path: "issue-books", element: <IssueBooks /> },
        { path: "return-books", element: <ReturnBooks /> },
        { path: "fines", element: <Fines /> },
        { path: "notices", element: <LibraryNotices /> },
        { path: "reports", element: <LibraryReports /> },
        { path: "settings", element: <LibrarySettings /> },
      ],
    },
  ];

  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 🔹 Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
        </Route>

        {/* 🔹 Hostel Routes */}
        {hostelRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child) => (
              <Route
                key={child.path || "index"}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}

        {/* 🔹 Student Routes */}
        {studentRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child) => (
              <Route
                key={child.path || "index"}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}

        {/* 🔹 Library (Librarian) Routes */}
        {libraryRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child) => (
              <Route
                key={child.path || "index"}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
