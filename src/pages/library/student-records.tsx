"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { mockStudents, mockBorrowRecords, mockFines } from "@/data/mockData";

export function StudentRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("search");

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentBorrowedBooks = (studentId: string) => {
    return mockBorrowRecords.filter(record => 
      record.studentId === studentId && (record.status === 'issued' || record.status === 'overdue')
    );
  };

  const getStudentFines = (studentId: string) => {
    return mockFines.filter(fine => fine.studentId === studentId);
  };

  // const getBorrowingHistory = (studentId: string) => {
  //   return mockBorrowRecords.filter(record => record.studentId === studentId);
  // };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Student Records</h1>
          <p className="text-muted-foreground">Manage and view student information and activities</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search">Search Students</TabsTrigger>
          <TabsTrigger value="borrowed">Current Borrowings</TabsTrigger>
          <TabsTrigger value="fines">Fines & Payments</TabsTrigger>
          <TabsTrigger value="history">Borrowing History</TabsTrigger>
        </TabsList>

        {/* Search Students Tab */}
        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Students</CardTitle>
              <CardDescription>Find students by name, roll number, or department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
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
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.rollNumber}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'} className="text-white">
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <User className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Current Borrowings Tab */}
        <TabsContent value="borrowed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Currently Borrowed Items</CardTitle>
              <CardDescription>Books currently issued to students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fine</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBorrowRecords
                    .filter(record => record.status === 'issued' || record.status === 'overdue')
                    .map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.studentName}</TableCell>
                        <TableCell>
                          {mockStudents.find(s => s.id === record.studentId)?.rollNumber}
                        </TableCell>
                        <TableCell>{record.bookTitle}</TableCell>
                        <TableCell>{record.issueDate.toLocaleDateString()}</TableCell>
                        <TableCell>{record.dueDate.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={record.status === 'overdue' ? 'destructive' : 'secondary'}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{record.fineAmount}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fines & Payments Tab */}
        <TabsContent value="fines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fines & Payment Status</CardTitle>
              <CardDescription>View and manage student fines</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFines.map((fine) => (
                    <TableRow key={fine.id}>
                      <TableCell className="font-medium">{fine.studentName}</TableCell>
                      <TableCell>
                        {mockStudents.find(s => s.id === fine.studentId)?.rollNumber}
                      </TableCell>
                      <TableCell>₹{fine.amount}</TableCell>
                      <TableCell>
                        <Badge variant={
                          fine.reason === 'overdue' ? 'secondary' :
                          fine.reason === 'damaged' ? 'destructive' : 'outline'
                        }>
                          {fine.reason}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={fine.status === 'paid' ? 'default' : 'destructive'}>
                          {fine.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{fine.createdDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        {fine.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            <CreditCard className="w-4 h-4 mr-1" />
                            Mark Paid
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

        {/* Borrowing History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing History</CardTitle>
              <CardDescription>Complete history of book transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fine Paid</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBorrowRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.bookTitle}</TableCell>
                      <TableCell>{record.issueDate.toLocaleDateString()}</TableCell>
                      <TableCell>{record.dueDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        {record.returnDate ? record.returnDate.toLocaleDateString() : 'Not Returned'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          record.status === 'returned' ? 'default' :
                          record.status === 'overdue' ? 'destructive' : 'secondary'
                        }>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {record.fineAmount > 0 ? `₹${record.fineAmount}` : 'None'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Eligibility Check Section */}
      <Card>
        <CardHeader>
          <CardTitle>Student Eligibility Check</CardTitle>
          <CardDescription>Verify student borrowing eligibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockStudents.slice(0, 3).map((student) => {
              const borrowedCount = getStudentBorrowedBooks(student.id).length;
              const pendingFines = getStudentFines(student.id).filter(f => f.status === 'pending').length;
              const isEligible = borrowedCount < student.maxBooksAllowed && pendingFines === 0;

              return (
                <Card key={student.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                      </div>
                      {isEligible ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>Borrowed: {borrowedCount}/{student.maxBooksAllowed}</p>
                      <p>Pending Fines: {pendingFines}</p>
                      <p className={`font-medium ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
                        {isEligible ? 'Eligible to borrow' : 'Not eligible'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
