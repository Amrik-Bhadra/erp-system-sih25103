// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { 
//   Book, 
//   Home, 
//   Users, 
//   School, 
//   UserCheck, 
//   Shield, 
//   Zap, 
//   Clock, 
//   BookOpen,
//   GraduationCap,
//   Library,
//   Building
// } from "lucide-react";

// const LandingPage = () => {
//     const navigate = useNavigate();
    
//     return (
//         <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 space-y-12 p-6 relative overflow-hidden">
//             {/* Enhanced Animated Background */}
//             <div className="absolute inset-0 overflow-hidden">
//                 {/* Animated gradient orbs */}
//                 <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
//                 <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
//                 <div className="absolute bottom-40 left-20 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
//                 <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-400/7 rounded-full blur-3xl animate-pulse delay-1500"></div>
                
//                 {/* Floating academic icons with trails */}
//                 <div className="absolute top-1/4 left-1/6 animate-float-slow">
//                     <div className="relative">
//                         <GraduationCap className="w-10 h-10 text-blue-500/60" />
//                         <div className="absolute inset-0 w-10 h-10 bg-blue-500/20 rounded-full blur-sm animate-ping"></div>
//                     </div>
//                 </div>
//                 <div className="absolute top-1/3 right-1/5 animate-float-medium delay-1000">
//                     <div className="relative">
//                         <Library className="w-8 h-8 text-purple-500/60" />
//                         <div className="absolute inset-0 w-8 h-8 bg-purple-500/20 rounded-full blur-sm animate-ping"></div>
//                     </div>
//                 </div>
//                 <div className="absolute bottom-1/3 left-1/4 animate-float-fast delay-500">
//                     <div className="relative">
//                         <Building className="w-12 h-12 text-green-500/60" />
//                         <div className="absolute inset-0 w-12 h-12 bg-green-500/20 rounded-full blur-sm animate-ping"></div>
//                     </div>
//                 </div>
//                 <div className="absolute bottom-1/4 right-1/6 animate-float-slow delay-1500">
//                     <div className="relative">
//                         <Users className="w-9 h-9 text-orange-500/60" />
//                         <div className="absolute inset-0 w-9 h-9 bg-orange-500/20 rounded-full blur-sm animate-ping"></div>
//                     </div>
//                 </div>

//                 {/* Animated grid pattern */}
//                 <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"></div>
//             </div>

//             {/* Enhanced Header Section */}
//             <div className="text-center space-y-6 relative z-10 max-w-4xl">
//                 <div className="space-y-4">
//                     <h1 className="text-5xl md:text-6xl font-bold dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                         EduManage Pro
//                     </h1>
//                     <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
//                         Comprehensive College ERP Solution
//                     </p>
//                 </div>
                
//                 {/* ERP Key Highlights */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
//                     <div className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
//                         <Shield className="w-8 h-8 text-green-500 mb-2" />
//                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Secure</span>
//                     </div>
//                     <div className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
//                         <Zap className="w-8 h-8 text-blue-500 mb-2" />
//                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Efficient</span>
//                     </div>
//                     <div className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
//                         <Clock className="w-8 h-8 text-purple-500 mb-2" />
//                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">24/7 Access</span>
//                     </div>
//                     <div className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
//                         <BookOpen className="w-8 h-8 text-orange-500 mb-2" />
//                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Integrated</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Portal Cards Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full relative z-10 px-4">
                
                

//                 {/* Student Portal Card */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
//                     <div className="flex flex-col items-center text-center space-y-4">
//                         <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
//                             <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                             Student Portal
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                             Access academic records, library resources, hostel information, and more
//                         </p>
//                         <Button
//                             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
//                             onClick={() => navigate('/student')}
//                         >
//                             Enter Portal
//                         </Button>
//                     </div>
//                 </div>

