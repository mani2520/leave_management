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
    <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-8">
      {stats.map((stat) => {
        const Icon = STAT_ICONS[stat.key];
        const config = STAT_CONFIG[stat.key];
        if (!config || !Icon) return null;

        return (
          <Card
            key={stat.key}
            className="shadow-lg hover:shadow-xl p-3 border-0 rounded-xl overflow-hidden transition-shadow duration-300"
            style={{ backgroundColor: config.bgColor }}
          >
            <CardContent className="relative p-6">
              <div className="flex items-center gap-5">
                <div className="relative flex justify-center items-center shrink-0">
                  <CircularProgress
                    percentage={stat.percentage}
                    strokeColor={config.progressColor}
                    size={64}
                    strokeWidth={5}
                  />
                  <span className="absolute font-bold text-white text-sm">
                    {stat.key === "total" ? stat.value : `${stat.percentage}%`}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-2xl tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 font-medium text-white/90 text-sm">
                    {config.label}
                  </p>
                </div>
              </div>
              <div
                className="top-1/2 right-[-40px] absolute opacity-[0.12] -translate-y-1/2"
                aria-hidden
              >
                <Icon className="w-24 h-24 text-white" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LeaveStatCards;
