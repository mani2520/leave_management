export const LEAVE_ALLOCATIONS = {
  el: 12,
  cl: 6,
  sl: 6,
  compOff: 2,
  maternityWeeks: 26,
  bereavementDays: 3,
} as const;

/** Hex codes for the six leave card colors (emerald, sky blue, lavender, royal blue, orange, red). */
export const LEAVE_CARD_COLORS = {
  emerald: '#10b981',
  skyBlue: '#0ea5e9',
  lavender: '#8b5cf6',
  royalBlue: '#2563eb',
  orange: '#f97316',
  red: '#ef4444',
} as const;

export type FixedEventStatus = 'Available' | 'Used' | 'Not Applicable';
