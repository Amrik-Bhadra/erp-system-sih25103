"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Search, Bell, Plus, Edit, Trash2, Send, Calendar, Eye, EyeOff, Mail, MessageCircle } from "lucide-react";

export function AdmissionNotices() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    type: "info" as "info" | "warning" | "counseling" | "result",
    startDate: "",
    endDate: "",
    isActive: true,
    sendEmail: true,
    sendSMS: false
  });

  const [notices] = useState([
    {
      id: '1',
      title: 'Merit List Release - Computer Science',
      content: 'First merit list for B.Tech Computer Science will be released on February 15, 2024.',
      type: 'result',
      startDate: new Date('2024-02-10'),
      endDate: new Date('2024-02-20'),
      isActive: true,
      sentCount: 1245
    },
    {
      id: '2',
      title: 'Counseling Session Schedule',
      content: 'Counseling sessions for selected candidates will begin from February 20, 2024.',
      type: 'counseling',
      startDate: new Date('2024-02-05'),
      endDate: new Date('2024-02-25'),
      isActive: true,
      sentCount: 890
    },
    {
      id: '3',
      title: 'Document Verification Reminder',
      content: 'Selected candidates must complete document verification by February 28, 2024.',
      type: 'warning',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-28'),
      isActive: true,
      sentCount: 567
    }
  ]);

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeNotices = notices.filter(notice => notice.isActive);
  const expiredNotices = notices.filter(notice => !notice.isActive);

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'info': return 'default';
      case 'warning': return 'secondary';
      case 'counseling': return 'outline';
      case 'result': return 'default';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'counseling': return 'bg-purple-100 text-purple-800';
      case 'result': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateNotice = () => {
    if (newNotice.title && newNotice.content) {
      alert(`Notice created and sent to ${newNotice.sendEmail ? 'email' : ''} ${newNotice.sendSMS ? 'SMS' : ''}`);
      setNewNotice({
        title: "", content: "", type: "info", startDate: "", endDate: "", isActive: true,
        sendEmail: true, sendSMS: false
      });
    }
  };

  const handleSendNotice = (noticeId: string) => {
    alert(`Notice sent to all applicants! ID: ${noticeId}`);
  };

  const handleToggleActive = (noticeId: string) => {
    alert(`Notice status toggled! ID: ${noticeId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notices & Communication</h1>
          <p className="text-muted-foreground">Manage admission announcements and student communication</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Notices</TabsTrigger>
          <TabsTrigger value="create">Create Notice</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>

        {/* Active Notices Tab */}
        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Notices</CardTitle>
              <CardDescription>Currently active admission announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="space-y-4">
                {activeNotices.map((notice) => (
                  <Card key={notice.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold">{notice.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notice.type)}`}>
                              {notice.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notice.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Start: {notice.startDate.toLocaleDateString()}
                            </span>
                            {notice.endDate && (
                              <span className="flex items-center">
                                End: {notice.endDate.toLocaleDateString()}
                              </span>
                            )}
                            <span className="flex items-center">
                              <Send className="w-3 h-3 mr-1" />
                              Sent to: {notice.sentCount} students
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => handleSendNotice(notice.id)}>
                            <Send className="w-4 h-4 mr-1" />
                            Resend
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleToggleActive(notice.id)}>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Deactivate
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
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

        {/* Create Notice Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Notice</CardTitle>
              <CardDescription>Create and send admission announcements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Notice Title *</label>
                <Input
                  placeholder="Enter notice title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notice Content *</label>
                <Textarea
                  placeholder="Enter notice content..."
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notice Type</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newNotice.type}
                    onChange={(e) => setNewNotice({...newNotice, type: e.target.value as any})}
                  >
                    <option value="info">General Information</option>
                    <option value="warning">Warning/Alert</option>
                    <option value="counseling">Counseling Update</option>
                    <option value="result">Result/Merit List</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newNotice.isActive ? "active" : "inactive"}
                    onChange={(e) => setNewNotice({...newNotice, isActive: e.target.value === "active"})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={newNotice.startDate}
                    onChange={(e) => setNewNotice({...newNotice, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date (Optional)</label>
                  <Input
                    type="date"
                    value={newNotice.endDate}
                    onChange={(e) => setNewNotice({...newNotice, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Delivery Methods</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newNotice.sendEmail}
                      onCheckedChange={(checked) => setNewNotice({...newNotice, sendEmail: checked})}
                    />
                    <label className="text-sm flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newNotice.sendSMS}
                      onCheckedChange={(checked) => setNewNotice({...newNotice, sendSMS: checked})}
                    />
                    <label className="text-sm flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      SMS
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleCreateNotice} disabled={!newNotice.title || !newNotice.content}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Notice
                </Button>
                <Button variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Create & Send Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Communication Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Communication Statistics</CardTitle>
              <CardDescription>Message delivery and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1,245</div>
                  <div className="text-sm text-blue-600">Total Sent</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-green-600">Delivery Rate</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">45%</div>
                  <div className="text-sm text-yellow-600">Open Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">23</div>
                  <div className="text-sm text-purple-600">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Templates</CardTitle>
              <CardDescription>Pre-defined templates for common scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Merit List Release</div>
                    <div className="text-sm text-muted-foreground">Announce merit list publication</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Counseling Schedule</div>
                    <div className="text-sm text-muted-foreground">Counseling session details</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Document Reminder</div>
                    <div className="text-sm text-muted-foreground">Document verification reminder</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Fee Payment</div>
                    <div className="text-sm text-muted-foreground">Fee payment deadline</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Admission Confirmation</div>
                    <div className="text-sm text-muted-foreground">Final admission confirmation</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Welcome Message</div>
                    <div className="text-sm text-muted-foreground">New student welcome</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Archive Tab */}
        <TabsContent value="archive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notice Archive</CardTitle>
              <CardDescription>Expired and inactive notices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiredNotices.map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">{notice.title}</TableCell>
                      <TableCell>
                        <Badge variant={getTypeVariant(notice.type)}>
                          {notice.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{notice.startDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        {notice.endDate ? notice.endDate.toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>{notice.sentCount} students</TableCell>
                      <TableCell>
                        <Badge variant="outline">Expired</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleToggleActive(notice.id)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Activate
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
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
      </Tabs>
    </div>
  );
}