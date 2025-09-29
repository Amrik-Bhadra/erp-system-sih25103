"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Upload, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { mockApplications } from "@/data/admissionMockData";

export function ApplicationManagement() {
  const [applications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = applications.filter(app =>
    app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicationNumber.includes(searchTerm) ||
    app.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const verifiedApplications = applications.filter(app => app.status === 'verified');
  const approvedApplications = applications.filter(app => app.status === 'approved');

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'verified': return 'default';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleVerify = (applicationId: string) => {
    alert(`Application verified! ID: ${applicationId}`);
  };

  const handleReject = (applicationId: string) => {
    alert(`Application rejected! ID: ${applicationId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Application Management</h1>
          <p className="text-muted-foreground">Manage and review student applications</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
              <CardDescription>Complete list of all admission applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications by name, number, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.applicationNumber}</TableCell>
                      <TableCell>{application.studentName}</TableCell>
                      <TableCell>{application.course}</TableCell>
                      <TableCell>{application.appliedDate.toLocaleDateString()}</TableCell>
                      <TableCell>{application.marks}%</TableCell>
                      <TableCell>
                        <Badge variant="outline">{application.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {application.status === 'pending' && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => handleVerify(application.id)}>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleReject(application.id)}>
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

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Applications awaiting verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApplications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold">{application.studentName}</h4>
                            <Badge variant="secondary">Pending</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {application.applicationNumber} • {application.course}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              Applied: {application.appliedDate.toLocaleDateString()}
                            </span>
                            <span>Marks: {application.marks}%</span>
                            <Badge variant="outline">{application.category}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleVerify(application.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verify
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleReject(application.id)}>
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}