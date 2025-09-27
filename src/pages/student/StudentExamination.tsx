import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Download } from "lucide-react";

import {
  hallTicketData,
  examTimetableData,
  internalMarksData,
  revaluationData,
  attendanceData,
} from "@/utils/dataProvider";
import { useState } from "react";

const statusColors: Record<string, string> = {
  Upcoming: "bg-green-100 text-green-800",
  Today: "bg-blue-100 text-blue-800",
  Completed: "bg-gray-100 text-gray-800",
  Present: "bg-green-100 text-green-800",
  Absent: "bg-red-100 text-red-800",
  Late: "bg-yellow-100 text-yellow-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Applied: "bg-blue-100 text-blue-800",
  Approved: "bg-green-100 text-green-800",
};

// ----- Student Examination Component -----
const StudentExamination = () => {
  // Get available semesters dynamically
  const availableSemesters = Array.from(
    new Set(examTimetableData.map((e) => e.semester))
  ).sort((a, b) => a - b);

  // Default to latest semester (instead of the first)
  const [selectedSemester, setSelectedSemester] = useState(
    availableSemesters[availableSemesters.length - 1] || 1
  );
  const [selectedAttendanceSemester, setSelectedAttendanceSemester] = useState(
    availableSemesters[availableSemesters.length - 1] || 1
  );

  return (
    <div className="p-4">
      <Tabs defaultValue="timetable" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timetable">Exam Timetable</TabsTrigger>
          <TabsTrigger value="hallticket">Hall Ticket</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="marks">Internal Marks</TabsTrigger>
          <TabsTrigger value="revaluation">Revaluation</TabsTrigger>
        </TabsList>

        {/* ----- Exam Timetable Tab ----- */}
        <TabsContent value="timetable">
          {/* Semester Filter */}
          <div className="mb-4 flex justify-start items-center gap-6 flex-wrap">
            <strong>Semester: </strong>
            {availableSemesters.map((sem) => {
              const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][
                sem - 1
              ];
              return (
                <label
                  key={sem}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="semester"
                    value={sem}
                    checked={selectedSemester === sem}
                    onChange={() => setSelectedSemester(sem)}
                    className="accent-blue-500"
                  />
                  <span className="text-sm font-medium">{roman}</span>
                </label>
              );
            })}
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Exam</TableHead>
                  <TableHead className="text-center">Subject</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Time</TableHead>
                  <TableHead className="text-center">Venue</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examTimetableData
                  .filter((e) => e.semester === selectedSemester)
                  .map((e, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-center">{i + 1}</TableCell>
                      <TableCell className="text-center">{e.exam}</TableCell>
                      <TableCell className="text-center">{e.subject}</TableCell>
                      <TableCell className="text-center">{e.date}</TableCell>
                      <TableCell className="text-center">{e.time}</TableCell>
                      <TableCell className="text-center">{e.venue}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`px-3 py-1 rounded text-white ${
                            e.status === "Ongoing"
                              ? "bg-blue-500"
                              : e.status === "Upcoming"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {e.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ----- Hall Ticket Tab ----- */}
        <TabsContent value="hallticket">
          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Exam</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Semester</TableHead>
                  <TableHead className="text-center">
                    Registered Subjects
                  </TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hallTicketData.map((h, i) => {
                  const today = new Date();
                  // Convert "dd/mm/yyyy" to Date object
                  const endDateParts = h.endDate.split("/").reverse();
                  const endDateObj = new Date(endDateParts.join("-"));
                  const isPast = endDateObj < today;

                  return (
                    <TableRow key={i}>
                      <TableCell className="text-center">{i + 1}</TableCell>
                      <TableCell className="text-center">{h.exam}</TableCell>
                      <TableCell className="text-center">
                        <span>{h.startDate}</span> - <span>{h.endDate}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {h.semester}
                      </TableCell>
                      <TableCell className="text-center">
                        {h.subjects.join(", ")}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          className={`flex items-center gap-1 text-white px-2 py-1 rounded cursor-pointer ${
                            isPast
                              ? "bg-gray-400 hover:bg-gray-500"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          <Download className="w-4 h-4" /> Download PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ----- Attendance Tab ----- */}
        <TabsContent value="attendance">
          {/* Semester Filter */}
          <div className="mb-4 flex justify-start items-center gap-6 flex-wrap">
            <strong>Semester: </strong>
            {availableSemesters.map((sem) => {
              const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][
                sem - 1
              ];
              return (
                <label
                  key={sem}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="attendanceSemester"
                    value={sem}
                    checked={selectedAttendanceSemester === sem}
                    onChange={() => setSelectedAttendanceSemester(sem)}
                    className="accent-blue-500"
                  />
                  <span className="text-sm font-medium">{roman}</span>
                </label>
              );
            })}
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Exam</TableHead>
                  <TableHead className="text-center">Subject</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData
                  .filter((a) => a.semester === selectedAttendanceSemester)
                  .map((a, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-center">{i + 1}</TableCell>
                      <TableCell className="text-center">{a.exam}</TableCell>
                      <TableCell className="text-center">{a.subject}</TableCell>
                      <TableCell className="text-center">{a.date}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`px-3 py-1 rounded text-white ${
                            a.status === "Present"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {a.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ----- Internal Marks Tab ----- */}
        <TabsContent value="marks">
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Assessment</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internalMarksData.map((m, i) => (
                <TableRow key={i}>
                  <TableCell>{m.subject}</TableCell>
                  <TableCell>{m.assessment}</TableCell>
                  <TableCell>{m.marks}</TableCell>
                  <TableCell>{m.total}</TableCell>
                  <TableCell>{m.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* ----- Revaluation Tab ----- */}
        <TabsContent value="revaluation">
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revaluationData.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{r.exam}</TableCell>
                  <TableCell>{r.subject}</TableCell>
                  <TableCell>{r.marks}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[r.status]}>{r.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      disabled={r.status !== "Pending"}
                      onClick={() => alert(`Applied for ${r.subject}`)}
                    >
                      Apply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentExamination;
