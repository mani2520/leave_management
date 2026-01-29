export const LEAVE_ALLOCATIONS = {
  el: 12,
  cl: 6,
  sl: 6,
  compOffBase: 0,
  compOffExtra: 2,
  compOff: 2,
  maternityWeeks: 26,
  bereavementDays: 3,
} as const;

export const LEAVE_CARD_COLORS = {
  emerald: '#00a76f',
  skyBlue: '#078dee',
  lavender: '#7635dc',
  royalBlue: '#0c68e9',
  orange: '#fda92d',
  red: '#ff3030',
} as const;

export type FixedEventStatus = 'Available' | 'Used' | 'Not Applicable';
