"use client";

import { useSidebar } from "@/context/SidebarContext";
import { useAppSelector } from "@/store/hooks";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const canAccessPath = (role: "admin" | "student" | "teacher" | "client", pathname: string) => {
  if (role === "admin") {
    return true;
  }

  const allowedPaths =
    role === "student" ? ["/student-list", "/add-student"] : ["/student-list"];

  return allowedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const role = useAppSelector((state) => state.auth.user?.role);

  const isAllowed = useMemo(() => {
    if (!role) {
      return false;
    }
    return canAccessPath(role, pathname);
  }, [pathname, role]);

  useEffect(() => {
    if (!role) {
      router.replace("/signin");
      return;
    }

    if (!isAllowed) {
      router.replace("/student-list");
    }
  }, [role, isAllowed, router]);

  if (!role || !isAllowed) {
    return null;
  }

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
