"use client";

import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface LeaveFiltersProps {
  searchTerm: string;
  filter: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onExport?: () => void;
}

const LeaveFilters = ({
  searchTerm,
  filter,
  onSearchChange,
  onFilterChange,
  onExport,
}: LeaveFiltersProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="text"
              placeholder="Search leaves..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
              aria-label="Search leaves by type or reason"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filter} onValueChange={onFilterChange}>
              <SelectTrigger className="w-[150px]" aria-label="Filter by status">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              aria-label="Export leaves"
              onClick={onExport}
            >
              <Download className="h-4 w-4 mr-2" aria-hidden />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveFilters;
