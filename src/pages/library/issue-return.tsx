"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Scan, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import { mockBooks, mockStudents, mockBorrowRecords } from "@/data/mockData";

export function IssueReturn() {
  const [activeTab, setActiveTab] = useState("issue");
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const currentIssues = mockBorrowRecords.filter(record => record.status === 'issued' || record.status === 'overdue');
  const reservationRequests = mockBorrowRecords.filter(record => record.status === 'issued').slice(0, 3);

  const handleIssueBook = () => {
    if (studentId && bookId) {
      alert(`Book issued successfully!\nStudent: ${studentId}\nBook: ${bookId}`);
      setStudentId("");
      setBookId("");
    }
  };

  const handleReturnBook = (recordId: string) => {
    alert(`Book returned successfully! Record ID: ${recordId}`);
  };

  const handleRenewBook = (recordId: string) => {
    alert(`Book renewed successfully! Record ID: ${recordId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Issue & Return Management</h1>
          <p className="text-muted-foreground">Manage book transactions and reservations</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issue">Issue Books</TabsTrigger>
          <TabsTrigger value="return">Return Books</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
        </TabsList>

        {/* Issue Books Tab */}
        <TabsContent value="issue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Issue New Book</CardTitle>
              <CardDescription>Scan or enter student and book details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student ID / Roll Number</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="student"
                      placeholder="Enter roll number or scan ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Scan className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="book">Book ID / ISBN</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="book"
                      placeholder="Enter book ID or ISBN"
                      value={bookId}
                      onChange={(e) => setBookId(e.target.value)}
                    />
                    <Button variant="outline" size="icon" className="text-white">
                      <Scan className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={handleIssueBook} disabled={!studentId || !bookId} className="text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Issue Book
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Student Search</CardTitle>
              <CardDescription>Find student details quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground mt-2" />
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
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Current Issues</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.rollNumber}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>
                        {mockBorrowRecords.filter(r => r.studentId === student.id && r.status === 'issued').length}
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'} className="text-white">
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Return Books Tab */}
        <TabsContent value="return" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Issued Books</CardTitle>
              <CardDescription>Books currently issued to students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fine</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentIssues.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.bookTitle}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>{record.issueDate.toLocaleDateString()}</TableCell>
                      <TableCell>{record.dueDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'overdue' ? 'destructive' : 'secondary'}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{record.fineAmount}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReturnBook(record.id)}
                        >
                          Mark Returned
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Renewals Tab */}
        <TabsContent value="renewals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Renewal Requests</CardTitle>
              <CardDescription>Manage book renewal extensions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Current Due Date</TableHead>
                    <TableHead>Renewed</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentIssues.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.bookTitle}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>{record.dueDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={record.renewed ? 'default' : 'outline'}>
                          {record.renewed ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRenewBook(record.id)}
                          disabled={record.renewed}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Renew
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reservations Tab */}
        <TabsContent value="reservations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Requests</CardTitle>
              <CardDescription>Approve or deny book reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservationRequests.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.bookTitle}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>{record.issueDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <XCircle className="w-4 h-4 mr-1" />
                            Deny
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}