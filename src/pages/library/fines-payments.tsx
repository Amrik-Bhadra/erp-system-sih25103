"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CreditCard, Calculator, FileText, Download, CheckCircle, XCircle } from "lucide-react";
import { mockFines, mockStudents, mockBorrowRecords } from "@/data/mockData";

export function FinesPayments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [manualFine, setManualFine] = useState({
    studentId: "",
    amount: "",
    reason: "damaged"
  });

  const filteredFines = mockFines.filter(fine =>
    fine.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fine.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingFines = mockFines.filter(fine => fine.status === 'pending');
  const paidFines = mockFines.filter(fine => fine.status === 'paid');

  const totalPending = pendingFines.reduce((sum, fine) => sum + fine.amount, 0);
  const totalCollected = paidFines.reduce((sum, fine) => sum + fine.amount, 0);

  const handleAddManualFine = () => {
    if (manualFine.studentId && manualFine.amount) {
      alert(`Manual fine added!\nStudent: ${manualFine.studentId}\nAmount: ₹${manualFine.amount}\nReason: ${manualFine.reason}`);
      setManualFine({ studentId: "", amount: "", reason: "damaged" });
    }
  };

  const handleMarkAsPaid = (fineId: string) => {
    alert(`Fine marked as paid! ID: ${fineId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Fines & Payments</h1>
          <p className="text-muted-foreground">Manage fines collection and payment tracking</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending}</div>
            <p className="text-xs text-muted-foreground">
              {pendingFines.length} pending cases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalCollected}</div>
            <p className="text-xs text-muted-foreground">
              {paidFines.length} paid cases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Fines</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingFines.filter(f => f.reason === 'overdue').reduce((sum, f) => sum + f.amount, 0)}</div>
            <p className="text-xs text-muted-foreground">
              From overdue books
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Damage/Lost</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingFines.filter(f => f.reason !== 'overdue').reduce((sum, f) => sum + f.amount, 0)}</div>
            <p className="text-xs text-muted-foreground">
              Damage and lost books
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Fine Overview</TabsTrigger>
          <TabsTrigger value="manual">Manual Fines</TabsTrigger>
          <TabsTrigger value="payments">Payment Collection</TabsTrigger>
          <TabsTrigger value="reports">Finance Sync</TabsTrigger>
        </TabsList>

        {/* Fine Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Fines</CardTitle>
              <CardDescription>Complete list of all fines with status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search fines by student or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFines.map((fine) => (
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
                        } className="text-white">
                          {fine.reason}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={fine.status === 'paid' ? 'default' : 'destructive'} className="text-white">
                          {fine.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{fine.createdDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        {fine.paidDate ? fine.paidDate.toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {fine.status === 'pending' && (
                          <Button variant="outline" size="sm" onClick={() => handleMarkAsPaid(fine.id)}>
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

        {/* Manual Fines Tab */}
        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Manual Fine</CardTitle>
              <CardDescription>Add fines for lost or damaged books</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Student Roll Number</label>
                  <Input
                    placeholder="Enter student roll number"
                    value={manualFine.studentId}
                    onChange={(e) => setManualFine({...manualFine, studentId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="Enter fine amount"
                    value={manualFine.amount}
                    onChange={(e) => setManualFine({...manualFine, amount: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={manualFine.reason}
                  onChange={(e) => setManualFine({...manualFine, reason: e.target.value})}
                >
                  <option value="damaged">Damaged Book</option>
                  <option value="lost">Lost Book</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <Button onClick={handleAddManualFine} disabled={!manualFine.studentId || !manualFine.amount}>
                <Calculator className="w-4 h-4 mr-2" />
                Add Manual Fine
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Calculated Overdue Fines</CardTitle>
              <CardDescription>Fines automatically calculated for overdue books</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Fine Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBorrowRecords
                    .filter(record => record.status === 'overdue')
                    .map((record) => {
                      const daysOverdue = Math.ceil((new Date().getTime() - record.dueDate.getTime()) / (1000 * 3600 * 24));
                      return (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.studentName}</TableCell>
                          <TableCell>{record.bookTitle}</TableCell>
                          <TableCell>{record.dueDate.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="destructive" className="text-white">{daysOverdue} days</Badge>
                          </TableCell>
                          <TableCell>₹{record.fineAmount}</TableCell>
                          <TableCell>
                            <Badge variant="destructive" className="text-white">Unpaid</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Collection Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Collection</CardTitle>
              <CardDescription>Collect and record fine payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Online Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Students can pay fines online through the fee portal. Payments are automatically synced.
                  </p>
                  <Button>
                    <CreditCard className="w-4 h-4 mr-2" />
                    View Online Payments
                  </Button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Manual Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Record cash or check payments manually in the system.
                  </p>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Record Manual Payment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Finance Sync Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Finance Module Sync</CardTitle>
              <CardDescription>Sync fine data with finance department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Ledger Update</h4>
                    <p className="text-sm text-muted-foreground">Last synced: Today, 10:30 AM</p>
                  </div>
                  <Badge variant="default">Synced</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Monthly Report</h4>
                    <p className="text-sm text-muted-foreground">January 2024 fine collection</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Finance Reconciliation</h4>
                    <p className="text-sm text-muted-foreground">Match payments with finance records</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Sync Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}