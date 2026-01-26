'use client';

import React from 'react';
import {
  Home,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Clock,
  FileText,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useTheme } from '@/hooks/useTheme';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'My Leaves', path: '/leaves' },
  { icon: Clock, label: 'Apply Leave', path: '/leaves/apply' },
  { icon: Users, label: 'Team Leaves', path: '/team' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: FileText, label: 'Leave Policy', path: '/policy' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isDark, setTheme } = useTheme();

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className='flex flex-col bg-sidebar border-sidebar-border border-r w-64 h-screen text-sidebar-foreground'>
      <div className='flex items-center px-6 border-sidebar-border border-b h-16'>
        <div className='flex items-center gap-2'>
          <div className='bg-sidebar-primary p-2 rounded-lg text-sidebar-primary-foreground'>
            <Calendar className='w-5 h-5' />
          </div>
          <span className='font-bold text-xl'>LMS</span>
        </div>
      </div>

      <nav className='flex-1 p-4 overflow-y-auto'>
        <ul className='space-y-1'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon className='w-5 h-5' />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className='flex justify-between items-center bg-card px-3 py-2.5 border border-border rounded-lg' suppressHydrationWarning>
        <div className='flex items-center gap-3'>
          {isDark ? (
            <Moon className='w-5 h-5 text-muted-foreground' />
          ) : (
            <Sun className='w-5 h-5 text-muted-foreground' />
          )}
          <span className='font-medium text-card-foreground text-sm'>
            Dark Mode
          </span>
        </div>

        <Switch checked={isDark} onCheckedChange={handleThemeToggle} />
      </div>

      <div className='p-4 border-sidebar-border border-t'>
        <div className='flex items-center gap-3'>
          <div className='flex justify-center items-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-10 h-10 font-semibold text-sm'>
            R
          </div>
          <div>
            <h3 className='font-medium text-sm'>Rajaguru</h3>
            <p className='text-slate-400 text-xs'>Frontend Developer</p>
          </div>
        </div>
        <Button className='flex items-center gap-3 bg-red-500 hover:bg-red-700 mt-3 w-full font-medium text-white'>
          <LogOut className='w-5 h-5' />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
