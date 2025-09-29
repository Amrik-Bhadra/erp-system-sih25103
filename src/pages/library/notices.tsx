"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Send,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import { mockNotices } from "@/data/mockData";

type NoticeType = "info" | "warning" | "holiday" | "new-arrival";

export function Notices() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    type: "info" as NoticeType,
    startDate: "",
    endDate: "",
    isActive: true,
  });

  // const filteredNotices = mockNotices.filter(notice =>
  //   notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const activeNotices = mockNotices.filter((notice) => notice.isActive);
  const expiredNotices = mockNotices.filter((notice) => !notice.isActive);

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "info":
        return "default";
      case "warning":
        return "secondary";
      case "holiday":
        return "outline";
      case "new-arrival":
        return "default";
      default:
        return "default";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "holiday":
        return "bg-purple-100 text-purple-800";
      case "new-arrival":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateNotice = () => {
    if (newNotice.title && newNotice.content) {
      alert(
        `Notice created!\nTitle: ${newNotice.title}\nType: ${newNotice.type}`
      );
      setNewNotice({
        title: "",
        content: "",
        type: "info",
        startDate: "",
        endDate: "",
        isActive: true,
      });
    }
  };

  const handleToggleActive = (noticeId: string) => {
    alert(`Notice status toggled! ID: ${noticeId}`);
  };

  const handleDeleteNotice = (noticeId: string) => {
    alert(`Notice deleted! ID: ${noticeId}`);
  };

  const handleSendAlert = (noticeId: string) => {
    alert(`Alert sent to students! Notice ID: ${noticeId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notices & Announcements</h1>
          <p className="text-muted-foreground">
            Manage library notices and student alerts
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Notices</TabsTrigger>
          <TabsTrigger value="create">Create Notice</TabsTrigger>
          <TabsTrigger value="alerts">Automatic Alerts</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>

        {/* Active Notices Tab */}
        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Notices</CardTitle>
              <CardDescription>
                Currently active library announcements
              </CardDescription>
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
                  <Card
                    key={notice.id}
                    className="border-l-4 border-l-blue-500"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold">{notice.title}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                notice.type
                              )}`}
                            >
                              {notice.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notice.content}
                          </p>
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
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendAlert(notice.id)}
                          >
                            <Send className="w-4 h-4 mr-1" />
                            Send Alert
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleActive(notice.id)}
                          >
                            <EyeOff className="w-4 h-4 mr-1" />
                            Deactivate
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteNotice(notice.id)}
                          >
                            <Trash2 className="w-4 h-4" />
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
              <CardDescription>
                Create new library announcements and notices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Notice Title *</label>
                <Input
                  placeholder="Enter notice title"
                  value={newNotice.title}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notice Content *</label>
                <Textarea
                  placeholder="Enter notice content..."
                  value={newNotice.content}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, content: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notice Type</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newNotice.type}
                    onChange={(e) =>
                      setNewNotice({
                        ...newNotice,
                        type: e.target.value as NoticeType,
                      })
                    }
                  >
                    <option value="info">General Information</option>
                    <option value="warning">Warning/Alert</option>
                    <option value="holiday">Holiday Notice</option>
                    <option value="new-arrival">New Arrivals</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newNotice.isActive ? "active" : "inactive"}
                    onChange={(e) =>
                      setNewNotice({
                        ...newNotice,
                        isActive: e.target.value === "active",
                      })
                    }
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
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    End Date (Optional)
                  </label>
                  <Input
                    type="date"
                    value={newNotice.endDate}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleCreateNotice}
                  disabled={!newNotice.title || !newNotice.content}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Notice
                </Button>
                <Button variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Create & Send Alert
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notice Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>
                Pre-defined notice templates for common scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Holiday Notice</div>
                    <div className="text-sm text-muted-foreground">
                      Library closure announcement
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Maintenance Alert</div>
                    <div className="text-sm text-muted-foreground">
                      System downtime notice
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">New Arrivals</div>
                    <div className="text-sm text-muted-foreground">
                      New books announcement
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Due Reminder</div>
                    <div className="text-sm text-muted-foreground">
                      Book return reminder
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automatic Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Alert System</CardTitle>
              <CardDescription>
                Configure automatic notifications for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Due Date Reminders */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-semibold">Due Date Reminders</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatic reminders for upcoming due dates
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Sent 3 days before due date • 245 students notified this
                      month
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">Active</Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                {/* Overdue Alerts */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-semibold">Overdue Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Notifications for overdue books
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Sent daily for overdue items • 23 active overdue cases
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">Active</Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                {/* Reservation Ready */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-semibold">Reservation Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify students when reserved books are available
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Sent when book becomes available • 12 reservations this
                      month
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">Active</Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                {/* Fine Notifications */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-semibold">Fine Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Alert students about pending fines
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Sent weekly • ₹12,500 pending fines
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Inactive</Badge>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </div>
              </div>

              {/* Alert Statistics */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">1,245</div>
                    <div className="text-sm text-muted-foreground">
                      Alerts Sent Today
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">
                      Delivery Rate
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">45</div>
                    <div className="text-sm text-muted-foreground">
                      Pending Notifications
                    </div>
                  </CardContent>
                </Card>
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
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiredNotices.map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">
                        {notice.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getTypeVariant(notice.type)}>
                          {notice.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {notice.startDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {notice.endDate
                          ? notice.endDate.toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Expired</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleActive(notice.id)}
                          >
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
