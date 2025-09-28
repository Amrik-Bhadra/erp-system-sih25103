import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";

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

import { Toaster } from "sonner";

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
import LandingPage from "./pages/LandingPage";

import AdmissionLayout from "./layouts/AdmissionLayout";
import AdmissionDashboard from "./pages/admission/AdmissionDashboard";
import NewAdmission from "./pages/admission/NewAdmission";
import AdmittedList from "./pages/admission/AdmittedList";
// import AdmissionLayout from "./layouts/AdmissionLayout";


// 🔹 Library imports
import {LibraryLayout} from "./layouts/LibraryLayout";
import {LibraryDashboard} from "./pages/library/dashboard";
import {BookManagement} from "./pages/library/book-management";
import {IssueReturn} from "./pages/library/issue-return";
import {StudentRecords} from "./pages/library/student-records";
import {FinesPayments} from "./pages/library/fines-payments";
import {Recommendations} from "./pages/library/recommendations";
import {Reports} from "./pages/library/reports";
import {Notices} from "./pages/library/notices";
import {Settings} from "./pages/library/settings";

const App = () => {
  // Hostel Routes
  const hostelRoutes = [
    {
      path: "/hostel",
      element: <HostelLayout />,
      name: "Hostel Dashboard",
      children: [
        { index: true, element: <HostelDasboard />, name: "Dashboard" },
        { path: "hostels", element: <HostelList />, name: "Hostels" },
        {
          path: "student-application",
          element: <HostelApplication />,
          name: "Student Application",
        },
        {
          path: "room-allocation",
          element: <HostelRoomAllocation />,
          name: "Room Allocation",
        },
        { path: "maintenance", element: <HostelMaintenance />, name: "Maintenance" },
        { path: "notifications", element: <HostelNotifications />, name: "Notifications" },
        { path: "reports", element: <HostelReports />, name: "Reports" },
        { path: "settings", element: <HostelSettings />, name: "Settings" },
        { path: "clearance", element: <HostelClearance />, name: "Clearance" },
      ],
    },
  ];

  // 🔹 Student Routes
  const studentRoutes = [
    {
      path: "/student",
      element: <StudentLayout />,
      name: "Student Dashboard",
      children: [
        { index: true, element: <StudentDashboard />, name: "Dashboard" },
        { path: "personal-info", element: <StudentProfile />, name: "Personal Information" },
        { path: "examination", element: <StudentExamination />, name: "Examination" },
        { path: "results", element: <StudentResults />, name: "Results" },
        { path: "library", element: <StudentLibrary />, name: "Library" },
        { path: "hostel", element: <StudentHostel />, name: "Hostel" },
        { path: "finance", element: <StudentFinance />, name: "Fees & Finance" },
        { path: "attendance", element: <StudentAttendance />, name: "Attendance & Academics" },
        { path: "notices", element: <StudentNotices />, name: "Notices & Announcements" },
        { path: "grievance", element: <StudentGrievance />, name: "Grievance / Support" },
        { path: "certificates", element: <StudentCertificates />, name: "Reports & Certificates" },
        { path: "settings", element: <StudentSettings />, name: "Settings" },
      ],
    },
  ];

  // 🔹 Library Routes
  const libraryRoutes = [
    {
      path: "/library",
      element: <LibraryLayout />,
      name: "Library Management",
      children: [
        { index: true, element: <LibraryDashboard />, name: "Dashboard" },
        { path: "book-management", element: <BookManagement />, name: "Book Management" },
        { path: "issue-return", element: <IssueReturn />, name: "Issue & Return" },
        { path: "student-records", element: <StudentRecords />, name: "Student Records" },
        { path: "fines-payments", element: <FinesPayments />, name: "Fines & Payments" },
        { path: "recommendations", element: <Recommendations />, name: "Recommendations" },
        { path: "reports", element: <Reports />, name: "Reports & Analytics" },
        { path: "notices", element: <Notices />, name: "Notices & Announcements" },
        { path: "settings", element: <Settings />, name: "Settings" },
      ],
    },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        
        {/* 🔹 Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
        </Route>

        {/* 🔹 Admin Routes */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="new-admission" element={<NewAdmission />} />
        </Route> */}

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

        <Route path="/admission" element={<AdmissionLayout/>}>
          <Route index element={<AdmissionDashboard/>} />
          <Route path="new" element={<NewAdmission/>} />
          <Route path="admitted-list" element={<AdmittedList/>} />
        </Route>

        {/* 🔹 Library Routes */}
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