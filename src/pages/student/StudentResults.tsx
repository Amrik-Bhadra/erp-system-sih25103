import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, BarChart2 } from "lucide-react";
import { semesterResultsData, subjectResultsData } from "@/utils/dataProvider";
import { SubjectBarChart } from "@/components/student/charts/SubjectBarChart";
import { SemesterPieChart } from "@/components/student/charts/SemesterPieChart";
import { CustomModal } from "@/components/student/charts/CustomModal";

const StudentResults = () => {
  const availableSemesters = [
    ...new Set(semesterResultsData.map((r) => r.semester)),
  ].sort((a, b) => b - a); // descending order

  const [selectedResultSemester, setSelectedResultSemester] = useState(
    availableSemesters[0]
  );

  const [showDialog, setShowDialog] = useState(false);
  // const [analysisData, setAnalysisData] = useState<
  //   { browser: string; visitors: number; fill: string }[]
  // >([]);
  const [, setAnalysisData] = useState<
    { browser: string; visitors: number; fill: string }[]
  >([]);
  const [passFailData, setPassFailData] = useState<{
    pass: number;
    fail: number;
  }>({
    pass: 0,
    fail: 0,
  });

  const handleDownload = (semester: number) => {
    alert(`Downloading transcript for Semester ${semester}...`);
  };

  const handleSeeAnalysis = (semester: number) => {
    const subjects = subjectResultsData.filter((s) => s.semester === semester);

    // Bar chart data
    const barData = subjects.map((s) => ({
      browser: s.courseName,
      visitors: s.earnedGradePoints,
      fill: "var(--chart-1)",
    }));

    // Pass/Fail counts
    const passCount = subjects.filter((s) => s.result === "Pass").length;
    const failCount = subjects.filter((s) => s.result === "Fail").length;

    setAnalysisData(barData);
    setPassFailData({ pass: passCount, fail: failCount });
    setShowDialog(true);
  };

  return (
    <div className="space-y-8">
      {/* Semester Filter */}
      <div className="mb-4 flex justify-start items-center gap-6 flex-wrap">
        <strong>Semester: </strong>
        {availableSemesters.map((sem) => {
          const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][
            sem - 1
          ];
          return (
            <label key={sem} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="resultSemester"
                value={sem}
                checked={selectedResultSemester === sem}
                onChange={() => setSelectedResultSemester(sem)}
                className="accent-blue-500"
              />
              <span className="text-sm font-medium">{roman}</span>
            </label>
          );
        })}
      </div>

      {/* Semester Summary Table */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Semester Summary</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload(selectedResultSemester)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download Transcript
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSeeAnalysis(selectedResultSemester)}
            className="flex items-center gap-2"
          >
            <BarChart2 className="h-4 w-4" /> See Analysis
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-100/20">
        <Table className="mb-0">
          <TableHeader>
            <TableRow className="bg-gray-100/10">
              <TableHead className="text-center">S.No</TableHead>
              <TableHead className="text-center">Session</TableHead>
              <TableHead className="text-center">Section</TableHead>
              <TableHead className="text-center">Registered Courses</TableHead>
              <TableHead className="text-center">Registered Credits</TableHead>
              <TableHead className="text-center">Earned Credits</TableHead>
              <TableHead className="text-center">SGPA</TableHead>
              <TableHead className="text-center">CGPA</TableHead>
              <TableHead className="text-center">Result Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesterResultsData
              .filter((r) => r.semester === selectedResultSemester)
              .map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">{r.sno}</TableCell>
                  <TableCell className="text-center">{r.session}</TableCell>
                  <TableCell className="text-center">{r.section}</TableCell>
                  <TableCell className="text-center">
                    {r.registeredCourses}
                  </TableCell>
                  <TableCell className="text-center">
                    {r.registeredCredits}
                  </TableCell>
                  <TableCell className="text-center">
                    {r.earnedCredits}
                  </TableCell>
                  <TableCell className="text-center">{r.sgpa}</TableCell>
                  <TableCell className="text-center">{r.cgpa}</TableCell>
                  <TableCell className="text-center">{r.resultDate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Subject-wise Results */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Subject-wise Results</h2>
        <div className="overflow-hidden rounded-md border border-gray-100/20">
          <Table className="mb-0">
            <TableHeader>
              <TableRow className="bg-gray-100/10">
                <TableHead className="text-center">Course Name</TableHead>
                <TableHead className="text-center">Exam Type</TableHead>
                <TableHead className="text-center">Course Type</TableHead>
                <TableHead className="text-center">Credits</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-center">Grade Point</TableHead>
                <TableHead className="text-center">
                  Earned Grade Points
                </TableHead>
                <TableHead className="text-center">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectResultsData
                .filter((s) => s.semester === selectedResultSemester)
                .map((s, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center">
                      {s.courseName}
                    </TableCell>
                    <TableCell className="text-center">{s.examType}</TableCell>
                    <TableCell className="text-center">
                      {s.courseType}
                    </TableCell>
                    <TableCell className="text-center">{s.credits}</TableCell>
                    <TableCell className="text-center">{s.grade}</TableCell>
                    <TableCell className="text-center">
                      {s.gradePoint}
                    </TableCell>
                    <TableCell className="text-center">
                      {s.earnedGradePoints}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`px-3 py-1 rounded text-white ${
                          s.result === "Pass" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {s.result}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog for Analysis */}
      <CustomModal
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title={`Semester Analysis - Semester ${selectedResultSemester}`}
        width="max-w-7xl"
      >
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[300px]">
            <SubjectBarChart
              data={subjectResultsData
                .filter((s) => s.semester === selectedResultSemester)
                .map((s) => ({
                  subject: s.courseName,
                  marks: s.earnedGradePoints,
                  fill: "var(--chart-1)",
                }))}
            />
          </div>
          <div className="flex-1 min-w-[300px]">
            <SemesterPieChart
              passCount={passFailData.pass}
              failCount={passFailData.fail}
              semester={selectedResultSemester}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default StudentResults;
