import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Clock, FileText, Send } from 'lucide-react';
import db from '../../../../../db.json'; // Importing directly as mock DB

export default function ApplyLeavePage() {
  // Mock current user
  const currentUser = db.users.find(u => u.id === "1");
  const leaveBalance = db.leaveBalances.find(l => l.userId === currentUser?.id);
  const leaveTypes = db.leaveTypes;

  // Icons mapping
  const balanceIcons = {
    sick: "🚑",
    casual: "🏖️",
    annual: "✈️",
    unpaid: "💸",
    maternityPaternity: "👶",
    compOff: "🕒",
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Apply for Leave</h1>
        <p className="text-muted-foreground">
          View your balance and submit a new leave request.
        </p>
      </div>

      <Separator />

      {/* Leave Balances Grid */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Leave Balance
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {leaveBalance && Object.entries(leaveBalance).map(([key, value]) => {
            if (['userId', 'id', 'total'].includes(key)) return null;
            return (
              <Card key={key} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider flex justify-between">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                    <span className="text-xl">{balanceIcons[key as keyof typeof balanceIcons] || "📅"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{value}</div>
                  <p className="text-xs text-muted-foreground mt-1">days available</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Apply Leave Form */}
      <section className="grid md:grid-cols-3 gap-8 mt-4">
        
        {/* Form Area */}
        <Card className="md:col-span-2 border-none shadow-xl bg-gradient-to-br from-card to-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="w-6 h-6 text-primary" />
              New Request
            </CardTitle>
            <CardDescription>
              Fill in the details below to submit your leave request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leave-type">Leave Type</Label>
                <Select>
                  <SelectTrigger id="leave-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((type) => (
                      <SelectItem key={type.id} value={type.code}>
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                           {type.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">From Date</Label>
                <Input type="date" id="start-date" className="cursor-pointer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">To Date</Label>
                <Input type="date" id="end-date" className="cursor-pointer" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea 
                id="reason" 
                placeholder="Please describe the reason for your leave..." 
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button size="lg" className="w-full md:w-auto gap-2 text-base">
                <Send className="w-4 h-4" />
                Submit Request
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Side Info / Guidelines */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-muted-foreground">
              <p>• <strong>Sick Leave:</strong> Can be taken without prior notice for emergencies.</p>
              <p>• <strong>Casual Leave:</strong> Requires approval at least 2 days in advance.</p>
              <p>• <strong>Annual Leave:</strong> Plan your holidays in advance to ensure team availability.</p>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
               <CardTitle className="text-lg">Upcoming Holidays</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                {db.holidays.slice(0, 3).map(holiday => (
                  <div key={holiday.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <CalendarDays className="w-4 h-4 text-muted-foreground" />
                       <span className="font-medium">{holiday.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(holiday.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ))}
             </CardContent>
          </Card>
        </div>

      </section>
    </div>
  );
}
