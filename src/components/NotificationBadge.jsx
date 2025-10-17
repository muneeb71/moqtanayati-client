"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

const NotificationBadge = ({ className = "" }) => {
  const { getUnreadCount, notifications } = useNotifications();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // derive on render; presence of `notifications` ensures re-render on store updates
  const unreadCount = isClient ? getUnreadCount() : 0;

  return (
    <div className={`relative ${className}`}>
      <Bell className="h-6 w-6" />
      {isClient && unreadCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;