//                 {/* Examination Portal Card */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
//                     <div className="flex flex-col items-center text-center space-y-4">
//                         <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
//                             <BookOpen className="w-8 h-8 text-red-600 dark:text-red-400" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                             Examination Portal
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                             Manage exams, schedules, results, and evaluation processes
//                         </p>
//                         <Button
//                             className="w-full bg-red-600 hover:bg-red-700 text-white"
//                             onClick={() => navigate('/examination')}
//                         >
//                             Enter Portal
//                         </Button>
//                     </div>
//                 </div>

//                 {/* Hostel Portal Card */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
//                     <div className="flex flex-col items-center text-center space-y-4">
//                         <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
//                             <Home className="w-8 h-8 text-green-600 dark:text-green-400" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                             Hostel Portal
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                             Manage hostel applications, room allocations, maintenance, and clearances
//                         </p>
//                         <Button
//                             className="w-full bg-green-600 hover:bg-green-700 text-white"
//                             onClick={() => navigate('/hostel')}
//                         >
//                             Enter Portal
//                         </Button>
//                     </div>
//                 </div>

//                 {/* Library Portal Card */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
//                     <div className="flex flex-col items-center text-center space-y-4">
//                         <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
//                             <Book className="w-8 h-8 text-purple-600 dark:text-purple-400" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                             Library Portal
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                             Manage books, track borrowings, handle fines, and process recommendations
//                         </p>
//                         <Button
//                             className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//                             onClick={() => navigate('/library')}
//                         >
//                             Enter Portal
//                         </Button>
//                     </div>
//                 </div>

//                 {/* Admission Portal Card */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
//                     <div className="flex flex-col items-center text-center space-y-4">
//                         <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
//                             <UserCheck className="w-8 h-8 text-orange-600 dark:text-orange-400" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                             Admission Portal
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                             Manage applications, merit lists, counseling, and student admissions
//                         </p>
//                         <Button
//                             className="w-full bg-orange-600 hover:bg-orange-700 text-white"
//                             onClick={() => navigate('/admission')}
//                         >
//                             Enter Portal
//                         </Button>
//                     </div>
//                 </div>

               

                
//             </div>
            
//             {/* Showcase Statement */}
//          <div className="max-w-3xl w-full relative z-10 text-center">
//                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
//                    <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
//                        "This comprehensive ERP solution demonstrates our implementation of role-based access control, 
//                        ensuring secure and efficient management of college operations through dedicated portals for 
//                        students, hostel administration, library services, and system administrators."
//                    </p>
//                </div>
//            </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full px-4 relative z-10">
                
//             </div>

//             {/* Footer */}
//             <div className="text-center text-gray-500 dark:text-gray-400 text-sm relative z-10">
//                 <p>© 2024 EduManage Pro - College ERP System</p>
//             </div>

//             {/* Enhanced Custom Animations */}
//             <style>{`
//                 @keyframes float-slow {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-25px) rotate(5deg); }
//                 }
//                 @keyframes float-medium {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-20px) rotate(-3deg); }
//                 }
//                 @keyframes float-fast {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-15px) rotate(2deg); }
//                 }
//                 .animate-float-slow {
//                     animation: float-slow 8s ease-in-out infinite;
//                 }
//                 .animate-float-medium {
//                     animation: float-medium 6s ease-in-out infinite;
//                 }
//                 .animate-float-fast {
//                     animation: float-fast 4s ease-in-out infinite;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default LandingPage;

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Book, 
  Home, 
  Users, 
  UserCheck, 
  Shield, 
  Zap, 
  Clock, 
  BookOpen,
  GraduationCap,
  Library,
  Building
} from "lucide-react";

