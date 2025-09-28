"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, BarChart3, PieChart as PieChartIcon, TrendingUp, Users, Book, CreditCard } from "lucide-react";
import { mockBooks, mockBorrowRecords, mockFines, mockStudents } from "@/data/mockData";

// Mock data for charts
const mostBorrowedBooks = [
  { name: 'Clean Code', borrows: 45 },
  { name: 'Algorithms', borrows: 38 },
  { name: 'The Great Gatsby', borrows: 32 },
  { name: 'Design Patterns', borrows: 28 },
  { name: 'Database Systems', borrows: 25 },
];

const categoryDistribution = [
  { name: 'Computer Science', value: 35 },
  { name: 'Literature', value: 25 },
  { name: 'Science', value: 15 },
  { name: 'Engineering', value: 12 },
  { name: 'Mathematics', value: 8 },
  { name: 'Others', value: 5 },
];

const monthlyUsage = [
  { month: 'Jan', borrows: 245, returns: 230, newBooks: 15 },
  { month: 'Feb', borrows: 278, returns: 265, newBooks: 12 },
  { month: 'Mar', borrows: 312, returns: 298, newBooks: 20 },
  { month: 'Apr', borrows: 295, returns: 280, newBooks: 18 },
  { month: 'May', borrows: 267, returns: 255, newBooks: 10 },
  { month: 'Jun', borrows: 334, returns: 320, newBooks: 25 },
];

