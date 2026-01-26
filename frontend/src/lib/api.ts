import axios from 'axios';
import type {
  Leave,
  LeaveBalance,
  User,
  Holiday,
  Department,
  LeaveType,
} from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async (): Promise<User> => {
  const { data } = await api.get('/users');
  return data;
};

export const getUser = async (id: string): Promise<User> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const getLeaves = async (userId?: string): Promise<Leave> => {
  const { data } = await api.get('/leaves', {
    params: userId ? { userId } : undefined,
  });
  return data;
};

export const getLeave = async (id: string): Promise<Leave> => {
  const { data } = await api.get(`/leaves/${id}`);
  return data;
};
