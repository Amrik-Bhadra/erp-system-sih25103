"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Ticket, Calculator, Award, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { mockExaminationStats, mockExams, mockEvaluations } from "@/data/examinationMockData";

export function ExaminationDashboard() {
  const stats = mockExaminationStats;

  const quickActions = [
    { name: "Create Exam", icon: Plus, href: "#scheduling" },
    { name: "Generate Admit Cards", icon: Ticket, href: "#admit-cards" },
    { name: "Publish Results", icon: Award, href: "#results" },
    { name: "Schedule Evaluation", icon: Calculator, href: "#evaluation" },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'ongoing': return 'secondary';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getEvaluationStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in-progress': return 'default';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingExams}</div>
            <p className="text-xs text-muted-foreground">
              In next 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingEvaluations}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting marks entry
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Results Published</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resultsPublished}</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admit Cards</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admitCardsGenerated}</div>
            <p className="text-xs text-muted-foreground">
              Generated this cycle
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

        {/* Upcoming Exams */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Recently scheduled examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockExams.filter(exam => exam.status === 'scheduled').map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.name}</TableCell>
                    <TableCell>{exam.course}</TableCell>
                    <TableCell>
                      {exam.date.toLocaleDateString()} • {exam.time}
                    </TableCell>
                    <TableCell>{exam.venue}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(exam.status)} className="text-white">
                        {exam.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Evaluation Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Progress</CardTitle>
          <CardDescription>Current evaluation status across subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvaluations.map((evaluation) => (
              <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Calculator className="w-8 h-8 p-1 bg-red-100 text-red-600 rounded" />
                  <div>
                    <p className="text-sm font-medium">{evaluation.examName}</p>
                    <p className="text-xs text-muted-foreground">
                      {evaluation.subject} • Evaluator: {evaluation.evaluator}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${(evaluation.evaluated / evaluation.totalStudents) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {evaluation.evaluated}/{evaluation.totalStudents} evaluated
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Deadline: {evaluation.deadline.toLocaleDateString()}
                  </p>
                  <Badge variant={getEvaluationStatusVariant(evaluation.status)} className="text-white">
                    {evaluation.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>Important notifications and reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Question Paper Approval Pending</p>
                <p className="text-xs text-yellow-600">2 question papers awaiting review</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-blue-200 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Evaluation Deadline Approaching</p>
                <p className="text-xs text-blue-600">3 evaluations due in next 7 days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-green-200 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Results Ready for Publishing</p>
                <p className="text-xs text-green-600">5 exam results can be published</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}