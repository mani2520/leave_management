"use client";

import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LEAVE_CARD_COLORS } from "@/lib/leave-allocations";

const STAT_ICONS: Record<string, LucideIcon> = {
  total: Calendar,
  approved: CheckCircle,
  pending: Clock,
  rejected: XCircle,
};

// Dashboard leave card colors - royalBlue, emerald, lavender, orange, red
const STAT_CONFIG: Record<
  string,
  { label: string; bgColor: string; progressColor: string }
> = {
  total: {
    label: "Total Applied",
    bgColor: LEAVE_CARD_COLORS.royalBlue,
    progressColor: "#93c5fd",
  },
  approved: {
    label: "Approved",
    bgColor: LEAVE_CARD_COLORS.emerald,
    progressColor: "#5eead4",
  },
  pending: {
    label: "Pending",
    bgColor: LEAVE_CARD_COLORS.orange,
    progressColor: "#fde047",
  },
  rejected: {
    label: "Rejected",
    bgColor: LEAVE_CARD_COLORS.red,
    progressColor: "#fda4af",
  },
};

const CircularProgress = ({
  percentage,
  strokeColor,
  size = 56,
  strokeWidth = 4,
}: {
  percentage: number;
  strokeColor: string;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
};

export interface LeaveStatItem {
  key: string;
  value: string;
  percentage: number;
}

export interface LeaveStatCardsProps {
  stats: LeaveStatItem[];
}

const LeaveStatCards = ({ stats }: LeaveStatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = STAT_ICONS[stat.key];
        const config = STAT_CONFIG[stat.key];
        if (!config || !Icon) return null;

        return (
          <Card
            key={stat.key}
            className="overflow-hidden p-3 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl"
            style={{ backgroundColor: config.bgColor }}
          >
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-5">
                <div className="relative shrink-0 flex items-center justify-center">
                  <CircularProgress
                    percentage={stat.percentage}
                    strokeColor={config.progressColor}
                    size={64}
                    strokeWidth={5}
                  />
                  <span className="absolute text-sm font-bold text-white">
                    {stat.key === "total"
                      ? stat.value
                      : `${stat.percentage}%`}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-white/90 mt-0.5">
                    {config.label}
                  </p>
                </div>
              </div>
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-[0.12]"
                aria-hidden
              >
                <Icon className="h-24 w-24 text-white" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LeaveStatCards;
