"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, Upload, Download, CheckCircle, Clock, User, Calculator } from "lucide-react";
import { mockEvaluations, mockExams } from "@/data/examinationMockData";

export function EvaluationMarks() {
  const [evaluations, setEvaluations] = useState(mockEvaluations);
  const [searchTerm, setSearchTerm] = useState("");
  const [marksData, setMarksData] = useState([
    { id: '1', studentName: 'Aarav Sharma', rollNumber: '2024001', marks: 85, status: 'evaluated' },
    { id: '2', studentName: 'Priya Patel', rollNumber: '2024002', marks: 0, status: 'pending' },
    { id: '3', studentName: 'Rohan Kumar', rollNumber: '2024003', marks: 78, status: 'evaluated' },
    { id: '4', studentName: 'Sneha Verma', rollNumber: '2024004', marks: 0, status: 'pending' },
  ]);

  const filteredEvaluations = evaluations.filter(evaluation =>
    evaluation.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.evaluator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingEvaluations = evaluations.filter(evaluation => evaluation.status === 'pending');
  const inProgressEvaluations = evaluations.filter(evaluation => evaluation.status === 'in-progress');
  const completedEvaluations = evaluations.filter(evaluation => evaluation.status === 'completed');

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in-progress': return 'default';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  const handleAssignEvaluator = (evaluationId: string) => {
    alert(`Assigning evaluator for: ${evaluationId}`);
  };

  const handleUploadMarks = (evaluationId: string) => {
    alert(`Uploading marks for: ${evaluationId}`);
  };

  const handleDownloadTemplate = (evaluationId: string) => {
    alert(`Downloading marks template for: ${evaluationId}`);
  };

  const handleUpdateMarks = (studentId: string, marks: number) => {
    setMarksData(data =>
      data.map(item =>
        item.id === studentId ? { ...item, marks, status: 'evaluated' } : item
      )
    );
  };

  const handleBulkUpload = (evaluationId: string) => {
    alert(`Bulk uploading marks for: ${evaluationId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Evaluation & Marks Entry</h1>
          <p className="text-muted-foreground">Digital marks entry and evaluation progress tracking</p>
        </div>
        <Button className="text-white">
  <Upload className="w-4 h-4 mr-2" />
  Bulk Upload Marks
</Button>
      </div>

      {/* Evaluation Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEvaluations.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting assignment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressEvaluations.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently evaluating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedEvaluations.length}</div>
            <p className="text-xs text-muted-foreground">
              Evaluation completed
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evaluations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="marks-entry">Marks Entry</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Assignments</CardTitle>
              <CardDescription>Manage evaluation workload and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search evaluations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Evaluator</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvaluations.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell className="font-medium">{evaluation.examName}</TableCell>
                      <TableCell>{evaluation.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{evaluation.evaluator}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={(evaluation.evaluated / evaluation.totalStudents) * 100} />
                          <div className="text-xs text-muted-foreground">
                            {evaluation.evaluated}/{evaluation.totalStudents} students
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{evaluation.deadline.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(evaluation.status)} className="text-white">
                          {evaluation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {evaluation.status === 'pending' && (
                            <Button variant="outline" size="sm" onClick={() => handleAssignEvaluator(evaluation.id)}>
                              <User className="w-4 h-4 mr-1" />
                              Assign
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => handleDownloadTemplate(evaluation.id)}>
                            <Download className="w-4 h-4 mr-1" />
                            Template
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleUploadMarks(evaluation.id)}>
                            <Upload className="w-4 h-4 mr-1" />
                            Upload
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

        <TabsContent value="marks-entry">
          <Card>
            <CardHeader>
              <CardTitle>Digital Marks Entry</CardTitle>
              <CardDescription>Enter and manage student marks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Evaluation Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Evaluation</label>
                  <select className="w-full p-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800">
  <option className="text-gray-900 dark:text-white">Select evaluation</option>
  {inProgressEvaluations.map(evaluation => (
    <option key={evaluation.id} value={evaluation.id} className="text-gray-900 dark:text-white">
      {evaluation.examName} - {evaluation.subject}
    </option>
  ))}
</select>
                  </div>
                  <div className="flex items-end space-x-2">
                    <Button onClick={() => handleBulkUpload('1')} className="text-white">
  <Upload className="w-4 h-4 mr-2" />
  Bulk Upload
</Button>
                    <Button variant="outline" onClick={() => handleDownloadTemplate('1')}>
                      <Download className="w-4 h-4 mr-2" />
                      <span className="text-white">Template</span>
                    </Button>
                  </div>
                </div>

                {/* Marks Entry Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Marks (0-100)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marksData.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNumber}</TableCell>
                        <TableCell>{student.studentName}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={student.marks}
                            onChange={(e) => handleUpdateMarks(student.id, parseInt(e.target.value) || 0)}
                            className="w-20"
                            disabled={student.status === 'evaluated'}
                          />
                        </TableCell>
                        <TableCell>
                          {student.status === 'evaluated' ? (
                            <Badge variant="default" className="text-white">Evaluated</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-white">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {student.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateMarks(student.id, student.marks)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Summary */}
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Evaluation Summary</p>
                    <p className="text-xs text-muted-foreground">
                      {marksData.filter(s => s.status === 'evaluated').length} of {marksData.length} students evaluated
                    </p>
                  </div>
                  <Button className="text-white">
  <CheckCircle className="w-4 h-4 mr-2" />
  Submit Evaluation
</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Progress Tracking</CardTitle>
              <CardDescription>Monitor evaluation completion across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {evaluations.map((evaluation) => (
                  <Card key={evaluation.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2 flex-1">
                          <h4 className="font-semibold">{evaluation.examName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {evaluation.subject} • Evaluator: {evaluation.evaluator}
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{Math.round((evaluation.evaluated / evaluation.totalStudents) * 100)}%</span>
                            </div>
                            <Progress value={(evaluation.evaluated / evaluation.totalStudents) * 100} />
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-sm font-medium">
                            Deadline: {evaluation.deadline.toLocaleDateString()}
                          </p>
                          <Badge variant={getStatusVariant(evaluation.status)} className="text-white">
                            {evaluation.status}
                          </Badge>
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

      {/* Moderation Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Moderation & Re-evaluation Requests</CardTitle>
          <CardDescription>Manage moderation and re-evaluation workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Moderation Requests</h4>
                <p className="text-sm text-muted-foreground">Pending moderation approvals</p>
              </div>
              <Badge variant="secondary" className="text-white">3 requests</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Re-evaluation Applications</h4>
                <p className="text-sm text-muted-foreground">Student re-evaluation requests</p>
              </div>
              <Badge variant="secondary" className="text-white">12 applications</Badge>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline">
                <Calculator className="w-4 h-4 mr-2" />
                Process Moderation
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}