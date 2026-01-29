"use client";

import React, { useMemo, useState, useCallback } from "react";
import { Settings, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { getUser } from "@/lib/api";
import NavRightPanel, {
  type NavRightPanelType,
} from "@/components/NavRightPanel";
import { SidebarTrigger } from "@/components/ui/sidebar";

const CURRENT_USER_ID = "1";

const PAGE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leaves": "My Leaves",
  "/leaves/apply": "Apply Leave",
  "/team": "Team",
  "/reports": "Reports",
  "/policy": "Leave Policy",
  "/settings": "Settings",
  "/profile": "Profile",
  "/notifications": "Notifications",
};

const getPageLabel = (pathname: string): string => {
  if (PAGE_LABELS[pathname]) return PAGE_LABELS[pathname];
  if (pathname.startsWith("/leaves/")) return "Leave Details";
  return "Dashboard";
};

const Navbar = () => {
  const pathname = usePathname();
  const [rightPanel, setRightPanel] = useState<NavRightPanelType>(null);

  const { data: currentUser } = useQuery({
    queryKey: ["user", CURRENT_USER_ID],
    queryFn: () => getUser(CURRENT_USER_ID),
  });

  const pageLabel = useMemo(() => getPageLabel(pathname), [pathname]);
  const displayName = currentUser?.name ?? "User";

  const openRightPanel = useCallback((type: NavRightPanelType) => {
    setRightPanel(type);
  }, []);
  const closeRightPanel = useCallback(() => setRightPanel(null), []);

  return (
    <header
      className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 md:px-6"
      role="banner"
      aria-label="Top navigation"
    >
      {/* Left: Sidebar toggle + User name + current page */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <SidebarTrigger
          className="size-9 shrink-0 md:size-8"
          aria-label="Toggle sidebar"
        />
        <h1
          className="truncate font-bold text-foreground text-lg md:text-xl"
          title={`${displayName} ${pageLabel}`}
        >
          {displayName} {pageLabel}
        </h1>
      </div>

      {/* Right: Settings, Notification, Profile */}
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => openRightPanel("settings")}
          aria-label="Settings"
          className={cn(
            rightPanel === "settings" && "bg-muted text-foreground",
          )}
        >
          <Settings className="h-5 w-5" aria-hidden />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => openRightPanel("notifications")}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" aria-hidden />
          <span
            className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"
            aria-hidden
          />
        </Button>

        <button
          type="button"
          onClick={() => openRightPanel("profile")}
          aria-label="Profile"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted md:gap-3 md:px-3"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4 text-muted-foreground" aria-hidden />
          </div>
          <div className="hidden text-left sm:block">
            <p className="font-medium text-sm leading-tight text-foreground">
              {displayName}
            </p>
            <p className="text-xs leading-tight capitalize text-muted-foreground">
              {currentUser?.department ?? currentUser?.role ?? "—"}
            </p>
          </div>
        </button>
      </div>

      <NavRightPanel
        open={rightPanel !== null}
        type={rightPanel}
        onClose={closeRightPanel}
        userName={displayName}
        userDepartment={
          currentUser?.department ?? currentUser?.role ?? undefined
        }
      />
    </header>
  );
};

export default Navbar;
