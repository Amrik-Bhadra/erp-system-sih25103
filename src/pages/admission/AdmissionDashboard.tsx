"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, UserCheck, Clock, CheckCircle, XCircle, Plus, TrendingUp } from "lucide-react";
import { mockAdmissionStats, mockApplications, mockCounselingSessions } from "@/data/admissionMockData";

export function AdmissionDashboard() {
  const stats = mockAdmissionStats;

  const quickActions = [
    { name: "Add Application", icon: Plus, href: "#applications" },
    { name: "Generate Merit List", icon: TrendingUp, href: "#merit-counseling" },
    { name: "Schedule Counseling", icon: Clock, href: "#merit-counseling" },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'verified': return 'default';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
            <p className="text-xs text-muted-foreground">
              Need immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">
              {stats.conversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalFeesCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Admission fees
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button key={action.name} variant="outline" className="w-full justify-start">
                  <Icon className="w-4 h-4 mr-2" />
                  {action.name}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest admission applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application No.</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Hostel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.applicationNumber}</TableCell>
                    <TableCell>{application.studentName}</TableCell>
                    <TableCell>{application.course}</TableCell>
                    <TableCell>{application.appliedDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(application.status)}>
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {application.hostelRequired ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Counseling */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Counseling Sessions</CardTitle>
          <CardDescription>Scheduled counseling and interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCounselingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 p-1 bg-orange-100 text-orange-600 rounded" />
                  <div>
                    <p className="text-sm font-medium">{session.course}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.date.toLocaleDateString()} • {session.venue}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {session.registeredStudents}/{session.maxStudents} registered
                  </p>
                  <Badge variant={session.status === 'scheduled' ? 'default' : 'secondary'}>
                    {session.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}