const LandingPage = () => {
    const navigate = useNavigate();
    
    // Updated portal cards array (removed Finance, Academic, and Faculty)
    const portalCards = [
      {
        name: "Student Portal",
        description: "Access academic records, library resources, hostel information, and more",
        icon: Users,
        color: "bg-indigo-100 dark:bg-indigo-900",
        buttonColor: "bg-indigo-600 hover:bg-indigo-700 text-white",
        path: "/student"
      },
      {
        name: "Examination Portal",
        description: "Manage exams, schedules, results, and evaluation processes",
        icon: BookOpen,
        color: "bg-red-100 dark:bg-red-900",
        buttonColor: "bg-red-600 hover:bg-red-700 text-white",
        path: "/examination"
      },
      {
        name: "Hostel Portal",
        description: "Manage hostel applications, room allocations, maintenance, and clearances",
        icon: Home,
        color: "bg-green-100 dark:bg-green-900",
        buttonColor: "bg-green-600 hover:bg-green-700 text-white",
        path: "/hostel"
      },
      {
        name: "Library Portal",
        description: "Manage books, track borrowings, handle fines, and process recommendations",
        icon: Book,
        color: "bg-purple-100 dark:bg-purple-900",
        buttonColor: "bg-purple-600 hover:bg-purple-700 text-white",
        path: "/library"
      },
      {
        name: "Admission Portal",
        description: "Manage applications, merit lists, counseling, and student admissions",
        icon: UserCheck,
        color: "bg-orange-100 dark:bg-orange-900",
        buttonColor: "bg-orange-600 hover:bg-orange-700 text-white",
        path: "/admission"
      }
    ];
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 space-y-12 p-6 relative overflow-hidden">
            {/* Enhanced Animated Background - Fixed z-index */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {/* Animated gradient orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse animate-float-orb-1"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/8 rounded-full blur-3xl animate-pulse animate-float-orb-2"></div>
                <div className="absolute bottom-40 left-20 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse animate-float-orb-3"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-400/7 rounded-full blur-3xl animate-pulse animate-float-orb-4"></div>
                
                {/* Floating academic icons with enhanced animations - Positioned to avoid cards */}
                <div className="absolute top-1/4 left-[5%] animate-float-slow">
                    <div className="relative">
                        <GraduationCap className="w-10 h-10 text-blue-500/60 animate-bounce" />
                        <div className="absolute inset-0 w-10 h-10 bg-blue-500/20 rounded-full blur-sm animate-ping"></div>
                    </div>
                </div>
                <div className="absolute top-1/3 right-[15%] animate-float-medium delay-1000">
                    <div className="relative">
                        <Library className="w-8 h-8 text-purple-500/60 animate-pulse" />
                        <div className="absolute inset-0 w-8 h-8 bg-purple-500/20 rounded-full blur-sm animate-pulse"></div>
                    </div>
                </div>
                <div className="absolute bottom-1/3 left-[10%] animate-float-fast delay-500">
                    <div className="relative">
                        <Building className="w-12 h-12 text-green-500/60 animate-spin-slow" />
                        <div className="absolute inset-0 w-12 h-12 bg-green-500/20 rounded-full blur-sm"></div>
                    </div>
                </div>
                <div className="absolute bottom-1/4 right-[8%] animate-float-slow delay-1500">
                    <div className="relative">
                        <Users className="w-9 h-9 text-orange-500/60 animate-bounce" />
                        <div className="absolute inset-0 w-9 h-9 bg-orange-500/20 rounded-full blur-sm animate-pulse"></div>
                    </div>
                </div>

                {/* New floating elements - Positioned in empty spaces */}
                <div className="absolute top-[15%] right-[25%] animate-float-medium delay-700">
                    <div className="relative">
                        <Book className="w-7 h-7 text-indigo-500/50 animate-wiggle" />
                    </div>
                </div>
                
                <div className="absolute bottom-[20%] left-[30%] animate-float-slow delay-1200">
                    <div className="relative">
                        <Home className="w-11 h-11 text-cyan-500/50 animate-pulse" />
                    </div>
                </div>

                {/* Floating geometric shapes - Positioned away from content areas */}
                <div className="absolute top-[70%] left-[45%] animate-float-fast delay-300">
                    <div className="w-16 h-16 border-2 border-yellow-400/30 rounded-lg rotate-45 animate-spin-slow"></div>
                </div>
                
                <div className="absolute top-[40%] right-[30%] animate-float-medium delay-900">
                    <div className="w-12 h-12 border-2 border-pink-400/30 rounded-full animate-pulse"></div>
                </div>

                {/* Animated grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] animate-grid-move"></div>
            </div>

            {/* Enhanced Header Section */}
            <div className="text-center space-y-6 relative z-10 max-w-4xl">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                        EduManage Pro
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
                        Comprehensive College ERP Solution
                    </p>
                </div>
                
                {/* ERP Key Highlights with Enhanced Animations */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    {[
                      { icon: Shield, color: "text-green-500", label: "Secure" },
                      { icon: Zap, color: "text-blue-500", label: "Efficient" },
                      { icon: Clock, color: "text-purple-500", label: "24/7 Access" },
                      { icon: BookOpen, color: "text-orange-500", label: "Integrated" }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={item.label}
                          className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <Icon className={`w-8 h-8 ${item.color} mb-2`} />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                      );
                    })}
                </div>
            </div>

            {/* Enhanced Main Portal Cards Grid - Only 5 portals now */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full relative z-10 px-4">
                {portalCards.map((portal, index) => (
                  <div
                    key={portal.name}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-200 dark:border-gray-700 group hover:scale-105 hover:-translate-y-2 animate-fade-in-up relative z-20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-3 ${portal.color} rounded-full group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                        <portal.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {portal.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {portal.description}
                      </p>
                      <Button
                        className={`w-full ${portal.buttonColor} hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                        onClick={() => navigate(portal.path)}
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">Enter Portal</span>
                      </Button>
                    </div>
                    
                    {/* Hover effect border */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
                  </div>
                ))}
            </div>
            
            {/* Enhanced Showcase Statement */}
            <div className="max-w-3xl w-full relative z-10 text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
               <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                   <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                       "This comprehensive ERP solution demonstrates our implementation of role-based access control, 
                       ensuring secure and efficient management of college operations through dedicated portals for 
                       students, hostel administration, library services, and system administrators."
                   </p>
               </div>
           </div>

            {/* Footer */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm relative z-10 animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
                <p>© 2024 EduManage Pro - College ERP System</p>
            </div>

            {/* Enhanced Custom Animations */}
            <style>{`
                /* Existing animations */
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(5deg); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(-3deg); }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                }

                /* New Enhanced Animations */
                @keyframes fade-in-up {
                    from {
                      opacity: 0;
                      transform: translateY(30px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                }
                
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes count-up {
                    from { 
                      transform: scale(0.5);
                      opacity: 0;
                    }
                    to { 
                      transform: scale(1);
                      opacity: 1;
                    }
                }
                
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-3deg); }
                    50% { transform: rotate(3deg); }
                }
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes float-orb-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -15px) scale(1.1); }
                    50% { transform: translate(-10px, 20px) scale(0.9); }
                    75% { transform: translate(-20px, -10px) scale(1.05); }
                }
                
                @keyframes float-orb-2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-15px, 25px) scale(1.15); }
                    66% { transform: translate(25px, 15px) scale(0.85); }
                }
                
                @keyframes grid-move {
                    0% { background-position: 0 0; }
                    100% { background-position: 64px 64px; }
                }

                /* Animation Classes */
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
                
                .animate-count-up {
                    animation: count-up 0.8s ease-out forwards;
                }
                
                .animate-wiggle {
                    animation: wiggle 1s ease-in-out infinite;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                
                .animate-float-orb-1 {
                    animation: float-orb-1 20s ease-in-out infinite;
                }
                
                .animate-float-orb-2 {
                    animation: float-orb-2 25s ease-in-out infinite;
                }
                
                .animate-float-orb-3 {
                    animation: float-orb-1 30s ease-in-out infinite reverse;
                }
                
                .animate-float-orb-4 {
                    animation: float-orb-2 35s ease-in-out infinite reverse;
                }
                
                .animate-grid-move {
                    animation: grid-move 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;