"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Calendar, Users, Clock, Edit, Trash2, Send } from "lucide-react";
import { mockExams } from "@/data/examinationMockData";

export function ExamScheduling() {
  const [exams, setExams] = useState(mockExams);
  const [searchTerm, setSearchTerm] = useState("");
  const [newExam, setNewExam] = useState({
    name: "",
    type: "semester",
    course: "",
    date: "",
    time: "",
    duration: "",
    venue: "",
    invigilators: [] as string[]
  });

  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scheduledExams = exams.filter(exam => exam.status === 'scheduled');
  const completedExams = exams.filter(exam => exam.status === 'completed');

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'ongoing': return 'secondary';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleCreateExam = () => {
    if (newExam.name && newExam.course && newExam.date) {
      const exam = {
        id: (exams.length + 1).toString(),
        ...newExam,
        type: newExam.type as "semester" | "mid-term" | "practical" | "supplementary",
        date: new Date(newExam.date),
        status: 'scheduled' as const,
        totalStudents: Math.floor(Math.random() * 100) + 50
      };
      setExams([...exams, exam]);
      setNewExam({
        name: "", type: "semester", course: "", date: "", time: "", duration: "", venue: "", invigilators: []
      });
      alert("Exam scheduled successfully!");
    }
  };

  const handlePublishTimetable = (examId: string) => {
    alert(`Timetable published for exam: ${examId}`);
  };

  const handleReschedule = (examId: string) => {
    alert(`Rescheduling exam: ${examId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Exam Scheduling & Timetable</h1>
          <p className="text-muted-foreground">Create and manage examination schedules</p>
        </div>
        <Button className="text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Exam
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Examinations</CardTitle>
              <CardDescription>Complete list of all scheduled exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search exams by name or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-white">{exam.type}</Badge>
                      </TableCell>
                      <TableCell>{exam.course}</TableCell>
                      <TableCell>
                        {exam.date.toLocaleDateString()} • {exam.time}
                      </TableCell>
                      <TableCell>{exam.venue}</TableCell>
                      <TableCell>{exam.totalStudents}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(exam.status)} className="text-white">
                          {exam.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handlePublishTimetable(exam.id)}>
                            <Send className="w-4 h-4 mr-1" />
                            Publish
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleReschedule(exam.id)}>
                            <Calendar className="w-4 h-4 mr-1" />
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
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

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Exams</CardTitle>
              <CardDescription>Upcoming examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledExams.map((exam) => (
                  <Card key={exam.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold">{exam.name}</h4>
                            <Badge variant="default" className="text-white">{exam.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {exam.course} • {exam.venue}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {exam.date.toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {exam.time}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {exam.totalStudents} students
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Invigilators: {exam.invigilators.join(', ')}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handlePublishTimetable(exam.id)}>
                            <Send className="w-4 h-4 mr-1" />
                            Publish
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

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Exam</CardTitle>
              <CardDescription>Schedule a new examination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exam Name *</label>
                  <Input
                    placeholder="Enter exam name"
                    value={newExam.name}
                    onChange={(e) => setNewExam({...newExam, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exam Type</label>
                  <select
  className="w-full p-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800"
  value={newExam.type}
  onChange={(e) => setNewExam({...newExam, type: e.target.value})}
>
  <option value="semester" className="text-gray-900 dark:text-white">Semester Exam</option>
  <option value="mid-term" className="text-gray-900 dark:text-white">Mid-Term</option>
  <option value="practical" className="text-gray-900 dark:text-white">Practical</option>
  <option value="supplementary" className="text-gray-900 dark:text-white">Supplementary</option>
</select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course *</label>
                  <Input
                    placeholder="Enter course name"
                    value={newExam.course}
                    onChange={(e) => setNewExam({...newExam, course: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date *</label>
                  <Input
                    type="date"
                    value={newExam.date}
                    onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time *</label>
                  <Input
                    placeholder="e.g., 09:00 AM - 12:00 PM"
                    value={newExam.time}
                    onChange={(e) => setNewExam({...newExam, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Input
                    placeholder="e.g., 3 hours"
                    value={newExam.duration}
                    onChange={(e) => setNewExam({...newExam, duration: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Venue *</label>
                <Input
                  placeholder="Enter exam venue"
                  value={newExam.venue}
                  onChange={(e) => setNewExam({...newExam, venue: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Invigilators</label>
                <Input
                  placeholder="Enter invigilator names (comma separated)"
                  onChange={(e) => setNewExam({...newExam, invigilators: e.target.value.split(',')})}
                />
              </div>

              <Button onClick={handleCreateExam} disabled={!newExam.name || !newExam.course || !newExam.date} className="text-white">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Exam
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}