"use client";

import { Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLeaves, getLeaveTypes } from "@/lib/api";
import type { Leave, LeaveType } from "@/types";
import {
  MyLeavesHeader,
  LeaveStatCards,
  LeaveFilters,
  LeavesTable,
} from "@/components/leaves";

const CURRENT_USER_ID = "1";

const LeavesPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: myLeaves = [], isLoading: leavesLoading } = useQuery({
    queryKey: ["leaves", CURRENT_USER_ID],
    queryFn: () => getLeaves(CURRENT_USER_ID),
  });

  const { data: leaveTypes = [], isLoading: leaveTypesLoading } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: () => getLeaveTypes(),
  });

  const typeByName = useMemo(() => {
    return Object.fromEntries(
      leaveTypes.map((lt: LeaveType) => [lt.code, lt.name])
    ) as Record<string, string>;
  }, [leaveTypes]);

  const stats = useMemo(() => {
    const total = myLeaves.length;
    const approved = myLeaves.filter((l) => l.status === "approved").length;
    const pending = myLeaves.filter((l) => l.status === "pending").length;
    const rejected = myLeaves.filter((l) => l.status === "rejected").length;
    const pct = (n: number) =>
      total > 0 ? Math.round((n / total) * 100) : 0;
    return [
      {
        key: "total",
        value: String(total),
        percentage: 100,
      },
      {
        key: "approved",
        value: String(approved),
        percentage: pct(approved),
      },
      {
        key: "pending",
        value: String(pending),
        percentage: pct(pending),
      },
      {
        key: "rejected",
        value: String(rejected),
        percentage: pct(rejected),
      },
    ];
  }, [myLeaves]);

  const filteredLeaves = useMemo(() => {
    return myLeaves.filter((leave: Leave) => {
      const typeName = typeByName[leave.type] ?? leave.type;
      const matchesFilter = filter === "all" || leave.status === filter;
      const matchesSearch =
        typeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [myLeaves, filter, searchTerm, typeByName]);

  const isLoading = leavesLoading || leaveTypesLoading;

  const handleApplyLeave = () => {
    // TODO: Navigate to apply leave or open modal
  };

  const handleExport = () => {
    // TODO: Implement export
  };

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        aria-label="Loading leaves"
      >
        <Loader2
          className="w-10 h-10 animate-spin text-primary"
          aria-hidden
        />
        <span className="sr-only">Loading leaves...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground transition-colors duration-300">
      <MyLeavesHeader onApplyLeave={handleApplyLeave} />

      <div className="bg-background p-8">
        <LeaveStatCards stats={stats} />

        <LeaveFilters
          searchTerm={searchTerm}
          filter={filter}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilter}
          onExport={handleExport}
        />

        <LeavesTable leaves={filteredLeaves} typeByName={typeByName} />
      </div>
    </div>
  );
};

export default LeavesPage;
