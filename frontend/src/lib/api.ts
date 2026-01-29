import axios from "axios";
import type {
  Leave,
  LeaveBalance,
  User,
  Holiday,
  Department,
  LeaveType,
  ApplyLeaveMessage,
} from "@/types";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const getUser = async (id: string): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

export const getLeaves = async (userId?: string): Promise<Leave[]> => {
  const { data } = await api.get<Leave[]>("/leaves", {
    params: userId ? { userId } : undefined,
  });
  return data;
};

export const getLeave = async (id: string): Promise<Leave> => {
  const { data } = await api.get<Leave>(`/leaves/${id}`);
  return data;
};

export const getLeaveBalances = async (
  userId?: string,
): Promise<LeaveBalance[]> => {
  const { data } = await api.get<LeaveBalance[]>("/leaveBalances", {
    params: userId ? { userId } : undefined,
  });
  return data;
};

export const getLeaveBalanceByUserId = async (
  userId: string,
): Promise<LeaveBalance | null> => {
  const { data } = await api.get<LeaveBalance[]>("/leaveBalances", {
    params: { userId },
  });
  return data[0] ?? null;
};

export const getDepartments = async (): Promise<Department[]> => {
  const { data } = await api.get<Department[]>("/departments");
  return data;
};

export const getHolidays = async (): Promise<Holiday[]> => {
  const { data } = await api.get<Holiday[]>("/holidays");
  return data;
};

export const getLeaveTypes = async (): Promise<LeaveType[]> => {
  const { data } = await api.get<LeaveType[]>("/leaveTypes");
  return data;
};

export const getApplyLeaveMessages = async (): Promise<ApplyLeaveMessage[]> => {
  const { data } = await api.get<ApplyLeaveMessage[]>("/applyLeaveMessages");
  return data;
};
