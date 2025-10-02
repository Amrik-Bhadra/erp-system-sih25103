"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, MapPin, Download, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { mockExams } from "@/data/examinationMockData";

export function ExamConduction() {
  const [exams] = useState(mockExams.filter(exam => exam.status === 'scheduled'));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateSeatingPlan = (examId: string) => {
    alert(`Generating seating plan for exam: ${examId}`);
  };

  const handleDownloadAttendance = (examId: string) => {
    alert(`Downloading attendance sheet for exam: ${examId}`);
  };

  const handleReportMalpractice = (examId: string, studentId: string) => {
    alert(`Reporting malpractice for student ${studentId} in exam ${examId}`);
  };

  // Mock seating plan data
  const mockSeatingPlan = [
    { seatNumber: 'A-01', studentName: 'Aarav Sharma', rollNumber: '2024001', status: 'present' },
    { seatNumber: 'A-02', studentName: 'Priya Patel', rollNumber: '2024002', status: 'absent' },
    { seatNumber: 'A-03', studentName: 'Rohan Kumar', rollNumber: '2024003', status: 'present' },
    { seatNumber: 'A-04', studentName: 'Sneha Verma', rollNumber: '2024004', status: 'present' },
    { seatNumber: 'A-05', studentName: 'Karan Singh', rollNumber: '2024005', status: 'malpractice' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Exam Conduction Support</h1>
          <p className="text-muted-foreground">Manage seating plans, attendance, and exam conduction</p>
        </div>
      </div>

      <Tabs defaultValue="exams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exams">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="seating">Seating Plans</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="exams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Examinations</CardTitle>
              <CardDescription>Exams scheduled for conduction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExams.map((exam) => (
                  <Card key={exam.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{exam.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exam.course} • {exam.venue}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exam.venue}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {exam.totalStudents} students
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Invigilators: {exam.invigilators.join(', ')}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedExam(exam.id);
                            handleGenerateSeatingPlan(exam.id);
                          }}
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          Seating Plan
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadAttendance(exam.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Attendance
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seating">
          <Card>
            <CardHeader>
              <CardTitle>Seating Plan Generator</CardTitle>
              <CardDescription>Create and manage exam hall seating arrangements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Seating Plan Configuration */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Generate Seating Plan</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Total Students</label>
                      <Input type="number" placeholder="Enter total students" defaultValue="120" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hall Capacity</label>
                      <Input type="number" placeholder="Hall capacity" defaultValue="150" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rows</label>
                      <Input type="number" placeholder="Number of rows" defaultValue="10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Columns</label>
                      <Input type="number" placeholder="Number of columns" defaultValue="15" />
                    </div>
                  </div>
                  <Button onClick={() => handleGenerateSeatingPlan('1')} className="text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Generate Seating Plan
                  </Button>
                </div>

                {/* Seating Preview */}
                {/* <div className="space-y-4">
                  <h3 className="font-semibold">Seating Preview</h3>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: 25 }, (_, i) => (
                        <div
                          key={i}
                          className="aspect-square border rounded bg-white flex items-center justify-center text-xs font-medium"
                        >
                          A-{i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-green-100 border border-green-500 rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-blue-100 border border-blue-500 rounded"></div>
                        <span>Occupied</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-red-100 border border-red-500 rounded"></div>
                        <span>Reserved</span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Seating Plan Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Seating Arrangement</CardTitle>
              <CardDescription>Student-wise seat allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seat Number</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSeatingPlan.map((seat) => (
                    <TableRow key={seat.seatNumber}>
                      <TableCell className="font-medium">{seat.seatNumber}</TableCell>
                      <TableCell>{seat.studentName}</TableCell>
                      <TableCell>{seat.rollNumber}</TableCell>
                      <TableCell>
                        {seat.status === 'present' && <Badge variant="default" className="text-white">Present</Badge>}
                        {seat.status === 'absent' && <Badge variant="secondary" className="text-white">Absent</Badge>}
                        {seat.status === 'malpractice' && <Badge variant="destructive" className="text-white">Malpractice</Badge>}
                      </TableCell>
                      <TableCell>
                        {seat.status === 'malpractice' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReportMalpractice('1', seat.rollNumber)}
                          >
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Report
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Management</CardTitle>
              <CardDescription>Track and manage student attendance during exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Attendance Statistics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85</div>
                    <div className="text-sm text-green-600">Present</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">5</div>
                    <div className="text-sm text-yellow-600">Absent</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-red-600">Malpractice</div>
                  </div>
                </div>

                {/* Attendance Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Attendance Sheet
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="text-white">
                    <CheckCircle className="w-4 h-4 mr-2"  />
                    Mark Attendance Complete
                  </Button>
                </div>

                {/* Attendance Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Seat Number</TableHead>
                      <TableHead>Check-in Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSeatingPlan.map((seat) => (
                      <TableRow key={seat.seatNumber}>
                        <TableCell className="font-medium">{seat.rollNumber}</TableCell>
                        <TableCell>{seat.studentName}</TableCell>
                        <TableCell>{seat.seatNumber}</TableCell>
                        <TableCell>
                          {seat.status === 'present' ? '08:45 AM' : '-'}
                        </TableCell>
                        <TableCell>
                          {seat.status === 'present' && <Badge variant="default" className="text-white">Present</Badge>}
                          {seat.status === 'absent' && <Badge variant="secondary" className="text-white">Absent</Badge>}
                          {seat.status === 'malpractice' && <Badge variant="destructive" className="text-white">Malpractice</Badge>}
                        </TableCell>
                        <TableCell>
                          {seat.status === 'malpractice' && 'Copying detected'}
                          {seat.status === 'absent' && 'Not present'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Malpractice Reporting */}
      <Card>
        <CardHeader>
          <CardTitle>Malpractice Reporting</CardTitle>
          <CardDescription>Report and track examination malpractices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Student Roll Number</label>
                <Input placeholder="Enter student roll number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Exam</label>
                <select className="w-full p-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800">
  <option className="text-gray-900 dark:text-white">Select exam</option>
  {exams.map(exam => (
    <option key={exam.id} value={exam.id} className="text-gray-900 dark:text-white">
      {exam.name}
    </option>
  ))}
</select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Incident Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Describe the malpractice incident..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Evidence (Optional)</label>
              <Input type="file" />
            </div>
            <Button variant="destructive">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Malpractice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}