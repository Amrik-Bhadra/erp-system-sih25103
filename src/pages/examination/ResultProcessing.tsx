"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calculator, Award, Download, Send, FileText, Users } from "lucide-react";
import { mockResults, mockExams } from "@/data/examinationMockData";

export function ResultProcessing() {
  const [results, setResults] = useState(mockResults);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const filteredResults = results.filter(result =>
    result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.rollNumber.includes(searchTerm) ||
    result.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const publishedResults = results.filter(result => result.published);
  const unpublishedResults = results.filter(result => !result.published);

  const calculateGPA = (marks: number): number => {
    if (marks >= 90) return 10.0;
    if (marks >= 80) return 9.0;
    if (marks >= 70) return 8.0;
    if (marks >= 60) return 7.0;
    if (marks >= 50) return 6.0;
    if (marks >= 40) return 5.0;
    return 0.0;
  };

  const calculateGrade = (marks: number): string => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "F";
  };

  const handleCalculateResults = (examId: string) => {
    alert(`Calculating results for exam: ${examId}`);
    // In real implementation, this would calculate GPA and grades for all students
  };

  const handlePublishResults = (examId: string) => {
    setResults(results =>
      results.map(result =>
        result.examId === examId ? { ...result, published: true } : result
      )
    );
    alert(`Results published for exam: ${examId}`);
  };

  const handleGenerateMarksheet = (studentId: string) => {
    alert(`Generating marksheet for student: ${studentId}`);
  };

  const handleBulkPublish = () => {
    setResults(results =>
      results.map(result => ({ ...result, published: true }))
    );
    alert("All results published successfully!");
  };

  const handleSendNotifications = (examId: string) => {
    alert(`Sending result notifications for exam: ${examId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Result Processing & Publishing</h1>
          <p className="text-muted-foreground">Calculate, process, and publish examination results</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleBulkPublish} className="text-white">
            <Send className="w-4 h-4 mr-2" />
            Publish All
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Exam Selection for Result Processing */}
      <Card>
        <CardHeader>
          <CardTitle>Available Exams for Result Processing</CardTitle>
          <CardDescription>Select exam to process and publish results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockExams.filter(exam => exam.status === 'completed').map((exam) => (
              <Card key={exam.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{exam.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exam.course} • {exam.totalStudents} students
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={
                        results.filter(r => r.examId === exam.id && r.published).length > 0 ? 
                        'default' : 'secondary'
                      } className="text-white">
                        {results.filter(r => r.examId === exam.id && r.published).length > 0 ? 
                         'Published' : 'Unpublished'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {results.filter(r => r.examId === exam.id).length} results
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCalculateResults(exam.id)}
                    >
                      <Calculator className="w-4 h-4 mr-1" />
                      Calculate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePublishResults(exam.id)}
                      disabled={results.filter(r => r.examId === exam.id && r.published).length > 0}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Publish
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Examination Results</CardTitle>
              <CardDescription>Complete result database with GPA and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, roll number, or exam..."
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
                    <TableHead>Exam</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.studentName}</TableCell>
                      <TableCell>{result.rollNumber}</TableCell>
                      <TableCell>{result.examName}</TableCell>
                      <TableCell>{result.marks}</TableCell>
                      <TableCell>
                        <Badge variant={result.status === 'pass' ? 'default' : 'destructive'} className="text-white">
                          {result.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>{result.gpa.toFixed(1)}</TableCell>
                      <TableCell>
                        <Badge variant={result.status === 'pass' ? 'default' : 'destructive'} className="text-white">
                          {result.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {result.published ? (
                          <Badge variant="default" className="text-white">Published</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-white">Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateMarksheet(result.studentId)}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Marksheet
                          </Button>
                          {!result.published && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePublishResults(result.examId)}
                            >
                              <Send className="w-4 h-4 mr-1" />
                              Publish
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

        <TabsContent value="published">
          <Card>
            <CardHeader>
              <CardTitle>Published Results</CardTitle>
              <CardDescription>Results available to students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {publishedResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.studentName}</TableCell>
                      <TableCell>{result.rollNumber}</TableCell>
                      <TableCell>{result.examName}</TableCell>
                      <TableCell>{result.marks}</TableCell>
                      <TableCell>
                        <Badge variant={result.status === 'pass' ? 'default' : 'destructive'} className="text-white">
                          {result.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={result.status === 'pass' ? 'default' : 'destructive'} className="text-white">
                          {result.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateMarksheet(result.studentId)}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Marksheet
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

      {/* Result Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Results</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.length}</div>
            <p className="text-xs text-muted-foreground">
              Processed results
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Percentage</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((results.filter(r => r.status === 'pass').length / results.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall pass rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(results.reduce((sum, r) => sum + r.gpa, 0) / results.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Cumulative GPA
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedResults.length}</div>
            <p className="text-xs text-muted-foreground">
              Results published
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Result Actions</CardTitle>
          <CardDescription>Perform actions on multiple results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All Marksheets
            </Button>
            <Button variant="outline" onClick={() => handleSendNotifications('all')}>
              <Send className="w-4 h-4 mr-2" />
              Send Notifications
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Transcripts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}