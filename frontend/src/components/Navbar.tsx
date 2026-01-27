'use client';

import React, { useMemo } from 'react';
import { Settings, Bell, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { getUser } from '@/lib/api';

const CURRENT_USER_ID = '1';

const PAGE_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leaves': 'My Leaves',
  '/leaves/apply': 'Apply Leave',
  '/team': 'Team',
  '/reports': 'Reports',
  '/policy': 'Leave Policy',
  '/settings': 'Settings',
  '/profile': 'Profile',
  '/notifications': 'Notifications',
};

const getPageLabel = (pathname: string): string => {
  if (PAGE_LABELS[pathname]) return PAGE_LABELS[pathname];
  if (pathname.startsWith('/leaves/')) return 'Leave Details';
  return 'Dashboard';
};

const Navbar = () => {
  const pathname = usePathname();
  const { data: currentUser } = useQuery({
    queryKey: ['user', CURRENT_USER_ID],
    queryFn: () => getUser(CURRENT_USER_ID),
  });

  const pageLabel = useMemo(() => getPageLabel(pathname), [pathname]);
  const displayName = currentUser?.name ?? 'User';

  return (
    <header
      className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 md:px-6"
      role="banner"
      aria-label="Top navigation"
    >
      {/* User name + current page */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <h1 className="truncate font-bold text-foreground text-lg md:text-xl" title={`${displayName} ${pageLabel}`}>
          {displayName} {pageLabel}
        </h1>
      </div>

      {/* Right: Settings, Notification, Profile */}
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <Link href="/settings" aria-label="Settings">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              pathname === '/settings' && 'bg-muted text-foreground'
            )}
          >
            <Settings className="h-5 w-5" aria-hidden />
          </Button>
        </Link>

        <Link href="/notifications" aria-label="Notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" aria-hidden />
            <span className="sr-only">Notifications</span>
            {/* Optional: badge for unseen count */}
            <span
              className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"
              aria-hidden
            />
          </Button>
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted md:gap-3 md:px-3"
          aria-label="Profile"
        >
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={displayName}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary text-sm">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <p className="font-medium text-sm text-foreground leading-tight">
              {displayName}
            </p>
            <p className="text-muted-foreground text-xs leading-tight capitalize">
              {currentUser?.department ?? currentUser?.role ?? '—'}
            </p>
          </div>
          <User className="h-4 w-4 text-muted-foreground md:hidden" aria-hidden />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
