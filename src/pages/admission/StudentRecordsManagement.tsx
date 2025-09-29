"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, Download, RefreshCw, IdCard, Mail } from "lucide-react";

export function StudentRecordsManagement() {
  const [students] = useState([
    {
      id: '1',
      rollNumber: '2024001',
      studentName: 'Aarav Sharma',
      course: 'B.Tech Computer Science',
      admissionDate: new Date('2024-01-25'),
      status: 'active',
      hostelAllocated: 'Yes',
      idCardGenerated: true
    },
    {
      id: '2',
      rollNumber: '2024002',
      studentName: 'Priya Patel',
      course: 'B.Tech Electrical',
      admissionDate: new Date('2024-01-26'),
      status: 'active',
      hostelAllocated: 'No',
      idCardGenerated: false
    },
    {
      id: '3',
      rollNumber: '2024003',
      studentName: 'Rohan Kumar',
      course: 'B.Tech Mechanical',
      admissionDate: new Date('2024-01-27'),
      status: 'active',
      hostelAllocated: 'Yes',
      idCardGenerated: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  );

  const handleGenerateIDCard = (studentId: string) => {
    alert(`Generating ID card for: ${studentId}`);
  };

  const handleSyncStudentPortal = (studentId: string) => {
    alert(`Syncing with student portal: ${studentId}`);
  };

  const handleBulkSync = () => {
    alert("Bulk syncing all student records...");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Student Records Management</h1>
          <p className="text-muted-foreground">Manage permanent student records and integrations</p>
        </div>
        <Button variant="outline" onClick={handleBulkSync}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Bulk Sync
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>Complete database of admitted students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>ID Card</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.rollNumber}</TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.admissionDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={student.hostelAllocated === 'Yes' ? 'default' : 'secondary'}>
                      {student.hostelAllocated}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {student.idCardGenerated ? (
                      <Badge variant="default">Generated</Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleSyncStudentPortal(student.id)}>
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Sync
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateIDCard(student.id)}>
                        <IdCard className="w-4 h-4 mr-1" />
                        ID Card
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="w-4 h-4 mr-1" />
                        Profile
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>System integration overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium">Student Portal</div>
                  <div className="text-sm text-muted-foreground">Profile auto-creation</div>
                </div>
              </div>
              <Badge variant="default">Synced</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium">Email System</div>
                  <div className="text-sm text-muted-foreground">Welcome emails</div>
                </div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <IdCard className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">ID Card System</div>
                  <div className="text-sm text-muted-foreground">Auto-generation</div>
                </div>
              </div>
              <Badge variant="default">Ready</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Batch operations and utilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <IdCard className="w-4 h-4 mr-2" />
              Generate All ID Cards
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Send Welcome Emails
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export Student Database
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All Records
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Records Statistics</CardTitle>
          <CardDescription>Student records overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{students.length}</div>
              <div className="text-sm text-blue-600">Total Students</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {students.filter(s => s.idCardGenerated).length}
              </div>
              <div className="text-sm text-green-600">ID Cards Generated</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {students.filter(s => s.hostelAllocated === 'Yes').length}
              </div>
              <div className="text-sm text-orange-600">Hostel Allocated</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-purple-600">Portal Synced</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}