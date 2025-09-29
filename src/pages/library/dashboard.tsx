"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Users, AlertTriangle, DollarSign, Plus } from "lucide-react";
import { mockStats, mockBorrowRecords, mockNotices } from "@/data/mockData";

export function LibraryDashboard() {
  const stats = mockStats;

  const quickActions = [
    { name: "Add Book", icon: Plus, href: "#book-management" },
    { name: "Issue Book", icon: Book, href: "#issue-return" },
    { name: "View Complaints", icon: AlertTriangle, href: "#notices" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBooks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.availableBooks} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borrowed Items</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.borrowedBooks}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="destructive" className="mr-1">{stats.overdueBooks} overdue</Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Fines</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.todaysFines.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ₹{stats.monthlyFines.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Registered students
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button key={action.name} variant="outline" className="w-full justify-start">
                  <Icon className="w-4 h-4 mr-2" />
                  {action.name}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Borrowings</CardTitle>
            <CardDescription>Latest book transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBorrowRecords.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Book className="w-8 h-8 p-1 bg-blue-100 text-blue-600 rounded" />
                    <div>
                      <p className="text-sm font-medium">{record.bookTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        Issued to {record.studentName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Due: {record.dueDate.toLocaleDateString()}
                    </p>
                    <Badge 
                      variant={record.status === 'overdue' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {record.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notices */}
      <Card>
        <CardHeader>
          <CardTitle>Active Notices</CardTitle>
          <CardDescription>Current library announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockNotices.filter(notice => notice.isActive).map((notice) => (
              <div key={notice.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium">{notice.title}</h4>
                  <p className="text-sm text-muted-foreground">{notice.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Until: {notice.endDate ? notice.endDate.toLocaleDateString() : 'Ongoing'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}