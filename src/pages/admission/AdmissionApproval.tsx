"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CheckCircle, Download, UserCheck, Mail, IdCard } from "lucide-react";
import { mockApplications } from "@/data/admissionMockData";

export function AdmissionApproval() {
  const [applications] = useState(mockApplications.filter(app => app.status === 'verified'));
  const [searchTerm, setSearchTerm] = useState("");
  const [rollNumberPrefix, setRollNumberPrefix] = useState("2024");

  const filteredApplications = applications.filter(app =>
    app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicationNumber.includes(searchTerm)
  );

  const handleApproveAdmission = (applicationId: string) => {
    const rollNumber = `${rollNumberPrefix}${Math.floor(1000 + Math.random() * 9000)}`;
    alert(`Admission approved! Roll Number: ${rollNumber}`);
  };

  const handleGenerateAdmissionLetter = (applicationId: string) => {
    alert(`Generating admission letter for: ${applicationId}`);
  };

  const handleSyncHostel = (applicationId: string) => {
    alert(`Syncing hostel preference for: ${applicationId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admission Approval</h1>
          <p className="text-muted-foreground">Final approval and student onboarding</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Roll No. Prefix:</label>
            <Input
              value={rollNumberPrefix}
              onChange={(e) => setRollNumberPrefix(e.target.value)}
              className="w-20"
              placeholder="2024"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Verified applications ready for final approval</CardDescription>
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
                <TableHead>Application No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Hostel Required</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.applicationNumber}</TableCell>
                  <TableCell>{application.studentName}</TableCell>
                  <TableCell>{application.course}</TableCell>
                  <TableCell>{application.marks}%</TableCell>
                  <TableCell>
                    <Badge variant="outline">{application.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {application.hostelRequired ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApproveAdmission(application.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        <UserCheck className="w-4 h-4 mr-1" />
                        Details
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
        {/* Approved Students */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Approved</CardTitle>
            <CardDescription>Students approved in last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockApplications
                .filter(app => app.status === 'approved')
                .slice(0, 3)
                .map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{application.studentName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {application.course} • Roll No: 2024{application.id.padStart(4, '0')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleGenerateAdmissionLetter(application.id)}>
                        <Download className="w-4 h-4" />
                      </Button>
                      {application.hostelRequired && (
                        <Button variant="outline" size="sm" onClick={() => handleSyncHostel(application.id)}>
                          <IdCard className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Admission process utilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Bulk Generate Admission Letters
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Send Welcome Emails
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <IdCard className="w-4 h-4 mr-2" />
              Generate ID Cards
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <UserCheck className="w-4 h-4 mr-2" />
              Sync with Student Portal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Admission Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Statistics</CardTitle>
          <CardDescription>Current admission cycle overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-blue-600">Approved Today</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">567</div>
              <div className="text-sm text-green-600">Total Approved</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">234</div>
              <div className="text-sm text-orange-600">Pending Approval</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-purple-600">Acceptance Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}