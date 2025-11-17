"use client";
import NotificationCard from "@/components/cards/NotificationCard";
import NotificationCardSkeleton from "@/components/loaders/NotificationCardSkeleton";
import { useEffect, useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { useSearchParams } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const NotificationSection = ({ category = "" }) => {
  const { t } = useTranslation();
  const {
    getNotificationsByCategory,
    loading,
    error,
    fetchNotifications,
    setHighlightedNotification,
    clearHighlightedNotification,
    highlightedNotificationId,
    markAsRead,
  } = useNotifications();

  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const notifications = getNotificationsByCategory(category);

  // Avoid hydration mismatch: render stable skeleton until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Refresh notifications when category changes
    if (fetchNotifications) {
      fetchNotifications();
    }
  }, [category]);

  // Handle highlighting from URL parameter
  useEffect(() => {
    if (highlightId) {
      setHighlightedNotification(highlightId);

      // Clear highlight after 3 seconds
      const timer = setTimeout(() => {
        clearHighlightedNotification();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [highlightId, setHighlightedNotification, clearHighlightedNotification]);

  if (!mounted || loading) {
    return (
      <div className="flex flex-col gap-5 px-5 py-10">
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
      </div>
    );
  }
  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  // Use store-provided category filtering result directly
  const filteredNotifications = notifications || [];

  return (
    <div className="no-scrollbar flex w-full flex-col gap-5 overflow-auto px-5 py-7 md:h-[800px]">
      {filteredNotifications.length === 0 ? (
        <div className="flex w-full justify-center py-12">
          <div className="text-center">
            <div className="mb-4 text-6xl">🔔</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              {t("seller.notifications.empty_title")}
            </h3>
            <p className="text-gray-500">
              {t("seller.notifications.empty_sub")}
            </p>
          </div>
        </div>
      ) : (
        filteredNotifications.map((notification, index) => (
          <NotificationCard
            key={notification.id || index}
            // image={notification.image}
            title={notification.title}
            desc={notification.body || notification.message}
            time={notification.createdAt}
            isHighlighted={highlightedNotificationId === notification.id}
            isRead={notification.isRead}
            onClick={() => {
              // Mark as read when clicked
              if (!notification.isRead) {
                markAsRead(notification.id);
              }
            }}
          />
        ))
      )}
    </div>
  );
};

export default NotificationSection;
