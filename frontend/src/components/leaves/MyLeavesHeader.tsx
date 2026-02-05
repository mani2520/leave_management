"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MyLeavesHeaderProps {
  onApplyLeave?: () => void;
}

const MyLeavesHeader = ({ onApplyLeave }: MyLeavesHeaderProps) => {
  return (
    <div className="border-b bg-card px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Leaves</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage your leave requests
          </p>
        </div>
        <Button aria-label="Apply for leave" onClick={onApplyLeave}>
          <Plus className="h-4 w-4 mr-2" aria-hidden />
          Apply Leave
        </Button>
      </div>
    </div>
  );
};

export default MyLeavesHeader;
