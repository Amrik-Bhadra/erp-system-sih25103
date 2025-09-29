"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CreditCard, CheckCircle, Clock, Download, FileText, RefreshCw } from "lucide-react";

export function FeeIntegration() {
  const [feeRecords] = useState([
    {
      id: '1',
      studentName: 'Aarav Sharma',
      rollNumber: '2024001',
      course: 'B.Tech Computer Science',
      amount: 25000,
      status: 'paid',
      paidDate: new Date('2024-01-25'),
      receiptNumber: 'RCP2024001'
    },
    {
      id: '2',
      studentName: 'Priya Patel',
      rollNumber: '2024002',
      course: 'B.Tech Electrical',
      amount: 25000,
      status: 'pending',
      paidDate: null,
      receiptNumber: null
    },
    {
      id: '3',
      studentName: 'Rohan Kumar',
      rollNumber: '2024003',
      course: 'B.Tech Mechanical',
      amount: 25000,
      status: 'paid',
      paidDate: new Date('2024-01-26'),
      receiptNumber: 'RCP2024002'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = feeRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.rollNumber.includes(searchTerm)
  );

  const paidFees = feeRecords.filter(record => record.status === 'paid');
  const pendingFees = feeRecords.filter(record => record.status === 'pending');

  const totalCollected = paidFees.reduce((sum, record) => sum + record.amount, 0);
  const totalPending = pendingFees.reduce((sum, record) => sum + record.amount, 0);

  const handleMarkAsPaid = (recordId: string) => {
    alert(`Marking fee as paid for: ${recordId}`);
  };

  const handleGenerateReceipt = (recordId: string) => {
    alert(`Generating receipt for: ${recordId}`);
  };

  const handleSyncFinance = () => {
    alert("Syncing with finance module...");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Fee Integration</h1>
          <p className="text-muted-foreground">Manage admission fees and payments</p>
        </div>
        <Button variant="outline" onClick={handleSyncFinance}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync with Finance
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {paidFees.length} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {pendingFees.length} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((paidFees.length / feeRecords.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Fee</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹25,000</div>
            <p className="text-xs text-muted-foreground">
              Per student
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="paid">Paid Fees</TabsTrigger>
          <TabsTrigger value="pending">Pending Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Fee Records</CardTitle>
              <CardDescription>Complete admission fee payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Receipt</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.rollNumber}</TableCell>
                      <TableCell>{record.course}</TableCell>
                      <TableCell>₹{record.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'paid' ? 'default' : 'secondary'}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {record.paidDate ? record.paidDate.toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {record.receiptNumber ? (
                          <Badge variant="outline">{record.receiptNumber}</Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {record.status === 'pending' && (
                            <Button variant="outline" size="sm" onClick={() => handleMarkAsPaid(record.id)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark Paid
                            </Button>
                          )}
                          {record.status === 'paid' && (
                            <Button variant="outline" size="sm" onClick={() => handleGenerateReceipt(record.id)}>
                              <Download className="w-4 h-4 mr-1" />
                              Receipt
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid">
          <Card>
            <CardHeader>
              <CardTitle>Paid Fees</CardTitle>
              <CardDescription>Successfully collected admission fees</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidFees.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.rollNumber}</TableCell>
                      <TableCell>₹{record.amount.toLocaleString()}</TableCell>
                      <TableCell>{record.paidDate?.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleGenerateReceipt(record.id)}>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Refund Processing */}
      <Card>
        <CardHeader>
          <CardTitle>Refund Processing</CardTitle>
          <CardDescription>Manage admission fee refunds for cancellations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Refund Requests</h4>
                <p className="text-sm text-muted-foreground">Pending refund approvals</p>
              </div>
              <Badge variant="secondary">3 requests</Badge>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Process Refunds
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Refund Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}