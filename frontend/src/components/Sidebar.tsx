"use client";

import React from "react";
import {
  Home,
  Calendar,
  Users,
  BarChart3,
  Clock,
  FileText,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/useTheme";
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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "My Leaves", path: "/leaves" },
  { icon: Clock, label: "Apply Leave", path: "/leaves/apply" },
  { icon: Users, label: "Team Leaves", path: "/team" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: FileText, label: "Leave Policy", path: "/policy" },
];

const AppSidebarContent = () => {
  const pathname = usePathname();
  const { isDark, setTheme } = useTheme();

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <>
      <SidebarRail />
      <SidebarHeader className="flex flex-row items-center border-sidebar-border border-b h-16 gap-0 px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="bg-sidebar-primary flex size-10 shrink-0 items-center justify-center rounded-lg text-sidebar-primary-foreground group-data-[collapsible=icon]:size-8">
            <Calendar
              className="size-5 group-data-[collapsible=icon]:size-4"
              aria-hidden
            />
          </div>
          <span className="truncate font-bold text-xl group-data-[collapsible=icon]:hidden">
            LMS
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.path}>
                        <Icon className="size-5" aria-hidden />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-sidebar-border border-t p-2">
        <div
          className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
          suppressHydrationWarning
        >
          <div className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:hidden">
            {isDark ? (
              <Moon
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden
              />
            ) : (
              <Sun
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden
              />
            )}
            <span className="truncate font-medium text-card-foreground text-sm">
              Dark Mode
            </span>
          </div>
          <Switch
            checked={isDark}
            onCheckedChange={handleThemeToggle}
            aria-label="Toggle dark mode"
          />
        </div>
      </SidebarFooter>
    </>
  );
};

export const AppSidebar = () => (
  <ShadcnSidebar
    side="left"
    collapsible="icon"
    className={cn("shrink-0 border-sidebar-border border-r")}
  >
    <AppSidebarContent />
  </ShadcnSidebar>
);

export const DashboardLayoutSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <SidebarProvider
    className={cn("flex h-screen w-full overflow-hidden")}
    defaultOpen
  >
    <AppSidebar />
    <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {children}
    </SidebarInset>
  </SidebarProvider>
);

export default AppSidebar;
