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
  ChevronLeft,
  ChevronRight,
  Hourglass,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Import generic button if needed, or native button

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'My Leaves', path: '/leaves' },
  { icon: Clock, label: 'Apply Leave', path: '/leaves/apply' },
  { icon: Users, label: 'Team Leaves', path: '/team' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: FileText, label: 'Leave Policy', path: '/policy' },
];

const AppSidebarContent = () => {
  const pathname = usePathname();
  const { isDark, setTheme } = useTheme();
  const { toggleSidebar, state } = useSidebar();

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <>
      <SidebarRail />
      <SidebarHeader className='flex flex-row items-center border-sidebar-border h-16 justify-between px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 relative'>
        <div
          className='flex min-w-0 items-center gap-2 cursor-pointer'
          onClick={() => state === 'collapsed' && toggleSidebar()}
        >
          <div className='bg-sidebar-primary flex size-8 shrink-0 items-center justify-center rounded-lg text-sidebar-primary-foreground'>
            <Hourglass className='size-4' aria-hidden />
          </div>
          <span className='truncate font-bold text-xl group-data-[collapsible=icon]:hidden'>
            Timeout
          </span>
        </div>
        <Button
          onClick={toggleSidebar}
          variant='ghost'
          size='icon'
          className='absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar-accent text-sidebar-foreground shadow-sm hover:bg-sidebar-accent/90 z-999 cursor-pointer p-0'
          aria-label='Toggle Sidebar'
        >
          {state === 'expanded' ? (
            <ChevronLeft className='size-4' />
          ) : (
            <ChevronRight className='size-4' />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1 group-data-[collapsible=icon]:gap-3'>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                const isCollapsed = state === 'collapsed';

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={isCollapsed ? item.label : undefined}
                      className={cn(
                        'transition-all duration-200',
                        isCollapsed
                          ? 'group-data-[collapsible=icon]:size-auto! group-data-[collapsible=icon]:h-auto! group-data-[collapsible=icon]:min-h-0 w-[calc(100%-12px)]! justify-center items-center py-2.5 px-1 rounded-xl mx-auto overflow-visible! [&>span:last-child]:overflow-visible [&>span:last-child]:whitespace-nowrap'
                          : 'h-auto justify-start px-3 py-2 rounded-lg',
                        isActive
                          ? 'bg-primary! text-primary-foreground! hover:bg-primary/90! hover:text-primary-foreground!'
                          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      )}
                    >
                      <Link
                        href={item.path}
                        className={cn(
                          'flex w-full',
                          isCollapsed
                            ? 'flex flex-col items-center justify-center gap-1 text-center'
                            : 'flex-row items-center gap-3',
                        )}
                      >
                        <Icon
                          className={cn(
                            'shrink-0 transition-all',
                            isCollapsed ? 'size-6' : 'size-5',
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            'transition-all',
                            isCollapsed
                              ? 'text-[11px] font-medium leading-tight block! opacity-100 text-center whitespace-nowrap overflow-visible group-data-[collapsible=icon]:block!'
                              : 'truncate text-sm group-data-[collapsible=icon]:hidden',
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
};

export const AppSidebar = () => (
  <ShadcnSidebar
    side='left'
    collapsible='icon'
    className={cn('shrink-0 border-sidebar-border border-r z-100')}
  >
    <AppSidebarContent />
  </ShadcnSidebar>
);

export const DashboardLayoutSidebar = ({
  children,
  defaultOpen,
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
}) => (
  <SidebarProvider
    className={cn('flex h-screen w-full overflow-hidden')}
    defaultOpen={defaultOpen}
  >
    <AppSidebar />
    <SidebarInset className='flex min-h-0 flex-1 flex-col overflow-hidden'>
      {children}
    </SidebarInset>
  </SidebarProvider>
);

export default AppSidebar;