const departmentUsage = [
  { department: 'Computer Science', students: 450, borrows: 1250 },
  { department: 'Electrical Eng', students: 320, borrows: 890 },
  { department: 'Mechanical Eng', students: 280, borrows: 760 },
  { department: 'Civil Eng', students: 240, borrows: 540 },
  { department: 'Mathematics', students: 180, borrows: 420 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export function Reports() {
  const [activeTab, setActiveTab] = useState("overview");

  const inventoryStats = {
    total: mockBooks.length,
    available: mockBooks.filter(book => book.status === 'available').length,
    borrowed: mockBooks.filter(book => book.status === 'borrowed').length,
    reserved: mockBooks.filter(book => book.status === 'reserved').length,
    maintenance: mockBooks.filter(book => book.status === 'maintenance').length,
  };

  const fineStats = {
    totalPending: mockFines.filter(fine => fine.status === 'pending').reduce((sum, fine) => sum + fine.amount, 0),
    totalCollected: mockFines.filter(fine => fine.status === 'paid').reduce((sum, fine) => sum + fine.amount, 0),
    pendingCount: mockFines.filter(fine => fine.status === 'pending').length,
    paidCount: mockFines.filter(fine => fine.status === 'paid').length,
  };

  const usageStats = {
    totalStudents: mockStudents.length,
    activeBorrowers: new Set(mockBorrowRecords.map(r => r.studentId)).size,
    totalTransactions: mockBorrowRecords.length,
    avgBooksPerStudent: (mockBorrowRecords.length / mockStudents.length).toFixed(1),
  };

  const handleExport = (format: string) => {
    alert(`Exporting report in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Library performance and usage insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="fines">Fine Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventoryStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  {inventoryStats.available} available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usageStats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  {usageStats.activeBorrowers} active borrowers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usageStats.totalTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  {usageStats.avgBooksPerStudent} avg per student
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fine Collection</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{fineStats.totalCollected}</div>
                <p className="text-xs text-muted-foreground">
                  ₹{fineStats.totalPending} pending
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Most Borrowed Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Most Borrowed Books
                </CardTitle>
                <CardDescription>Top 5 books by borrowing frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mostBorrowedBooks}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="borrows" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2" />
                  Category Distribution
                </CardTitle>
                <CardDescription>Books distribution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Usage Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Usage Trend</CardTitle>
              <CardDescription>Library activity over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="borrows" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="returns" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="newBooks" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Report Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Report</CardTitle>
              <CardDescription>Current library inventory status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{inventoryStats.total}</div>
                  <div className="text-sm text-blue-600">Total Books</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{inventoryStats.available}</div>
                  <div className="text-sm text-green-600">Available</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{inventoryStats.borrowed}</div>
                  <div className="text-sm text-yellow-600">Borrowed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{inventoryStats.reserved}</div>
                  <div className="text-sm text-purple-600">Reserved</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{inventoryStats.maintenance}</div>
                  <div className="text-sm text-red-600">Maintenance</div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Available Copies</TableHead>
                    <TableHead>Total Copies</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.status === 'available' ? 'bg-green-100 text-green-800' :
                          book.status === 'borrowed' ? 'bg-yellow-100 text-yellow-800' :
                          book.status === 'reserved' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {book.status}
                        </span>
                      </TableCell>
                      <TableCell>{book.availableCopies}</TableCell>
                      <TableCell>{book.totalCopies}</TableCell>
                      <TableCell>{book.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Analytics Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>Student usage patterns and behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Department-wise Usage</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Borrows</TableHead>
                        <TableHead>Avg per Student</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentUsage.map((dept, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{dept.department}</TableCell>
                          <TableCell>{dept.students}</TableCell>
                          <TableCell>{dept.borrows}</TableCell>
                          <TableCell>{(dept.borrows / dept.students).toFixed(1)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Popular Categories</h3>
                  <div className="space-y-2">
                    {categoryDistribution.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${category.value}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{category.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Borrowers</CardTitle>
                  <CardDescription>Students with highest borrowing activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Total Borrows</TableHead>
                        <TableHead>Current Issues</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStudents.slice(0, 5).map((student) => {
                        const borrowCount = mockBorrowRecords.filter(r => r.studentId === student.id).length;
                        const currentIssues = mockBorrowRecords.filter(r => 
                          r.studentId === student.id && (r.status === 'issued' || r.status === 'overdue')
                        ).length;
                        
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.rollNumber}</TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>{borrowCount}</TableCell>
                            <TableCell>{currentIssues}</TableCell>
                            <TableCell>
                              <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                                {student.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fine Reports Tab */}
        <TabsContent value="fines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fine Collection Report</CardTitle>
              <CardDescription>Detailed fine statistics and collection details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹{fineStats.totalPending}</div>
                  <div className="text-sm text-blue-600">Pending Fines</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹{fineStats.totalCollected}</div>
                  <div className="text-sm text-green-600">Collected Fines</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{fineStats.pendingCount}</div>
                  <div className="text-sm text-yellow-600">Pending Cases</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{fineStats.paidCount}</div>
                  <div className="text-sm text-purple-600">Paid Cases</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fine Distribution by Reason</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Overdue', value: mockFines.filter(f => f.reason === 'overdue').length },
                            { name: 'Damaged', value: mockFines.filter(f => f.reason === 'damaged').length },
                            { name: 'Lost', value: mockFines.filter(f => f.reason === 'lost').length },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          <Cell fill="#0088FE" />
                          <Cell fill="#00C49F" />
                          <Cell fill="#FFBB28" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Collection Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[
                        { month: 'Jan', collected: 12500, pending: 4500 },
                        { month: 'Feb', collected: 11800, pending: 5200 },
                        { month: 'Mar', collected: 14200, pending: 3800 },
                        { month: 'Apr', collected: 13500, pending: 4100 },
                        { month: 'May', collected: 12800, pending: 4700 },
                        { month: 'Jun', collected: 15600, pending: 3200 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="collected" fill="#10b981" />
                        <Bar dataKey="pending" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFines.map((fine) => (
                    <TableRow key={fine.id}>
                      <TableCell className="font-medium">{fine.studentName}</TableCell>
                      <TableCell>₹{fine.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fine.reason === 'overdue' ? 'bg-yellow-100 text-yellow-800' :
                          fine.reason === 'damaged' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {fine.reason}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fine.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {fine.status}
                        </span>
                      </TableCell>
                      <TableCell>{fine.createdDate.toLocaleDateString()}</TableCell>
                      <TableCell>{fine.paidDate ? fine.paidDate.toLocaleDateString() : '-'}</TableCell>
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