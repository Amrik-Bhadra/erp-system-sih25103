"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Search, FileText, Calculator, Clock, CheckCircle, XCircle, Download, AlertTriangle } from "lucide-react";

interface RevaluationApplication {
  id: string;
  studentName: string;
  rollNumber: string;
  examName: string;
  subject: string;
  currentMarks: number;
  appliedDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  reason: string;
  feePaid: boolean;
  reevaluatedMarks?: number;
  remarks?: string;
}

export function Revaluation() {
  const [applications, setApplications] = useState<RevaluationApplication[]>([
    {
      id: '1',
      studentName: 'Aarav Sharma',
      rollNumber: '2024001',
      examName: 'Semester 6 - Final Exams',
      subject: 'Advanced Algorithms',
      currentMarks: 68,
      appliedDate: new Date('2024-03-10'),
      status: 'pending',
      reason: 'Believe there is discrepancy in marks calculation',
      feePaid: true
    },
    {
      id: '2',
      studentName: 'Priya Patel',
      rollNumber: '2024002',
      examName: 'Semester 6 - Final Exams',
      subject: 'Database Systems',
      currentMarks: 72,
      appliedDate: new Date('2024-03-09'),
      status: 'in-progress',
      reason: 'Expected higher marks based on answer script',
      feePaid: true
    },
    {
      id: '3',
      studentName: 'Rohan Kumar',
      rollNumber: '2024003',
      examName: 'Semester 5 - Supplementary',
      subject: 'Operating Systems',
      currentMarks: 35,
      appliedDate: new Date('2024-03-08'),
      status: 'completed',
      reason: 'Failed by 5 marks, requesting revaluation',
      feePaid: true,
      reevaluatedMarks: 42,
      remarks: 'Marks increased after revaluation'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<RevaluationApplication | null>(null);

  const filteredApplications = applications.filter(app =>
    app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.rollNumber.includes(searchTerm) ||
    app.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const inProgressApplications = applications.filter(app => app.status === 'in-progress');
  const completedApplications = applications.filter(app => app.status === 'completed');

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'in-progress': return 'default';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  const handleApproveApplication = (appId: string) => {
    setApplications(apps =>
      apps.map(app =>
        app.id === appId ? { ...app, status: 'in-progress' } : app
      )
    );
  };

  const handleRejectApplication = (appId: string) => {
    setApplications(apps =>
      apps.map(app =>
        app.id === appId ? { ...app, status: 'rejected' } : app
      )
    );
  };

  const handleCompleteRevaluation = (appId: string, newMarks: number, remarks: string) => {
    setApplications(apps =>
      apps.map(app =>
        app.id === appId ? { 
          ...app, 
          status: 'completed', 
          reevaluatedMarks: newMarks,
          remarks 
        } : app
      )
    );
  };

  const handleDownloadApplication = (appId: string) => {
    // In a real application, this would download the application PDF
    console.log(`Downloading application: ${appId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Revaluation & Supplementary Exams</h1>
          <p className="text-muted-foreground">Manage revaluation applications and supplementary examinations</p>
        </div>
        <Button className="text-white">
          <Calculator className="w-4 h-4 mr-2" />
          Process Batch
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              Revaluation requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              Under evaluation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              Processed applications
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="supplementary">Supplementary Exams</TabsTrigger>
          <TabsTrigger value="process">Process Revaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revaluation Applications</CardTitle>
              <CardDescription>Student applications for marks revaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
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
                    <TableHead>Subject</TableHead>
                    <TableHead>Current Marks</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.studentName}</TableCell>
                      <TableCell>{app.rollNumber}</TableCell>
                      <TableCell>{app.subject}</TableCell>
                      <TableCell>{app.currentMarks}</TableCell>
                      <TableCell>{app.appliedDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        {app.feePaid ? (
                          <Badge variant="default" className="text-white">Paid</Badge>
                        ) : (
                          <Badge variant="destructive" className="text-white">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(app.status)} className="text-white">
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedApplication(app)}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {app.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveApplication(app.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectApplication(app.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
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

        <TabsContent value="supplementary">
          <Card>
            <CardHeader>
              <CardTitle>Supplementary Examinations</CardTitle>
              <CardDescription>Manage supplementary exams for failed students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Supplementary</CardTitle>
                      <CardDescription>Scheduled supplementary exams</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Operating Systems</p>
                            <p className="text-sm text-muted-foreground">15 students registered</p>
                          </div>
                          <Badge variant="default" className="text-white">Mar 25, 2024</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Computer Networks</p>
                            <p className="text-sm text-muted-foreground">8 students registered</p>
                          </div>
                          <Badge variant="default" className="text-white">Mar 28, 2024</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Registration</CardTitle>
                      <CardDescription>Open supplementary registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Data Structures</p>
                            <p className="text-sm text-muted-foreground">Registration ends: Mar 20</p>
                          </div>
                          <Button size="sm" className="text-white">Register</Button>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Algorithms</p>
                            <p className="text-sm text-muted-foreground">Registration ends: Mar 22</p>
                          </div>
                          <Button size="sm" className="text-white">Register</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process">
          <Card>
            <CardHeader>
              <CardTitle>Process Revaluation</CardTitle>
              <CardDescription>Re-evaluate answer scripts and update marks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inProgressApplications.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{app.studentName} - {app.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            Roll No: {app.rollNumber} • Current Marks: {app.currentMarks}
                          </p>
                          <p className="text-sm">
                            <strong>Reason:</strong> {app.reason}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Input
                            type="number"
                            placeholder="New marks"
                            className="w-32"
                            min="0"
                            max="100"
                            defaultValue={app.currentMarks}
                          />
                          <Textarea
                            placeholder="Remarks"
                            className="w-64"
                            rows={3}
                            defaultValue={app.remarks || ''}
                          />
                          <Button
                            onClick={(e) => {
                              const marksInput = e.currentTarget.parentElement?.querySelector('input[type="number"]') as HTMLInputElement;
                              const remarksInput = e.currentTarget.parentElement?.querySelector('textarea') as HTMLTextAreaElement;
                              if (marksInput && remarksInput) {
                                handleCompleteRevaluation(
                                  app.id,
                                  parseInt(marksInput.value) || app.currentMarks,
                                  remarksInput.value
                                );
                              }
                            }} className="text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete Revaluation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {inProgressApplications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No applications currently in progress
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Application Details Modal */}
      {selectedApplication && (
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>Complete revaluation application information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Student Name</p>
                <p>{selectedApplication.studentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Roll Number</p>
                <p>{selectedApplication.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Subject</p>
                <p>{selectedApplication.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Current Marks</p>
                <p>{selectedApplication.currentMarks}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Reason for Revaluation</p>
                <p>{selectedApplication.reason}</p>
              </div>
              {selectedApplication.reevaluatedMarks && (
                <div className="col-span-2">
                  <p className="text-sm font-medium">Revaluated Marks</p>
                  <p className="text-green-600 font-semibold">{selectedApplication.reevaluatedMarks}</p>
                </div>
              )}
              {selectedApplication.remarks && (
                <div className="col-span-2">
                  <p className="text-sm font-medium">Remarks</p>
                  <p>{selectedApplication.remarks}</p>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => handleDownloadApplication(selectedApplication.id)}>
                <Download className="w-4 h-4 mr-2" />
                Download Application
              </Button>
              <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}