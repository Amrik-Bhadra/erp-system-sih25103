"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Eye, CheckCircle, XCircle, Clock, Download, Lock } from "lucide-react";
import { mockQuestionPapers, mockExams } from "@/data/examinationMockData";

export function QuestionPaperManagement() {
  const [questionPapers, setQuestionPapers] = useState(mockQuestionPapers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filteredPapers = questionPapers.filter(paper =>
    paper.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uploadedPapers = questionPapers.filter(paper => paper.status === 'uploaded');
  const reviewedPapers = questionPapers.filter(paper => paper.status === 'reviewed');
  const approvedPapers = questionPapers.filter(paper => paper.status === 'approved');

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'uploaded': return 'secondary';
      case 'reviewed': return 'default';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadPaper = () => {
    if (selectedFile) {
      const newPaper = {
        id: (questionPapers.length + 1).toString(),
        examId: "1",
        examName: "Semester 6 - Final Exams",
        subject: "Selected Subject",
        uploadedBy: "Current User",
        uploadDate: new Date(),
        status: 'uploaded' as const,
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        accessLevel: 'restricted' as const
      };
      setQuestionPapers([...questionPapers, newPaper]);
      setSelectedFile(null);
      alert("Question paper uploaded successfully!");
    }
  };

  const handleApprovePaper = (paperId: string) => {
    setQuestionPapers(papers =>
      papers.map(paper =>
        paper.id === paperId ? { ...paper, status: 'approved', accessLevel: 'approved-only' } : paper
      )
    );
    alert(`Question paper approved: ${paperId}`);
  };

  const handleRejectPaper = (paperId: string) => {
    setQuestionPapers(papers =>
      papers.map(paper =>
        paper.id === paperId ? { ...paper, status: 'rejected' } : paper
      )
    );
    alert(`Question paper rejected: ${paperId}`);
  };

  const handleDownloadPaper = (paperId: string) => {
    alert(`Downloading question paper: ${paperId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Question Paper Management</h1>
          <p className="text-muted-foreground">Secure upload, review, and approval of question papers</p>
        </div>
      </div>

      {/* Secure Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Secure Paper Upload</CardTitle>
          <CardDescription>Upload question papers with encryption and access control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Exam</label>
              <select className="w-full p-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800">
  <option className="text-gray-900 dark:text-white">Select exam</option>
  {mockExams.filter(exam => exam.status === 'scheduled').map(exam => (
    <option key={exam.id} value={exam.id} className="text-gray-900 dark:text-white">
      {exam.name}
    </option>
  ))}
</select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Enter subject name" />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop your question paper file here, or click to browse
            </p>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
            {selectedFile && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Files are encrypted and stored securely with restricted access</span>
          </div>

          <Button onClick={handleUploadPaper} disabled={!selectedFile} className="text-white">
            <Upload className="w-4 h-4 mr-2 " />
            Upload Securely
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Papers</TabsTrigger>
          <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Question Papers</CardTitle>
              <CardDescription>Complete workflow from upload to approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by exam, subject, or uploader..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPapers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-medium">{paper.examName}</TableCell>
                      <TableCell>{paper.subject}</TableCell>
                      <TableCell>{paper.uploadedBy}</TableCell>
                      <TableCell>{paper.uploadDate.toLocaleDateString()}</TableCell>
                      <TableCell>{paper.fileSize}</TableCell>
                      <TableCell>
                        <Badge variant={paper.accessLevel === 'restricted' ? 'secondary' : 'default'} className="text-white">
                          {paper.accessLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(paper.status)} className="text-white">
                          {paper.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDownloadPaper(paper.id)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {paper.status === 'uploaded' && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => handleApprovePaper(paper.id)}>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleRejectPaper(paper.id)}>
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {paper.status === 'reviewed' && (
                            <Button variant="outline" size="sm" onClick={() => handleApprovePaper(paper.id)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Final Approve
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

        <TabsContent value="uploaded">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Papers</CardTitle>
              <CardDescription>Papers awaiting review and approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedPapers.map((paper) => (
                  <Card key={paper.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold">{paper.examName}</h4>
                            <Badge variant="secondary" className="text-white">Uploaded</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {paper.subject} • Uploaded by: {paper.uploadedBy}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {paper.uploadDate.toLocaleDateString()}
                            </span>
                            <span>Size: {paper.fileSize}</span>
                            <Badge variant="secondary" className="text-white">{paper.accessLevel}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleApprovePaper(paper.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleRejectPaper(paper.id)}>
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

      {/* Security Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Access Logs</CardTitle>
          <CardDescription>Recent access attempts to question papers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Paper</TableHead>
                <TableHead>Access Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Dr. Sharma</TableCell>
                <TableCell>Advanced Algorithms - Sem 6</TableCell>
                <TableCell>2024-03-10 14:30</TableCell>
                <TableCell>Download</TableCell>
                <TableCell>192.168.1.100</TableCell>
                <TableCell><Badge variant="default" className="text-white">Allowed</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Prof. Gupta</TableCell>
                <TableCell>Data Structures - Mid Term</TableCell>
                <TableCell>2024-03-10 15:45</TableCell>
                <TableCell>View</TableCell>
                <TableCell>192.168.1.101</TableCell>
                <TableCell><Badge variant="default" className="text-white">Allowed</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Unknown User</TableCell>
                <TableCell>Advanced Algorithms - Sem 6</TableCell>
                <TableCell>2024-03-10 16:20</TableCell>
                <TableCell>Access Attempt</TableCell>
                <TableCell>103.216.45.120</TableCell>
                <TableCell><Badge variant="destructive" className="text-white">Blocked</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}