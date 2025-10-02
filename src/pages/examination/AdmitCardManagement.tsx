"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, CheckCircle, XCircle, Plus, FileText } from "lucide-react";
import { mockAdmitCards, mockExams } from "@/data/examinationMockData";

export function AdmitCardManagement() {
  const [admitCards, setAdmitCards] = useState(mockAdmitCards);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdmitCards = admitCards.filter(card =>
    card.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.rollNumber.includes(searchTerm) ||
    card.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatedCards = admitCards.filter(card => card.status === 'generated');
  const downloadedCards = admitCards.filter(card => card.status === 'downloaded');
  const pendingFeeCards = admitCards.filter(card => card.feeStatus === 'pending');

  const handleGenerateAdmitCards = (examId: string) => {
    alert(`Generating admit cards for exam: ${examId}`);
    // In real implementation, this would generate cards for all eligible students
  };

  const handleDownloadAdmitCard = (cardId: string) => {
    alert(`Downloading admit card: ${cardId}`);
  };

  const handleBulkGenerate = () => {
    alert("Bulk generating admit cards for all scheduled exams...");
  };

  const handleVerifyFee = (cardId: string) => {
    setAdmitCards(cards =>
      cards.map(card =>
        card.id === cardId ? { ...card, feeStatus: 'paid' } : card
      )
    );
    alert(`Fee verified for: ${cardId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admit Card Management</h1>
          <p className="text-muted-foreground">Generate and manage hall tickets for students</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleBulkGenerate} className="text-white">
            <Plus className="w-4 h-4 mr-2" />
            Bulk Generate
          </Button>
          <Button variant="outline" className="text-white">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Exam Selection for Admit Card Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Available Exams</CardTitle>
          <CardDescription>Select exam to generate admit cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockExams.filter(exam => exam.status === 'scheduled').map((exam) => (
              <Card key={exam.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{exam.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exam.course} • {exam.date.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {exam.totalStudents} students eligible
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateAdmitCards(exam.id) }
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Generate Cards
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6 text-white">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Cards</TabsTrigger>
          <TabsTrigger value="generated">Generated</TabsTrigger>
          <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
          <TabsTrigger value="pending">Pending Fee</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Admit Cards</CardTitle>
              <CardDescription>Complete list of generated hall tickets</CardDescription>
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
                    <TableHead>Venue</TableHead>
                    <TableHead>Seat No.</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmitCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium">{card.studentName}</TableCell>
                      <TableCell>{card.rollNumber}</TableCell>
                      <TableCell>{card.examName}</TableCell>
                      <TableCell>{card.venue}</TableCell>
                      <TableCell>{card.seatNumber}</TableCell>
                      <TableCell>
                        <Badge variant={card.status === 'downloaded' ? 'default' : 'secondary'} className="text-white">
                          {card.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {card.feeStatus === 'paid' ? (
                          <Badge variant="default" className="text-white">Paid</Badge>
                        ) : (
                          <Badge variant="destructive">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadAdmitCard(card.id)}
                            disabled={card.feeStatus === 'pending'}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          {card.feeStatus === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVerifyFee(card.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Verify Fee
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

        <TabsContent value="generated">
          <Card>
            <CardHeader>
              <CardTitle>Generated Admit Cards</CardTitle>
              <CardDescription>Cards ready for download</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Generated Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium">{card.studentName}</TableCell>
                      <TableCell>{card.rollNumber}</TableCell>
                      <TableCell>{card.examName}</TableCell>
                      <TableCell>{card.generatedDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadAdmitCard(card.id)}
                        >
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

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Fee Verification</CardTitle>
              <CardDescription>Students with pending fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingFeeCards.map((card) => (
                  <Card key={card.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{card.studentName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {card.rollNumber} • {card.examName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Venue: {card.venue} • Seat: {card.seatNumber}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerifyFee(card.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verify Fee
                          </Button>
                          <Button variant="outline" size="sm">
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

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Admit Card Statistics</CardTitle>
          <CardDescription>Current generation and distribution status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{admitCards.length}</div>
              <div className="text-sm text-blue-600">Total Generated</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{downloadedCards.length}</div>
              <div className="text-sm text-green-600">Downloaded</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{pendingFeeCards.length}</div>
              <div className="text-sm text-yellow-600">Pending Fee</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {((downloadedCards.length / admitCards.length) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-purple-600">Download Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}