"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const CLOSE_DURATION_MS = 300;

export type NavRightPanelType = "settings" | "notifications" | "profile" | null;

const TITLES: Record<NonNullable<NavRightPanelType>, string> = {
  settings: "Settings",
  notifications: "Notifications",
  profile: "Profile",
};

export interface NavRightPanelProps {
  open: boolean;
  type: NavRightPanelType;
  onClose: () => void;
  userName?: string;
  userDepartment?: string;
}

const NavRightPanel = ({
  open,
  type,
  onClose,
  userName,
  userDepartment,
}: NavRightPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open && type) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setIsOpen(true);
    }
  }, [open, type]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    } else {
      setIsOpen(false);
      closeTimeoutRef.current = setTimeout(() => onClose(), CLOSE_DURATION_MS);
    }
  };

  if (!type) return null;

  const title = TITLES[type];

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 p-0 sm:max-w-sm"
        showCloseButton={true}
      >
        <SheetHeader className="flex flex-row items-center border-b border-border px-4 py-4 pr-12">
          <SheetTitle className="text-lg font-semibold">{title}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {type === "settings" && (
            <p className="text-muted-foreground text-sm">
              Settings content will go here.
            </p>
          )}
          {type === "notifications" && (
            <p className="text-muted-foreground text-sm">
              Notifications content will go here.
            </p>
          )}
          {type === "profile" && (
            <div className="space-y-2">
              <p className="font-medium text-foreground">
                {userName ?? "User"}
              </p>
              <p className="text-muted-foreground text-sm capitalize">
                {userDepartment ?? "—"}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavRightPanel;
