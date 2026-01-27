export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'admin';
  department: string;
  managerId: string | null;
  avatar: string;
}

export interface Leave {
  id: string;
  userId: string;
  type: 'sick' | 'casual' | 'annual' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: string;
}

export interface LeaveBalance {
  id: string;
  userId: string;
  sick: number;
  casual: number;
  annual: number;
  unpaid: number;
  total: number;
  maternityPaternity?: number;
  compOff?: number;
}

export interface Department {
  id: string;
  name: string;
  headId: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'public' | 'optional';
}

export interface LeaveType {
  id: string;
  name: string;
  code: 'sick' | 'casual' | 'annual' | 'unpaid';
  defaultDays: number;
  color: string;
}

export interface LeaveStats {
  totalLeaves: number;
  approved: number;
  pending: number;
  rejected: number;
}

export interface TeamMember extends User {
  leaveBalance?: LeaveBalance;
  onLeave?: boolean;
}

export interface MotivationQuote {
  id: string;
  text: string;
}
