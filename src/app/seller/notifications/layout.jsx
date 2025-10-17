"use client";

import PageHeading from "@/components/headings/PageHeading";
import NotificationBar from "@/components/sections/landing/notifications/NotificationBar";
import { useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationLayout = ({ children }) => {
  const { markAllAsRead } = useNotifications();

  useEffect(() => {
    // When user visits notifications, clear unread badge
    if (markAllAsRead) markAllAsRead();
  }, [markAllAsRead]);

  return (
    <div className="flex w-full flex-col items-center gap-10 px-3">
      <PageHeading>Notifications</PageHeading>
      <div className="flex w-full max-w-[562px] flex-col items-center">
        <NotificationBar />
        {children}
      </div>
    </div>
  );
};

export default NotificationLayout;
