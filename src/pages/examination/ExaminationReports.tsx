"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, BarChart3, TrendingUp, Users, Award, Calculator } from "lucide-react";

// Mock data for charts
const performanceData = [
  { subject: 'Data Structures', average: 75, passRate: 88, topper: 95 },
  { subject: 'Algorithms', average: 72, passRate: 85, topper: 92 },
  { subject: 'Database Systems', average: 78, passRate: 90, topper: 96 },
  { subject: 'Operating Systems', average: 70, passRate: 82, topper: 89 },
  { subject: 'Computer Networks', average: 68, passRate: 80, topper: 87 },
];

const departmentPerformance = [
  { department: 'Computer Science', students: 450, average: 78.5, passRate: 92 },
  { department: 'Electrical', students: 320, average: 72.3, passRate: 85 },
  { department: 'Mechanical', students: 280, average: 70.8, passRate: 82 },
  { department: 'Civil', students: 240, average: 69.5, passRate: 80 },
  { department: 'Electronics', students: 180, average: 74.2, passRate: 88 },
];

const gradeDistribution = [
  { name: 'A+', value: 12 },
  { name: 'A', value: 25 },
  { name: 'B+', value: 30 },
  { name: 'B', value: 18 },
  { name: 'C', value: 8 },
  { name: 'D', value: 5 },
  { name: 'F', value: 2 },
];

const trendData = [
  { semester: 'Sem 1', average: 72, passRate: 85 },
  { semester: 'Sem 2', average: 74, passRate: 87 },
  { semester: 'Sem 3', average: 76, passRate: 88 },
  { semester: 'Sem 4', average: 75, passRate: 89 },
  { semester: 'Sem 5', average: 77, passRate: 90 },
  { semester: 'Sem 6', average: 78, passRate: 92 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B'];

export function ExaminationReports() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleExport = (format: string) => {
    alert(`Exporting report in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Examination performance statistics and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="department">Department-wise</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,470</div>
                <p className="text-xs text-muted-foreground">
                  Appeared in exams
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Marks</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">74.2%</div>
                <p className="text-xs text-muted-foreground">
                  Overall average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">87.5%</div>
                <p className="text-xs text-muted-foreground">
                  Successful students
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Topper Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96.8%</div>
                <p className="text-xs text-muted-foreground">
                  Highest marks
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Grade Distribution
                </CardTitle>
                <CardDescription>Student performance by grade categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Average marks progression over semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="passRate" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Students with outstanding performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>Aarav Sharma</TableCell>
                    <TableCell>2024001</TableCell>
                    <TableCell>Computer Science</TableCell>
                    <TableCell>9.8</TableCell>
                    <TableCell><Badge variant="default" className="text-white">Outstanding</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2</TableCell>
                    <TableCell>Priya Patel</TableCell>
                    <TableCell>2024002</TableCell>
                    <TableCell>Electrical</TableCell>
                    <TableCell>9.6</TableCell>
                    <TableCell><Badge variant="default" className="text-white">Excellent</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">3</TableCell>
                    <TableCell>Rohan Kumar</TableCell>
                    <TableCell>2024003</TableCell>
                    <TableCell>Computer Science</TableCell>
                    <TableCell>9.5</TableCell>
                    <TableCell><Badge variant="default" className="text-white">Excellent</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Detailed analysis by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Performance Metrics</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Average</TableHead>
                        <TableHead>Pass Rate</TableHead>
                        <TableHead>Topper</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {performanceData.map((subject, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{subject.subject}</TableCell>
                          <TableCell>{subject.average}%</TableCell>
                          <TableCell>{subject.passRate}%</TableCell>
                          <TableCell>{subject.topper}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Subject Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="average" fill="#3b82f6" name="Average Marks" />
                      <Bar dataKey="passRate" fill="#10b981" name="Pass Rate" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Improvement Areas */}
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                  <CardDescription>Subjects needing attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Computer Networks</p>
                        <p className="text-xs text-yellow-600">Lowest average marks (68%)</p>
                      </div>
                      <Badge variant="secondary" className="text-white">Needs Attention</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-orange-800">Operating Systems</p>
                        <p className="text-xs text-orange-600">Below average pass rate (82%)</p>
                      </div>
                      <Badge variant="secondary" className="text-white">Monitor</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Department-wise Tab */}
        <TabsContent value="department" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Analysis</CardTitle>
              <CardDescription>Performance comparison across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Average</TableHead>
                        <TableHead>Pass Rate</TableHead>
                        <TableHead>Rank</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentPerformance.map((dept, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{dept.department}</TableCell>
                          <TableCell>{dept.students}</TableCell>
                          <TableCell>{dept.average}%</TableCell>
                          <TableCell>{dept.passRate}%</TableCell>
                          <TableCell>
                            <Badge variant={index === 0 ? "default" : "secondary"} className="text-white">
                              #{index + 1}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="average" fill="#3b82f6" name="Average Marks" />
                      <Bar dataKey="passRate" fill="#10b981" name="Pass Rate" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Historical performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Year Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="text-center p-4 bg-white border rounded-lg">
    <div className="text-sm text-muted-foreground">2022</div>
    <div className="text-2xl font-bold text-gray-900">71.5%</div>
    <div className="text-sm text-gray-600">Average Marks</div>
  </div>
  <div className="text-center p-4 bg-white border rounded-lg">
    <div className="text-sm text-muted-foreground">2023</div>
    <div className="text-2xl font-bold text-gray-900">73.8%</div>
    <div className="text-sm text-green-600">+3.2%</div>
  </div>
  <div className="text-center p-4 bg-white border rounded-lg">
    <div className="text-sm text-muted-foreground">2024</div>
    <div className="text-2xl font-bold text-gray-900">74.2%</div>
    <div className="text-sm text-green-600">+0.5%</div>
  </div>
</div>

                {/* Detailed Trend Analysis */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} name="Average Marks" />
                    <Line type="monotone" dataKey="passRate" stroke="#10b981" strokeWidth={2} name="Pass Rate" />
                  </LineChart>
                </ResponsiveContainer>

                {/* Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trend Insights</CardTitle>
                    <CardDescription>Key observations from performance data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span>Consistent improvement in average marks over semesters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span>Pass rate has increased by 7% over 6 semesters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>Computer Science department maintains highest performance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
