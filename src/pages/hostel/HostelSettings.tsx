import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { HostelRoomsTab } from "@/components/hostel/HostelRoomTab";

const HostelSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Hostel Settings / Configuration</h2>

      <Tabs defaultValue="hostel" className="w-full">
        <TabsList>
          <TabsTrigger value="hostel">Hostel & Rooms</TabsTrigger>
          <TabsTrigger value="rules">Allocation Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* === Hostel & Room Settings === */}
        <HostelRoomsTab/>

        {/* === Allocation Rules === */}
        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Allocation Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Medical Priority */}
              <div className="flex items-center gap-3">
                <Checkbox id="medical" defaultChecked />
                <label htmlFor="medical" className="font-medium">
                  Medical Priority
                </label>
              </div>

              {/* Quota */}
              <div>
                <label className="block font-medium mb-1">
                  Quota Allocation (%)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Input
                    placeholder="General %"
                    type="number"
                    defaultValue={50}
                  />
                  <Input placeholder="OBC %" type="number" defaultValue={27} />
                  <Input placeholder="SC %" type="number" defaultValue={15} />
                  <Input placeholder="ST %" type="number" defaultValue={8} />
                </div>
              </div>

              {/* Merit */}
              <div>
                <label className="block font-medium mb-1">
                  Merit-based Priority
                </label>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="mt-2 text-white">
                <Save className="w-4 h-4" /> Save Rules
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === Notification Templates === */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allocation">Room Allocation</SelectItem>
                  <SelectItem value="dues">Dues Reminder</SelectItem>
                  <SelectItem value="exit">Exit Clearance</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Subject"
                defaultValue="Hostel Allocation Confirmation"
              />
              <Textarea
                rows={6}
                placeholder="Write your message here..."
                defaultValue={`Dear {{studentName}},\n\nYou have been allocated {{roomType}} in {{hostelName}}.\nPlease complete the due payment by {{dueDate}}.`}
              />

              <div className="flex gap-2">
                <Button className="text-white">
                  <Save className="w-4 h-4 mr-1" /> Save Template
                </Button>
                <Button variant="secondary">Reset to Default</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostelSettings;
