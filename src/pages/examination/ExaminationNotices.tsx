"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Send, Bell, Mail, MessageSquare, Edit, Trash2, Eye } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'exam' | 'result' | 'schedule' | 'general' | 'urgent';
  targetAudience: string[];
  publishedBy: string;
  publishDate: Date;
  expiryDate: Date;
  status: 'draft' | 'published' | 'expired';
  attachments?: string[];
}

export function ExaminationNotices() {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'Semester 6 Final Exam Schedule Released',
      content: 'The final examination schedule for Semester 6 has been published. Students are advised to check their timetable and report any discrepancies.',
      category: 'exam',
      targetAudience: ['all-students', 'faculty'],
      publishedBy: 'Exam Controller',
      publishDate: new Date('2024-03-10'),
      expiryDate: new Date('2024-04-10'),
      status: 'published',
      attachments: ['timetable.pdf']
    },
    {
      id: '2',
      title: 'Revaluation Application Deadline Extended',
      content: 'The last date for submitting revaluation applications has been extended to March 20, 2024.',
      category: 'result',
      targetAudience: ['all-students'],
      publishedBy: 'Exam Department',
      publishDate: new Date('2024-03-08'),
      expiryDate: new Date('2024-03-20'),
      status: 'published'
    },
    {
      id: '3',
      title: 'Supplementary Exam Registration Open',
      content: 'Registration for supplementary examinations is now open. Eligible students must register through the student portal.',
      category: 'schedule',
      targetAudience: ['failed-students'],
      publishedBy: 'Exam Controller',
      publishDate: new Date('2024-03-05'),
      expiryDate: new Date('2024-03-25'),
      status: 'draft'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    category: 'general' as Notice['category'],
    targetAudience: [] as string[],
    expiryDate: ''
  });

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const publishedNotices = notices.filter(notice => notice.status === 'published');
  const draftNotices = notices.filter(notice => notice.status === 'draft');

  const getCategoryVariant = (category: string) => {
    switch (category) {
      case 'urgent': return 'destructive';
      case 'exam': return 'default';
      case 'result': return 'default';
      case 'schedule': return 'secondary';
      case 'general': return 'outline';
      default: return 'secondary';
    }
  };

  const handleCreateNotice = () => {
    if (newNotice.title && newNotice.content) {
      const notice: Notice = {
        id: (notices.length + 1).toString(),
        ...newNotice,
        publishedBy: 'Current User',
        publishDate: new Date(),
        expiryDate: new Date(newNotice.expiryDate),
        status: 'draft'
      };
      setNotices([...notices, notice]);
      setNewNotice({
        title: '', content: '', category: 'general', targetAudience: [], expiryDate: ''
      });
      alert("Notice created successfully!");
    }
  };

  const handlePublishNotice = (noticeId: string) => {
    setNotices(notices =>
      notices.map(notice =>
        notice.id === noticeId ? { ...notice, status: 'published' } : notice
      )
    );
    alert(`Notice published: ${noticeId}`);
  };

  const handleSendNotification = (noticeId: string) => {
    alert(`Sending notifications for notice: ${noticeId}`);
  };

  const handleDeleteNotice = (noticeId: string) => {
    setNotices(notices.filter(notice => notice.id !== noticeId));
    alert(`Notice deleted: ${noticeId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Examination Notices & Communication</h1>
          <p className="text-muted-foreground">Manage announcements and communication system</p>
        </div>
        <Button className="text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Notice
        </Button>
      </div>

      <Tabs defaultValue="published" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Published Notices</CardTitle>
              <CardDescription>Active announcements and notices</CardDescription>
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
                {publishedNotices.map((notice) => (
                  <Card key={notice.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold">{notice.title}</h4>
                            <Badge variant={getCategoryVariant(notice.category)} className="text-white">
                              {notice.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notice.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>By: {notice.publishedBy}</span>
                            <span>Published: {notice.publishDate.toLocaleDateString()}</span>
                            <span>Expires: {notice.expiryDate.toLocaleDateString()}</span>
                            <span>Target: {notice.targetAudience.join(', ')}</span>
                          </div>
                          {notice.attachments && notice.attachments.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              Attachments: {notice.attachments.join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleSendNotification(notice.id)} className="text-white">
                            <Send className="w-4 h-4 mr-1" />
                            Notify
                          </Button>
                          <Button variant="outline" size="sm" className="text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteNotice(notice.id)} className="text-white">
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

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Notice</CardTitle>
              <CardDescription>Create and publish examination announcements</CardDescription>
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
  <label className="text-sm font-medium">Category</label>
  <select
    className="w-full p-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800"
    value={newNotice.category}
    onChange={(e) => setNewNotice({...newNotice, category: e.target.value as Notice['category']})}
  >
    <option value="general" className="text-gray-900 dark:text-white">General</option>
    <option value="exam" className="text-gray-900 dark:text-white">Exam</option>
    <option value="result" className="text-gray-900 dark:text-white">Result</option>
    <option value="schedule" className="text-gray-900 dark:text-white">Schedule</option>
    <option value="urgent" className="text-gray-900 dark:text-white">Urgent</option>
  </select>
</div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <div className="flex flex-wrap gap-2">
                  {['all-students', 'faculty', 'failed-students', 'final-year', 'first-year'].map(audience => (
                    <label key={audience} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newNotice.targetAudience.includes(audience)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewNotice({
                              ...newNotice,
                              targetAudience: [...newNotice.targetAudience, audience]
                            });
                          } else {
                            setNewNotice({
                              ...newNotice,
                              targetAudience: newNotice.targetAudience.filter(a => a !== audience)
                            });
                          }
                        }}
                      />
                      <span className="text-sm">{audience}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content *</label>
                <Textarea
                  placeholder="Enter notice content"
                  rows={6}
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input
                  type="date"
                  value={newNotice.expiryDate}
                  onChange={(e) => setNewNotice({...newNotice, expiryDate: e.target.value})}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleCreateNotice} disabled={!newNotice.title || !newNotice.content} className="text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
                <Button variant="outline" className="text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Save & Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Communication Templates</CardTitle>
              <CardDescription>Pre-built templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
    <div className="flex items-center space-x-3">
      <Mail className="w-8 h-8 text-blue-500" />
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">Result Announcement</h4>
        <p className="text-sm text-muted-foreground">Template for result publication</p>
      </div>
    </div>
  </Card>

  <Card className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
    <div className="flex items-center space-x-3">
      <Bell className="w-8 h-8 text-green-500" />
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">Exam Schedule</h4>
        <p className="text-sm text-muted-foreground">Exam timetable announcement</p>
      </div>
    </div>
  </Card>

  <Card className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
    <div className="flex items-center space-x-3">
      <MessageSquare className="w-8 h-8 text-orange-500" />
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">Revaluation Notice</h4>
        <p className="text-sm text-muted-foreground">Revaluation application notice</p>
      </div>
    </div>
  </Card>

  <Card className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
    <div className="flex items-center space-x-3">
      <Send className="w-8 h-8 text-purple-500" />
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">Supplementary Exam</h4>
        <p className="text-sm text-muted-foreground">Supplementary exam registration</p>
      </div>
    </div>
  </Card>
</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Configure communication delivery methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-blue-500" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-muted-foreground">Send email notifications</p>
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="default" className="text-white">Active</Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-green-500" />
                <div>
                  <h4 className="font-semibold">SMS</h4>
                  <p className="text-sm text-muted-foreground">Send SMS alerts</p>
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="secondary" className="text-white">Inactive</Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-purple-500" />
                <div>
                  <h4 className="font-semibold">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Mobile app notifications</p>
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="default" className="text-white">Active</Badge>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}