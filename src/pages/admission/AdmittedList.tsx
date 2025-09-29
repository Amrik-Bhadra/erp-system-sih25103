import StudentAdmissionList from "@/components/admission/StudentAdmissionTable";

// import { Users, FileText, CheckCircle, XCircle } from "lucide-react";
import { AdmissionSectionCards } from "@/components/admission/admission-section-cards";


const AdmittedList = () => {
  const stats = {
    totalStudents: 320,
    totalHostels: 8,
    pendingApplications: 25,
    pendingComplaints: 5,
    pendingExits: 3,
  };
  return (
    <div className="space-y-6">
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.title}
              className="p-4 shadow-md border border-gray-200 rounded-lg"
            >
              <CardHeader className="flex items-center gap-4">
                <div className="p-3 border border-gray-300 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {kpi.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div> */}

      <AdmissionSectionCards stats={stats} />

      {/* Students Table */}
      <div>
        <StudentAdmissionList />
      </div>
    </div>
  );
};

export default AdmittedList;
