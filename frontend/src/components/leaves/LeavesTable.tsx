"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import type { Leave } from "@/types";

export interface LeavesTableProps {
  leaves: Leave[];
  typeByName: Record<string, string>;
}

const formatDate = (dateStr: string) => {
  try {
    return format(parseISO(dateStr), "d MMM yyyy");
  } catch {
    return dateStr;
  }
};

const getStatusBadge = (status: string) => {
  const variantClass =
    status === "approved"
      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      : status === "pending"
        ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
        : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";

  return (
    <Badge variant="outline" className={variantClass}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const LeavesTable = ({ leaves, typeByName }: LeavesTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table
            className="w-full"
            role="table"
            aria-label="My leave requests"
          >
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Leave Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Days
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Reason
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Applied On
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Calendar
                      className="h-12 w-12 text-muted-foreground mx-auto mb-3"
                      aria-hidden
                    />
                    <p className="text-muted-foreground">No leaves found</p>
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center"
                          aria-hidden
                        >
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium">
                          {typeByName[leave.type] ?? leave.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(leave.startDate)} -{" "}
                      {formatDate(leave.endDate)}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {leave.days} day{leave.days > 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                      {leave.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(leave.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(leave.appliedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`View leave ${leave.id}`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeavesTable;
