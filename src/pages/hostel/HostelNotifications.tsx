"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertCircle,
  Wrench,
  LogOut,
  Bell,
} from "lucide-react";

const notifications = {
  all: [
    // Applications
    {
      id: 1,
      type: "application",
      icon: FileText,
      message: "New hostel application received from Ravi Sharma.",
      action: "Review Application",
      time: "2h ago",
    },
    {
      id: 2,
      type: "application",
      icon: FileText,
      message: "Application submitted by Anjali Patel for Room 204.",
      action: "Review Application",
      time: "5h ago",
    },

    // Payments
    {
      id: 3,
      type: "payment",
      icon: AlertCircle,
      message: "Hostel fee pending for Priya Singh (Room 201).",
      action: "Send Reminder",
      time: "1 day overdue",
    },
    {
      id: 4,
      type: "payment",
      icon: AlertCircle,
      message: "Overdue fine: Late payment from Aarav Kumar (Room 310).",
      action: "Send Reminder",
      time: "3 days overdue",
    },

    // Complaints
    {
      id: 5,
      type: "complaint",
      icon: Wrench,
      message: "Complaint requires action: Water leakage in Room 105.",
      action: "Assign Staff",
      time: "30m ago",
    },
    {
      id: 6,
      type: "complaint",
      icon: Wrench,
      message: "Complaint resolved: WiFi issue reported by Sneha Gupta.",
      action: "Mark as Checked",
      time: "1h ago",
    },

    // Exit Requests
    {
      id: 7,
      type: "exit",
      icon: LogOut,
      message: "Exit request from Neha Verma (Room 305).",
      action: "Verify & Approve",
      time: "Pending since yesterday",
    },
    {
      id: 8,
      type: "exit",
      icon: LogOut,
      message: "Exit request submitted by Karan Malhotra (Room 108).",
      action: "Verify & Approve",
      time: "2 days ago",
    },
  ],
};

const categories = [
  { key: "all", label: "All", icon: Bell },
  { key: "application", label: "Applications", icon: FileText },
  { key: "payment", label: "Payments", icon: AlertCircle },
  { key: "complaint", label: "Complaints", icon: Wrench },
  { key: "exit", label: "Exit Requests", icon: LogOut },
];

const NotificationCard = ({ icon: Icon, message, action, time }) => (
  <Card className="mb-3 shadow-sm hover:shadow-md transition rounded-xl">
    <CardContent className="flex items-center justify-between px-4">
      <div className="flex items-center space-x-3">
        <div className="bg-gray-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-gray-700" />
        </div>
        <div>
          <p className="text-sm font-medium">{message}</p>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
      </div>
      <Button variant="default" size="sm" className="text-white">
        {action}
      </Button>
    </CardContent>
  </Card>
);

const HostelNotifications = () => {
  return (
    <div className="">

      {/* Tabs for categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.key}
              value={cat.key}
              className="flex items-center space-x-2"
            >
              <cat.icon className="h-4 w-4" />
              <span>{cat.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.key} value={cat.key}>
            {notifications.all
              .filter((n) => cat.key === "all" || n.type === cat.key)
              .map((n) => (
                <NotificationCard key={n.id} {...n} />
              ))}
            {notifications.all.filter(
              (n) => cat.key === "all" || n.type === cat.key
            ).length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                No notifications in this category.
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HostelNotifications;
