'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Label,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
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

const LEAVE_TYPE_MAP: Record<
  string,
  keyof Pick<
    LeaveBalance,
    'annual' | 'casual' | 'sick' | 'maternityPaternity' | 'compOff'
  >
> = {
  annual: 'annual',
  casual: 'casual',
  sick: 'sick',
};

const TotalLeaveBreakdownCard = ({
  leaveBalance,
  myLeaves,
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
      bal.annual +
      bal.casual +
      bal.sick +
      (bal.maternityPaternity ?? 0) +
      (bal.compOff ?? 0);
    const totalLeaves = totalRemaining + totalUsed;
    return {
      totalLeaves,
      totalUsed,
      totalRemaining,
    };
  }, [leaveBalance, usedByType]);

  // Donut Chart Data
  const chartData = React.useMemo(
    () => [
      { name: 'Remaining', value: totalRemaining, fill: '#172554' }, // Dark Blue (Darker than theme)
      { name: 'Used', value: totalUsed, fill: 'var(--color-primary)' }, // Theme Color
    ],
    [totalRemaining, totalUsed],
  );

  // If no data, show a grey ring
  const finalData =
    totalLeaves === 0
      ? [{ name: 'Empty', value: 1, fill: 'var(--color-muted)' }]
      : chartData;

  return (
    <div
      className='relative col-span-1 border border-border bg-card shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]'
      aria-label='Total leave breakdown'
    >
      <h3 className='absolute top-6 left-6 font-semibold text-lg'>
        Leave Allocation
      </h3>

      <div className='h-64 w-full mt-4'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={finalData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              innerRadius={80}
              outerRadius={100}
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
            >
              {finalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-4xl font-bold'
                          dy='-10'
                        >
                          {totalRemaining}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm font-medium'
                        >
                          Remaining
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  if (data.name === 'Empty') return null;
                  return (
                    <div className='flex items-center gap-2 rounded-lg border border-border/50 bg-popover px-3 py-2 shadow-xl'>
                      <div
                        className='h-2.5 w-2.5 rounded-full ring-1 ring-border'
                        style={{ backgroundColor: data.fill }}
                      />
                      <span className='text-sm font-medium text-popover-foreground'>
                        {data.name}{' '}
                        <span className='font-bold opacity-90'>
                          {data.value}
                        </span>
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='flex w-full justify-center gap-8 text-sm mt-2'>
        <div className='flex items-center gap-2'>
          <span className='h-3 w-3 rounded-full bg-[#172554]' />
          <span className='text-muted-foreground'>
            {totalRemaining} Remaining
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='h-3 w-3 rounded-full bg-primary' />
          <span className='text-muted-foreground'>{totalUsed} Used</span>
        </div>
      </div>
    </div>
  );
};

export default TotalLeaveBreakdownCard;
