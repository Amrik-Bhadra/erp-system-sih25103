"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, Calendar, Users, Download } from "lucide-react";
import { mockMeritLists, mockCounselingSessions, mockApplications } from "@/data/admissionMockData";

export function MeritCounseling() {
  const [meritLists] = useState(mockMeritLists);
  const [counselingSessions] = useState(mockCounselingSessions);
  const [searchTerm, setSearchTerm] = useState("");

  const handleGenerateMeritList = () => {
    alert("Generating merit list...");
  };

  const handleScheduleCounseling = () => {
    alert("Scheduling counseling session...");
  };

  const handleDownloadMeritList = (meritListId: string) => {
    alert(`Downloading merit list: ${meritListId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Merit List & Counseling</h1>
          <p className="text-muted-foreground">Manage merit lists and counseling sessions</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleGenerateMeritList}>
            <Plus className="w-4 h-4 mr-2" />
            Generate Merit List
          </Button>
          <Button variant="outline" onClick={handleScheduleCounseling}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Counseling
          </Button>
        </div>
      </div>

      <Tabs defaultValue="merit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="merit">Merit Lists</TabsTrigger>
          <TabsTrigger value="counseling">Counseling Sessions</TabsTrigger>
        </TabsList>

        {/* Merit Lists Tab */}
        <TabsContent value="merit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Merit Lists</CardTitle>
              <CardDescription>Merit lists by course and category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meritLists.map((meritList) => (
                  <Card key={meritList.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{meritList.course}</h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <Badge variant="outline">{meritList.category}</Badge>
                            <span>Cutoff: {meritList.cutoff}%</span>
                            <span>Generated: {meritList.generatedDate.toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {meritList.students.length} students in list
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDownloadMeritList(meritList.id)}>
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="w-4 h-4 mr-1" />
                            View Students
                          </Button>
                        </div>
                      </div>

                      {/* Student List */}
                      <div className="mt-4 border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Rank</TableHead>
                              <TableHead>Student Name</TableHead>
                              <TableHead>Marks</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {meritList.students.map((student) => (
                              <TableRow key={student.id}>
                                <TableCell className="font-medium">#{student.rank}</TableCell>
                                <TableCell>{student.studentName}</TableCell>
                                <TableCell>{student.marks}%</TableCell>
                                <TableCell>
                                  <Badge variant={
                                    student.status === 'selected' ? 'default' :
                                    student.status === 'waitlisted' ? 'secondary' : 'destructive'
                                  }>
                                    {student.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Generate New Merit List</CardTitle>
              <CardDescription>Create merit list with custom criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>B.Tech Computer Science</option>
                    <option>B.Tech Electrical</option>
                    <option>B.Tech Mechanical</option>
                    <option>B.Tech Civil</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>General</option>
                    <option>OBC</option>
                    <option>SC</option>
                    <option>ST</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Marks</label>
                  <Input type="number" placeholder="Enter cutoff marks" />
                </div>
              </div>
              <Button className="mt-4">
                <Filter className="w-4 h-4 mr-2" />
                Generate Merit List
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Counseling Sessions Tab */}
        <TabsContent value="counseling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Counseling Sessions</CardTitle>
              <CardDescription>Manage counseling and interview schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {counselingSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.course}</TableCell>
                      <TableCell>{session.date.toLocaleDateString()}</TableCell>
                      <TableCell>{session.venue}</TableCell>
                      <TableCell>
                        {session.registeredStudents}/{session.maxStudents}
                      </TableCell>
                      <TableCell>
                        <Badge variant={session.status === 'scheduled' ? 'default' : 'secondary'}>
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Users className="w-4 h-4 mr-1" />
                            View List
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            Reschedule
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Seat Allocation Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Seat Allocation Status</CardTitle>
              <CardDescription>Current seat allocation across courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">120</div>
                  <div className="text-sm text-blue-600">Total Seats</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85</div>
                  <div className="text-sm text-green-600">Allocated</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">25</div>
                  <div className="text-sm text-yellow-600">Waitlisted</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">10</div>
                  <div className="text-sm text-gray-600">Vacant</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}