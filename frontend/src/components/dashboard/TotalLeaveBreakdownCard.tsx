'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { LeaveBalance } from '@/types';
import type { Leave } from '@/types';

export interface Last6MonthsItem {
  shortMonth: string;
  fullMonth: string;
  key: string;
  days: number;
}

export interface TotalLeaveBreakdownCardProps {
  leaveBalance: LeaveBalance | null;
  myLeaves: Leave[];
  last6MonthsData?: Last6MonthsItem[];
}

const LEAVE_TYPE_MAP: Record<string, keyof Pick<LeaveBalance, 'annual' | 'casual' | 'sick' | 'maternityPaternity' | 'compOff'>> = {
  annual: 'annual',
  casual: 'casual',
  sick: 'sick',
};

const TotalLeaveBreakdownCard = ({
  leaveBalance,
  myLeaves,
  last6MonthsData = [],
}: TotalLeaveBreakdownCardProps) => {
  const usedByType = React.useMemo(() => {
    const used: Record<string, number> = {
      annual: 0,
      casual: 0,
      sick: 0,
      maternityPaternity: 0,
      compOff: 0,
      bereavement: 0,
    };
    myLeaves
      .filter((l) => l.status === 'approved' || l.status === 'pending')
      .forEach((l) => {
        const key = LEAVE_TYPE_MAP[l.type] ?? l.type;
        if (key in used) used[key as keyof typeof used] += l.days;
      });
    return used;
  }, [myLeaves]);

  const { totalLeaves, totalUsed, totalRemaining } = React.useMemo(() => {
    if (!leaveBalance) {
      return { totalLeaves: 0, totalUsed: 0, totalRemaining: 0 };
    }
    const bal = leaveBalance;
    const totalUsed =
      usedByType.annual +
      usedByType.casual +
      usedByType.sick +
      usedByType.maternityPaternity +
      usedByType.compOff +
      usedByType.bereavement;
    const totalRemaining =
      bal.annual + bal.casual + bal.sick + (bal.maternityPaternity ?? 0) + (bal.compOff ?? 0);
    const totalLeaves = totalRemaining + totalUsed;
    return {
      totalLeaves,
      totalUsed,
      totalRemaining,
    };
  }, [leaveBalance, usedByType]);

  const chartDays = last6MonthsData.map((m) => m.days);
  const maxChartDays = Math.max(1, ...chartDays);

  return (
    <div
      className='relative col-span-1 overflow-hidden rounded-2xl min-h-[280px] flex flex-col p-6 md:p-8 border border-border bg-card shadow-sm'
      aria-label='Total leave breakdown card'
    >
      <div className='flex justify-between items-start mb-4'>
        <div>
          <span className='font-bold text-muted-foreground text-xs  tracking-widest'>
          Remaining Leave
          </span>
          <h2 className='mt-1 font-bold text-primary text-2xl md:text-3xl tabular-nums'>
          {totalRemaining} days
          </h2>
          <p className='mt-1 text-muted-foreground text-sm'>
            <span className='font-medium text-foreground'>{totalUsed} days used</span>
            <span className='mx-1.5 text-muted-foreground/70'>·</span>
            <span>{totalLeaves} total leaves</span>
          </p>
        </div>
        
      </div>
      {last6MonthsData.length > 0 && (
        <div className='mt-4 pt-3 border-t border-border'>
          <p className='mb-2 text-muted-foreground text-xs font-medium'>
            Leave usage · last 6 months
          </p>
          <div
            className='flex h-12 items-end justify-between gap-1'
            role='img'
            aria-label='Leave usage by month for the last 6 months'
          >
            {last6MonthsData.map((month, i) => {
              const pct = Math.max(4, (month.days / maxChartDays) * 100);
              return (
                <Tooltip key={month.key}>
                  <TooltipTrigger asChild>
                    <div
                      className='flex-1 min-w-0 rounded-sm bg-primary/80 cursor-default transition-opacity hover:opacity-100 hover:bg-primary'
                      style={{ height: `${pct}%`, minHeight: 4 }}
                      role='img'
                      aria-label={`${month.fullMonth}: ${month.days} days used`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side='top' sideOffset={6} className='text-left'>
                    <p className='text-muted-foreground text-xs font-medium'>
                      {month.fullMonth}
                    </p>
                    <p className='mt-0.5 font-semibold text-sm'>
                      {month.days} {month.days === 1 ? 'day' : 'days'} used
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalLeaveBreakdownCard;
