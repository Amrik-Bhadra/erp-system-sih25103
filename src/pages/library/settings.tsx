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
import { Search, Save, Plus, Trash2, Edit, Users, Book, Bell, Settings as SettingsIcon, Download, Upload } from "lucide-react";

export function Settings() {
  const [activeTab, setActiveTab] = useState("borrowing");
  const [categories, setCategories] = useState([
    "Computer Science", "Literature", "Science", "Engineering", "Mathematics", "History", "Arts"
  ]);
  const [newCategory, setNewCategory] = useState("");
  
  const [userRoles, setUserRoles] = useState([
    { id: 1, name: "Admin", permissions: ["all"], users: 2 },
    { id: 2, name: "Librarian", permissions: ["books", "issues", "students", "fines"], users: 5 },
    { id: 3, name: "Assistant Librarian", permissions: ["books", "issues"], users: 8 },
    { id: 4, name: "View Only", permissions: ["reports"], users: 3 },
  ]);

  const [notificationTemplates, setNotificationTemplates] = useState([
    {
      id: 1,
      name: "Due Reminder",
      subject: "Book Due Date Reminder",
      body: "Dear {student_name}, your book '{book_title}' is due on {due_date}. Please return it on time to avoid fines.",
      enabled: true
    },
    {
      id: 2,
      name: "Overdue Alert",
      subject: "Overdue Book Notice",
      body: "Dear {student_name}, your book '{book_title}' is overdue. Current fine: ₹{fine_amount}. Please return it immediately.",
      enabled: true
    },
    {
      id: 3,
      name: "Reservation Ready",
      subject: "Reserved Book Available",
      body: "Dear {student_name}, your reserved book '{book_title}' is now available for pickup.",
      enabled: true
    },
    {
      id: 4,
      name: "Fine Notification",
      subject: "Library Fine Notice",
      body: "Dear {student_name}, you have a pending fine of ₹{fine_amount}. Please clear it at the earliest.",
      enabled: false
    }
  ]);

  const [borrowingRules, setBorrowingRules] = useState({
    maxBooks: 5,
    borrowingPeriod: 14,
    renewalPeriod: 7,
    finePerDay: 10,
    maxRenewals: 2,
    reservationPeriod: 3
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    dueReminderDays: 3,
    autoSendOverdue: true
  });

  const [newRole, setNewRole] = useState({
    name: "",
    basePermissions: ""
  });

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  const handleToggleTemplate = (templateId: number) => {
    setNotificationTemplates(templates =>
      templates.map(template =>
        template.id === templateId
          ? { ...template, enabled: !template.enabled }
          : template
      )
    );
  };

  const handleCreateRole = () => {
    if (newRole.name) {
      alert(`New role created: ${newRole.name}`);
      setNewRole({ name: "", basePermissions: "" });
    }
  };

  const handleExportCategories = () => {
    alert("Categories exported successfully!");
  };

  const handleImportCategories = () => {
    alert("Categories imported successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Library Settings</h1>
          <p className="text-muted-foreground">Configure library rules and system settings</p>
        </div>
        <Button onClick={handleSaveSettings} className="text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="borrowing">Borrowing Rules</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="users">User Access</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Borrowing Rules Tab */}
        <TabsContent value="borrowing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing Rules Configuration</CardTitle>
              <CardDescription>Set rules and limits for book borrowing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Books per Student</label>
                  <Input
                    type="number"
                    value={borrowingRules.maxBooks}
                    onChange={(e) => setBorrowingRules({...borrowingRules, maxBooks: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of books a student can borrow at once
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Borrowing Period (Days)</label>
                  <Input
                    type="number"
                    value={borrowingRules.borrowingPeriod}
                    onChange={(e) => setBorrowingRules({...borrowingRules, borrowingPeriod: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of days a book can be borrowed
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Renewal Period (Days)</label>
                  <Input
                    type="number"
                    value={borrowingRules.renewalPeriod}
                    onChange={(e) => setBorrowingRules({...borrowingRules, renewalPeriod: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of days added when renewing a book
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Fine per Day (₹)</label>
                  <Input
                    type="number"
                    value={borrowingRules.finePerDay}
                    onChange={(e) => setBorrowingRules({...borrowingRules, finePerDay: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Fine amount charged per day for overdue books
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Renewals</label>
                  <Input
                    type="number"
                    value={borrowingRules.maxRenewals}
                    onChange={(e) => setBorrowingRules({...borrowingRules, maxRenewals: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of times a book can be renewed
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Reservation Hold (Days)</label>
                  <Input
                    type="number"
                    value={borrowingRules.reservationPeriod}
                    onChange={(e) => setBorrowingRules({...borrowingRules, reservationPeriod: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of days a reserved book is held for pickup
                  </p>
                </div>
              </div>

              {/* Rules Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Rules Summary</CardTitle>
                  <CardDescription>Current borrowing rules overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="font-medium">Books Limit</div>
                      <div>{borrowingRules.maxBooks} books per student</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Borrowing Period</div>
                      <div>{borrowingRules.borrowingPeriod} days</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Fine Rate</div>
                      <div>₹{borrowingRules.finePerDay} per day</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Renewals</div>
                      <div>{borrowingRules.maxRenewals} times max</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Renewal Period</div>
                      <div>{borrowingRules.renewalPeriod} days</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Reservation Hold</div>
                      <div>{borrowingRules.reservationPeriod} days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Categories & Genres</CardTitle>
              <CardDescription>Manage book categories and genres</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add new category..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="max-w-sm"
                />
                <Button onClick={handleAddCategory} disabled={!newCategory}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Book Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category, index) => (
                      <TableRow key={category}>
                        <TableCell className="font-medium">{category}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{Math.floor(Math.random() * 50) + 10}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteCategory(category)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Operations */}
          <Card>
            <CardHeader>
              <CardTitle>Bulk Operations</CardTitle>
              <CardDescription>Manage categories in bulk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleExportCategories}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Categories
                </Button>
                <Button variant="outline" onClick={handleImportCategories}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Categories
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Access Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Access Roles</CardTitle>
              <CardDescription>Manage librarian and staff access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{role.users} users</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Permissions
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add New Role */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Role</CardTitle>
              <CardDescription>Create custom access roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role Name</label>
                  <Input 
                    placeholder="Enter role name" 
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Permissions</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newRole.basePermissions}
                    onChange={(e) => setNewRole({...newRole, basePermissions: e.target.value})}
                  >
                    <option value="">Select base permissions</option>
                    <option value="librarian">Librarian</option>
                    <option value="assistant">Assistant Librarian</option>
                    <option value="view">View Only</option>
                  </select>
                </div>
              </div>
              <Button className="mt-4" onClick={handleCreateRole} disabled={!newRole.name}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Role
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Manage email and notification templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold">{template.name}</h4>
                            <Switch
                              checked={template.enabled}
                              onCheckedChange={() => handleToggleTemplate(template.id)}
                            />
                            <Badge variant={template.enabled ? "default" : "secondary"}>
                              {template.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Subject: {template.subject}</p>
                            <p className="text-sm text-muted-foreground mt-1">{template.body}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Available variables: {"{student_name}"}, {"{book_title}"}, {"{due_date}"}, {"{fine_amount}"}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Bell className="w-4 h-4 mr-1" />
                            Test
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Send notifications via email to students
                  </div>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked: any) => setNotificationSettings({
                    ...notificationSettings, 
                    emailNotifications: checked
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">SMS Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Send SMS alerts for urgent notifications
                  </div>
                </div>
                <Switch 
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked: any) => setNotificationSettings({
                    ...notificationSettings, 
                    smsNotifications: checked
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Send push notifications to mobile app users
                  </div>
                </div>
                <Switch 
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings, 
                    pushNotifications: checked
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Due Date Reminder (Days Before)</div>
                  <div className="text-sm text-muted-foreground">
                    Send reminder notifications before due date
                  </div>
                </div>
                <Input
                  type="number"
                  value={notificationSettings.dueReminderDays}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    dueReminderDays: parseInt(e.target.value) || 0
                  })}
                  className="w-20"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Auto-send Overdue Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically send alerts for overdue books daily
                  </div>
                </div>
                <Switch 
                  checked={notificationSettings.autoSendOverdue}
                  onCheckedChange={(checked: any) => setNotificationSettings({
                    ...notificationSettings, 
                    autoSendOverdue: checked
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Statistics</CardTitle>
              <CardDescription>Overview of notification performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1,245</div>
                  <div className="text-sm text-blue-600">Sent Today</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-green-600">Delivery Rate</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">23</div>
                  <div className="text-sm text-yellow-600">Failed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">45</div>
                  <div className="text-sm text-purple-600">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}