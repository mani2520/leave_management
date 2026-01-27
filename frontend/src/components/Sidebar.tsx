'use client';

import React from 'react';
import {
  Home,
  Calendar,
  Users,
  BarChart3,
  Clock,
  FileText,
  Moon,
  Sun,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Switch } from './ui/switch';
import { useTheme } from '@/hooks/useTheme';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'My Leaves', path: '/leaves' },
  { icon: Clock, label: 'Apply Leave', path: '/leaves/apply' },
  { icon: Users, label: 'Team Leaves', path: '/team' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: FileText, label: 'Leave Policy', path: '/policy' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isDark, setTheme } = useTheme();

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className='flex h-full min-h-0 shrink-0 flex-col bg-sidebar border-sidebar-border border-r w-64 text-sidebar-foreground'>
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

      <div className='p-4 border-sidebar-border border-t'>
        <div className='flex justify-between items-center bg-card px-3 py-2.5 border border-border rounded-lg' suppressHydrationWarning>
          <div className='flex items-center gap-3'>
            {isDark ? (
              <Moon className='w-5 h-5 text-muted-foreground' aria-hidden />
            ) : (
              <Sun className='w-5 h-5 text-muted-foreground' aria-hidden />
            )}
            <span className='font-medium text-card-foreground text-sm'>
              Dark Mode
            </span>
          </div>
          <Switch checked={isDark} onCheckedChange={handleThemeToggle} aria-label='Toggle dark mode' />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
