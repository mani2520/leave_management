'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';

export interface LeaveMetricCardData {
  key: string;
  title: string;
  isPositive: boolean;
  sparkColor: string;
  usageByMonth?: number[];
  isFixedEvent?: boolean;
  remaining?: number;
  totalAllocation?: number;
  used?: number;
  allocationLabel?: string;
  status?: 'Available' | 'Used' | 'Not Applicable';
}

export interface MonthLabel {
  shortMonth: string;
  fullMonth?: string;
}

export interface LeaveMetricCardsProps {
  cards: LeaveMetricCardData[];
  last12MonthsLeaveData: MonthLabel[];
}

const LeaveMetricCards = ({
  cards,
  last12MonthsLeaveData,
}: LeaveMetricCardsProps) => {
  return (
    <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8'>
      {cards.map((card) => {
        const usageByMonth = card.usageByMonth ?? [];
        const maxDomain = Math.max(
          card.totalAllocation ?? 0,
          ...(usageByMonth?.length ? usageByMonth : [0]),
          10, // Minimum scale fallback
        );

        const chartData = last12MonthsLeaveData.map((month, i) => {
          const val = usageByMonth[i] ?? 0;
          return {
            name: month.shortMonth,
            fullMonth: month.fullMonth,
            value: val === 0 ? 0.2 : val,
            originalValue: val,
          };
        });

        return (
          <div
            key={card.key}
            className='flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md'
          >
            {/* ... title ... */}
            <p className='mb-3 text-sm font-medium text-muted-foreground'>
              {card.title}
            </p>
            <div className='flex min-h-[52px] items-end justify-between gap-3'>
              <div className='min-w-0 flex flex-col gap-2'>
                {/* ... content (remaining/status) ... */}
                {card.isFixedEvent ? (
                  <>
                    <p
                      className='font-bold tabular-nums text-lg md:text-xl'
                      style={{ color: card.sparkColor }}
                    >
                      {card.allocationLabel}
                    </p>
                    <p className='mt-0.5 text-muted-foreground text-xs font-medium'>
                      Status: {card.status}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className='font-bold tabular-nums text-lg md:text-xl'
                      style={{ color: card.sparkColor }}
                    >
                      {card.remaining} Days Remaining
                    </p>

                    <p className='flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs'>
                      <span>Total: {card.totalAllocation} Days</span>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 font-medium',
                          (card.used ?? 0) > 0
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-muted-foreground',
                        )}
                      >
                        {(card.used ?? 0) > 0 ? (
                          <TrendingDown
                            className='h-3.5 w-3.5 shrink-0'
                            aria-hidden
                          />
                        ) : (
                          <TrendingUp
                            className='h-3.5 w-3.5 shrink-0'
                            aria-hidden
                          />
                        )}
                        Used: {card.used ?? 0} Days
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div className='h-18 w-24 shrink-0'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={chartData}>
                    <YAxis hide domain={[0, maxDomain]} />
                    <RechartsTooltip
                      cursor={{ fill: 'transparent' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className='rounded-md border bg-popover px-2 py-1 shadow-sm'>
                              <span className='text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-0.5'>
                                {data.fullMonth ?? data.name}
                              </span>
                              <span className='font-bold text-popover-foreground text-sm tabular-nums'>
                                {data.originalValue}{' '}
                                {data.originalValue === 1 ? 'day' : 'days'}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey='value'
                      fill={card.sparkColor}
                      radius={[2, 2, 2, 2]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveMetricCards;
