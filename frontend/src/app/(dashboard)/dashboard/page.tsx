"use client";

import React, { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  format,
  parseISO,
  isAfter,
  isToday,
  subMonths,
  startOfMonth,
} from "date-fns";
import {
  getLeaveBalanceByUserId,
  getLeaveTypes,
  getLeaves,
  getHolidays,
  getUser,
  getUsers,
  getApplyLeaveMessages,
} from "@/lib/api";
import type { Leave, LeaveType, User } from "@/types";
import { LEAVE_ALLOCATIONS, LEAVE_CARD_COLORS } from "@/lib/leave-allocations";
import {
  WelcomeCard,
  TotalLeaveBreakdownCard,
  LeaveMetricCards,
  RecentApply,
  UpcomingHolidays,
  TeamOnLeave,
} from "@/components/dashboard";

const CURRENT_USER_ID = "1";

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const getTodayDate = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const weekday = today.toLocaleDateString("en-IN", { weekday: "long" });
  return `Today is ${weekday} (${dd}-${mm}-${yyyy})`;
};

const Dashboard = () => {
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ["user", CURRENT_USER_ID],
    queryFn: () => getUser(CURRENT_USER_ID),
  });

  const { data: leaveBalance, isLoading: balanceLoading } = useQuery({
    queryKey: ["leaveBalance", CURRENT_USER_ID],
    queryFn: () => getLeaveBalanceByUserId(CURRENT_USER_ID),
  });

  const { data: leaveTypes = [], isLoading: leaveTypesLoading } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: () => getLeaveTypes(),
  });

  const { data: myLeaves = [], isLoading: leavesLoading } = useQuery({
    queryKey: ["leaves", CURRENT_USER_ID],
    queryFn: () => getLeaves(CURRENT_USER_ID),
  });

  const { data: allLeaves = [], isLoading: allLeavesLoading } = useQuery({
    queryKey: ["leaves"],
    queryFn: () => getLeaves(),
  });

  const { data: holidays = [], isLoading: holidaysLoading } = useQuery({
    queryKey: ["holidays"],
    queryFn: () => getHolidays(),
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const { data: applyLeaveMessages = [], isLoading: messagesLoading } =
    useQuery({
      queryKey: ["applyLeaveMessages"],
      queryFn: () => getApplyLeaveMessages(),
    });

  const last12MonthsByType = useMemo(() => {
    const today = new Date();
    const eligible = myLeaves.filter(
      (l: Leave) => l.status === "approved" || l.status === "pending",
    );
    const keys: string[] = [];
    for (let i = 11; i >= 0; i--) {
      const start = startOfMonth(subMonths(today, i));
      keys.push(format(start, "yyyy-MM"));
    }
    const byKey = (k: string, type: string) =>
      eligible
        .filter(
          (l: Leave) =>
            l.type === type && format(parseISO(l.startDate), "yyyy-MM") === k,
        )
        .reduce((s: number, l: Leave) => s + l.days, 0);
    return {
      elpl: keys.map((k) => byKey(k, "annual")),
      cl: keys.map((k) => byKey(k, "casual")),
      sl: keys.map((k) => byKey(k, "sick")),
      maternity: keys.map(() => 0),
      compoff: keys.map(() => 0),
      bereavement: keys.map(() => 0),
    };
  }, [myLeaves]);

  const usedByTypeLast12 = useMemo(() => {
    const u = last12MonthsByType;
    return {
      el: u.elpl.reduce((a, b) => a + b, 0),
      cl: u.cl.reduce((a, b) => a + b, 0),
      sl: u.sl.reduce((a, b) => a + b, 0),
      compOff: u.compoff.reduce((a, b) => a + b, 0),
      maternity: u.maternity.reduce((a, b) => a + b, 0),
      bereavement: u.bereavement.reduce((a, b) => a + b, 0),
    };
  }, [last12MonthsByType]);

  const remainingByMonth = useMemo(() => {
    if (!leaveBalance) return null;
    const bal = leaveBalance;
    const usage = last12MonthsByType;
    return {
      elpl: usage.elpl.map((_, i) => {
        const usedAfter = usage.elpl.slice(i + 1).reduce((a, b) => a + b, 0);
        return bal.annual + usedAfter;
      }),
      cl: usage.cl.map((_, i) => {
        const usedAfter = usage.cl.slice(i + 1).reduce((a, b) => a + b, 0);
        return bal.casual + usedAfter;
      }),
      sl: usage.sl.map((_, i) => {
        const usedAfter = usage.sl.slice(i + 1).reduce((a, b) => a + b, 0);
        return bal.sick + usedAfter;
      }),
      maternity: usage.maternity.map(
        (_, i) =>
          (bal.maternityPaternity ?? 0) +
          usage.maternity.slice(i + 1).reduce((a, b) => a + b, 0),
      ),
      compoff: usage.compoff.map(
        (_, i) =>
          (bal.compOff ?? 0) +
          usage.compoff.slice(i + 1).reduce((a, b) => a + b, 0),
      ),
      bereavement: usage.bereavement.map(
        (_, i) => 0 + usage.bereavement.slice(i + 1).reduce((a, b) => a + b, 0),
      ),
    };
  }, [leaveBalance, last12MonthsByType]);

  const leaveMetricCards = useMemo(() => {
    const usage = last12MonthsByType;
    const used = usedByTypeLast12;
    return [
      {
        key: "elpl",
        title: "Earned Leave (EL) / Privilege Leave (PL)",
        isFixedEvent: false,
        remaining: Math.max(0, LEAVE_ALLOCATIONS.el - used.el),
        totalAllocation: LEAVE_ALLOCATIONS.el,
        used: used.el,
        isPositive: used.el === 0,
        sparkColor: LEAVE_CARD_COLORS.emerald,
        usageByMonth: usage.elpl,
      },
      {
        key: "cl",
        title: "Casual Leave (CL)",
        isFixedEvent: false,
        remaining: Math.max(0, LEAVE_ALLOCATIONS.cl - used.cl),
        totalAllocation: LEAVE_ALLOCATIONS.cl,
        used: used.cl,
        isPositive: used.cl === 0,
        sparkColor: LEAVE_CARD_COLORS.skyBlue,
        usageByMonth: usage.cl,
      },
      {
        key: "sl",
        title: "Sick Leave (SL) / Medical Leave",
        isFixedEvent: false,
        remaining: Math.max(0, LEAVE_ALLOCATIONS.sl - used.sl),
        totalAllocation: LEAVE_ALLOCATIONS.sl,
        used: used.sl,
        isPositive: used.sl === 0,
        sparkColor: LEAVE_CARD_COLORS.lavender,
        usageByMonth: usage.sl,
      },
      {
        key: "compoff",
        title: "Compensatory Off (Comp-Off)",
        isFixedEvent: false,
        remaining: Math.max(0, LEAVE_ALLOCATIONS.compOff - used.compOff),
        totalAllocation: LEAVE_ALLOCATIONS.compOff,
        used: used.compOff,
        isPositive: used.compOff === 0,
        sparkColor: LEAVE_CARD_COLORS.royalBlue,
        usageByMonth: usage.compoff,
      },
      {
        key: "maternity",
        title: "Maternity / Paternity Leave",
        isFixedEvent: true,
        allocationLabel: `${LEAVE_ALLOCATIONS.maternityWeeks} Weeks`,
        status: used.maternity > 0 ? ("Used" as const) : ("Available" as const),
        isPositive: used.maternity === 0,
        sparkColor: LEAVE_CARD_COLORS.orange,
        usageByMonth: usage.maternity,
      },
      {
        key: "bereavement",
        title: "Bereavement / Compassionate Leave",
        isFixedEvent: true,
        allocationLabel: `${LEAVE_ALLOCATIONS.bereavementDays} Days`,
        status:
          used.bereavement > 0 ? ("Used" as const) : ("Available" as const),
        isPositive: used.bereavement === 0,
        sparkColor: LEAVE_CARD_COLORS.red,
        usageByMonth: usage.bereavement,
      },
    ];
  }, [last12MonthsByType, usedByTypeLast12]);

  const recentLeaves = useMemo(() => {
    const sorted = [...myLeaves].sort(
      (a: Leave, b: Leave) =>
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
    );
    const typeByName = Object.fromEntries(
      leaveTypes.map((lt: LeaveType) => [lt.code, lt.name]),
    );
    return sorted.slice(0, 4).map((leave: Leave) => ({
      id: leave.id,
      type: typeByName[leave.type] ?? leave.type,
      dates: `${format(parseISO(leave.startDate), "MMM d")} - ${format(parseISO(leave.endDate), "MMM d")}`,
      days: leave.days,
      status: leave.status,
    }));
  }, [myLeaves, leaveTypes]);

  const last12MonthsLeaveData = useMemo(() => {
    const today = new Date();
    const eligible = myLeaves.filter(
      (l: Leave) => l.status === "approved" || l.status === "pending",
    );
    const months: {
      shortMonth: string;
      fullMonth: string;
      key: string;
      days: number;
    }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = subMonths(today, i);
      const start = startOfMonth(d);
      const key = format(start, "yyyy-MM");
      const shortMonth = format(start, "MMM");
      const fullMonth = format(start, "MMMM yyyy");
      const days = eligible
        .filter((l: Leave) => format(parseISO(l.startDate), "yyyy-MM") === key)
        .reduce((sum: number, l: Leave) => sum + l.days, 0);
      months.push({ shortMonth, fullMonth, key, days });
    }
    return months;
  }, [myLeaves]);

  const upcomingHolidays = useMemo(() => {
    const today = new Date();
    return [...holidays]
      .filter((h) => isAfter(parseISO(h.date), today))
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
      .slice(0, 4)
      .map((h) => ({
        name: h.name,
        date: format(parseISO(h.date), "MMM d, yyyy"),
        type: h.type === "public" ? "Public Holiday" : "Optional",
      }));
  }, [holidays]);

  const teamOnLeave = useMemo(() => {
    const today = new Date();
    const onLeave = allLeaves.filter((l: Leave) => {
      const end = parseISO(l.endDate);
      return (
        (l.status === "approved" || l.status === "pending") &&
        (isAfter(end, today) || isToday(end))
      );
    });
    const userIds = [...new Set(onLeave.map((l: Leave) => l.userId))];
    return userIds
      .filter((id) => id !== CURRENT_USER_ID)
      .map((userId) => {
        const user = users.find((u: User) => u.id === userId);
        const userLeaves = onLeave.filter((l: Leave) => l.userId === userId);
        const nextLeave = userLeaves.sort(
          (a: Leave, b: Leave) =>
            parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime(),
        )[0];
        if (!user || !nextLeave) return null;
        const initials = user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        return {
          name: user.name,
          department: user.department,
          dates: `${format(parseISO(nextLeave.startDate), "MMM d")} - ${format(parseISO(nextLeave.endDate), "MMM d")}`,
          avatar: user.avatar ?? initials,
          useAvatarUrl: !!user.avatar,
        };
      })
      .filter(Boolean) as {
      name: string;
      department: string;
      dates: string;
      avatar: string;
      useAvatarUrl: boolean;
    }[];
  }, [allLeaves, users]);

  const dailyQuote = useMemo(() => {
    if (!applyLeaveMessages.length) return null;
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const index = dayOfYear % applyLeaveMessages.length;
    return (
      applyLeaveMessages[index]?.text ?? applyLeaveMessages[0]?.text ?? null
    );
  }, [applyLeaveMessages]);

  const isLoading =
    userLoading ||
    balanceLoading ||
    leaveTypesLoading ||
    leavesLoading ||
    allLeavesLoading ||
    holidaysLoading ||
    usersLoading ||
    messagesLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" aria-hidden />
        <span className="sr-only">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground transition-colors duration-300">
      <div className="bg-background p-8">
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-8">
          <WelcomeCard
            userName={currentUser?.name ?? "User"}
            greeting={getGreeting()}
            todayDate={getTodayDate()}
            dailyQuote={dailyQuote}
          />
          <TotalLeaveBreakdownCard
            leaveBalance={leaveBalance ?? null}
            myLeaves={myLeaves}
            last6MonthsData={last12MonthsLeaveData}
          />
        </div>

        <LeaveMetricCards
          cards={leaveMetricCards}
          last12MonthsLeaveData={last12MonthsLeaveData}
        />

        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-8">
          <RecentApply leaves={recentLeaves} />
          <UpcomingHolidays holidays={upcomingHolidays} />
        </div>

        <TeamOnLeave members={teamOnLeave} />
      </div>
    </div>
  );
};

export default Dashboard;
