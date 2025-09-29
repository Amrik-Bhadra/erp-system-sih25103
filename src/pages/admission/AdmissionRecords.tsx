"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, BarChart3, TrendingUp, Users, Book, CreditCard } from "lucide-react";

// Mock data for charts
const applicationTrends = [
  { month: 'Jan', applications: 245, approved: 120 },
  { month: 'Feb', applications: 278, approved: 145 },
  { month: 'Mar', applications: 312, approved: 167 },
  { month: 'Apr', applications: 295, approved: 155 },
  { month: 'May', applications: 267, approved: 135 },
  { month: 'Jun', applications: 334, approved: 178 },
];

const courseWiseDistribution = [
  { name: 'Computer Science', applications: 450, approved: 220 },
  { name: 'Electrical', applications: 320, approved: 160 },
  { name: 'Mechanical', applications: 280, approved: 140 },
  { name: 'Civil', applications: 240, approved: 120 },
  { name: 'Electronics', applications: 180, approved: 90 },
];

const categoryDistribution = [
  { name: 'General', value: 45 },
  { name: 'OBC', value: 30 },
  { name: 'SC', value: 15 },
  { name: 'ST', value: 8 },
  { name: 'Other', value: 2 },
];

const feeCollectionData = [
  { month: 'Jan', collected: 1250000, target: 1500000 },
  { month: 'Feb', collected: 1420000, target: 1500000 },
  { month: 'Mar', collected: 1680000, target: 1500000 },
  { month: 'Apr', collected: 1550000, target: 1500000 },
  { month: 'May', collected: 1480000, target: 1500000 },
  { month: 'Jun', collected: 1750000, target: 1500000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function AdmissionReports() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleExport = (format: string) => {
    alert(`Exporting report in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Admission statistics and performance insights</p>
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
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="fees">Fee Reports</TabsTrigger>
          <TabsTrigger value="trends">Admission Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last year
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.5%</div>
                <p className="text-xs text-muted-foreground">
                  Applied vs Admitted
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fee Collected</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1.25Cr</div>
                <p className="text-xs text-muted-foreground">
                  Admission fees
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Processing</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2 days</div>
                <p className="text-xs text-muted-foreground">
                  Application to approval
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Application Trends
                </CardTitle>
                <CardDescription>Monthly application and approval patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={applicationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Applications by reservation category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Course-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Course-wise Performance</CardTitle>
              <CardDescription>Applications and approvals by course</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseWiseDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                  <Bar dataKey="approved" fill="#10b981" name="Approved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Analytics</CardTitle>
              <CardDescription>Detailed application statistics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Status Distribution</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Count</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Pending</TableCell>
                        <TableCell>234</TableCell>
                        <TableCell>18.8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Verified</TableCell>
                        <TableCell>321</TableCell>
                        <TableCell>25.8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Approved</TableCell>
                        <TableCell>567</TableCell>
                        <TableCell>45.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Rejected</TableCell>
                        <TableCell>123</TableCell>
                        <TableCell>9.9%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Top Sources</h3>
                  <div className="space-y-2">
                    {[
                      { source: 'Online Portal', count: 845, percent: 68 },
                      { source: 'Direct Application', count: 245, percent: 20 },
                      { source: 'Education Fair', count: 155, percent: 12 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{item.source}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{item.percent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Report */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Conversion Funnel</CardTitle>
                  <CardDescription>Application to admission conversion journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between py-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">1,245</div>
                      <div className="text-sm text-blue-600">Applications</div>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">890</div>
                      <div className="text-sm text-green-600">Verified</div>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">567</div>
                      <div className="text-sm text-purple-600">Approved</div>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">545</div>
                      <div className="text-sm text-orange-600">Fee Paid</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fee Reports Tab */}
        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Reports</CardTitle>
              <CardDescription>Admission fee collection and tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹1.25Cr</div>
                  <div className="text-sm text-blue-600">Total Collected</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹25L</div>
                  <div className="text-sm text-green-600">Pending Collection</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">92%</div>
                  <div className="text-sm text-yellow-600">Collection Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">₹50K</div>
                  <div className="text-sm text-purple-600">Avg. Refund</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Collection vs Target</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={feeCollectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="collected" fill="#10b981" name="Collected" />
                        <Bar dataKey="target" fill="#f59e0b" name="Target" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Online', value: 65 },
                            { name: 'Bank Transfer', value: 20 },
                            { name: 'Cash', value: 10 },
                            { name: 'Cheque', value: 5 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          <Cell fill="#0088FE" />
                          <Cell fill="#00C49F" />
                          <Cell fill="#FFBB28" />
                          <Cell fill="#FF8042" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Total Fees</TableHead>
                    <TableHead>Collected</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Collection %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseWiseDistribution.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>₹{(course.approved * 25000).toLocaleString()}</TableCell>
                      <TableCell>₹{(course.approved * 22500).toLocaleString()}</TableCell>
                      <TableCell>₹{(course.approved * 2500).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="default">90%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admission Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admission Trends Analysis</CardTitle>
              <CardDescription>Year-over-year comparison and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Year Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white border rounded-lg">
                    <div className="text-sm text-muted-foreground">2023</div>
                    <div className="text-2xl font-bold">1,112</div>
                    <div className="text-sm">Applications</div>
                  </div>
                  <div className="text-center p-4 bg-white border rounded-lg">
                    <div className="text-sm text-muted-foreground">2024</div>
                    <div className="text-2xl font-bold">1,245</div>
                    <div className="text-sm text-green-600">+12%</div>
                  </div>
                  <div className="text-center p-4 bg-white border rounded-lg">
                    <div className="text-sm text-muted-foreground">2025 (Projected)</div>
                    <div className="text-2xl font-bold">1,400</div>
                    <div className="text-sm text-blue-600">+12.5%</div>
                  </div>
                </div>

                {/* Geographic Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription>Applications by state and region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>State</TableHead>
                          <TableHead>Applications</TableHead>
                          <TableHead>Approved</TableHead>
                          <TableHead>Conversion Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Maharashtra</TableCell>
                          <TableCell>345</TableCell>
                          <TableCell>167</TableCell>
                          <TableCell>48.4%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Karnataka</TableCell>
                          <TableCell>278</TableCell>
                          <TableCell>134</TableCell>
                          <TableCell>48.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Tamil Nadu</TableCell>
                          <TableCell>198</TableCell>
                          <TableCell>89</TableCell>
                          <TableCell>45.0%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Delhi</TableCell>
                          <TableCell>156</TableCell>
                          <TableCell>72</TableCell>
                          <TableCell>46.2%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Seasonal Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Seasonal Application Patterns</CardTitle>
                    <CardDescription>Monthly application trends analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      Peak application periods: January-March, June-July
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={applicationTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="applications" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
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