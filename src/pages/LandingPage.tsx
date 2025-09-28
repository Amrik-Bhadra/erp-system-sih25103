import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Library, Building, Users, BookOpen, Shield, Clock, Zap } from "lucide-react";

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 space-y-12 p-6 relative overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-20 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-400/7 rounded-full blur-3xl animate-pulse delay-1500"></div>
                
                {/* Floating academic icons with trails */}
                <div className="absolute top-1/4 left-1/6 animate-float-slow">
                    <div className="relative">
                        <GraduationCap className="w-10 h-10 text-blue-500/60" />
                        <div className="absolute inset-0 w-10 h-10 bg-blue-500/20 rounded-full blur-sm animate-ping"></div>
                    </div>
                </div>
                <div className="absolute top-1/3 right-1/5 animate-float-medium delay-1000">
                    <div className="relative">
                        <Library className="w-8 h-8 text-purple-500/60" />
                        <div className="absolute inset-0 w-8 h-8 bg-purple-500/20 rounded-full blur-sm animate-ping"></div>
                    </div>
                </div>
                <div className="absolute bottom-1/3 left-1/4 animate-float-fast delay-500">
                    <div className="relative">
                        <Building className="w-12 h-12 text-green-500/60" />
                        <div className="absolute inset-0 w-12 h-12 bg-green-500/20 rounded-full blur-sm animate-ping"></div>
                    </div>
                </div>
                <div className="absolute bottom-1/4 right-1/6 animate-float-slow delay-1500">
                    <div className="relative">
                        <Users className="w-9 h-9 text-orange-500/60" />
                        <div className="absolute inset-0 w-9 h-9 bg-orange-500/20 rounded-full blur-sm animate-ping"></div>
                    </div>
                </div>

                {/* Animated grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"></div>
            </div>

            {/* Enhanced Header Section */}
            <div className="text-center space-y-6 relative z-10 max-w-4xl">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        EduManage Pro
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
                        Comprehensive College ERP Solution
                    </p>
                </div>
                
                {/* ERP Key Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    <div className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                        <Shield className="w-8 h-8 text-green-500 mb-2" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Secure</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                        <Zap className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Efficient</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                        <Clock className="w-8 h-8 text-purple-500 mb-2" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">24/7 Access</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                        <BookOpen className="w-8 h-8 text-orange-500 mb-2" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Integrated</span>
                    </div>
                </div>
            </div>

            {/* Enhanced Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full relative z-10">
                {/* Student Portal */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 border border-blue-200 dark:border-blue-800 hover:scale-105 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Student Portal
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-6 leading-relaxed">
                        Comprehensive academic management including attendance, results, and personal records
                    </p>
                    <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold shadow-lg"
                        onClick={() => navigate('/student')}
                    >
                        Enter Portal
                    </Button>
                </div>

                {/* Hostel Portal */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 border border-green-200 dark:border-green-800 hover:scale-105 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Building className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Hostel Portal
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-6 leading-relaxed">
                        Complete hostel management system for room allocation and maintenance requests
                    </p>
                    <Button
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-lg font-semibold shadow-lg"
                        onClick={() => navigate('/hostel')}
                    >
                        Enter Portal
                    </Button>
                </div>

                {/* Library Portal */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 border border-purple-200 dark:border-purple-800 hover:scale-105 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Library className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Library Portal
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-6 leading-relaxed">
                        Digital library management with book tracking, fines system, and recommendations
                    </p>
                    <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 text-lg font-semibold shadow-lg"
                        onClick={() => navigate('/library')}
                    >
                        Enter Portal
                    </Button>
                </div>

                {/* Admin Portal */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 border border-orange-200 dark:border-orange-800 hover:scale-105 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Admin Portal
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-6 leading-relaxed">
                        Administrative control panel for system management and comprehensive reporting
                    </p>
                    <Button
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 text-lg font-semibold shadow-lg"
                        onClick={() => navigate('/admin')}
                    >
                        Enter Portal
                    </Button>
                </div>
            </div>

            {/* ERP Information Section */}
            {/* <div className="max-w-4xl w-full relative z-10">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                        About EduManage Pro
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-400">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Core Features</h3>
                            <ul className="space-y-2 text-base">
                                <li>• Centralized student information system</li>
                                <li>• Automated attendance and grade management</li>
                                <li>• Digital library and resource management</li>
                                <li>• Hostel and campus facility management</li>
                                <li>• Real-time notifications and alerts</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Benefits</h3>
                            <ul className="space-y-2 text-base">
                                <li>• Streamlined administrative processes</li>
                                <li>• Enhanced student engagement</li>
                                <li>• Data-driven decision making</li>
                                <li>• Reduced paperwork and manual effort</li>
                                <li>• Scalable and secure infrastructure</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Showcase Statement */}
            <div className="max-w-3xl w-full relative z-10 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                    <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                        "This comprehensive ERP solution demonstrates our implementation of role-based access control, 
                        ensuring secure and efficient management of college operations through dedicated portals for 
                        students, hostel administration, library services, and system administrators."
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm relative z-10">
                <p>© 2024 EduManage Pro - College ERP System </p>
            </div>

            {/* Enhanced Custom Animations */}
            <style>{`
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
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
                .animate-float-medium {
                    animation: float-medium 6s ease-in-out infinite;
                }
                .animate-float-fast {
                    animation: float-fast 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;