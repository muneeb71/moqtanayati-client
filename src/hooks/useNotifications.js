"use client";

import { useNotificationStoreContext } from "@/providers/notification-store-provider";

export const useNotifications = () => {
  const store = useNotificationStoreContext();

  return {
    // State
    notifications: store.notifications,
    loading: store.loading,
    error: store.error,
    highlightedNotificationId: store.highlightedNotificationId,

    // Actions
    fetchNotifications: store.fetchNotifications,
    addNotification: store.addNotification,
    markAsRead: store.markAsRead,
    markAllAsRead: store.markAllAsRead,
    removeNotification: store.removeNotification,
    clearNotifications: store.clearNotifications,
    setHighlightedNotification: store.setHighlightedNotification,
    clearHighlightedNotification: store.clearHighlightedNotification,

    // Getters
    getNotificationsByCategory: store.getNotificationsByCategory,
    getUnreadCount: store.getUnreadCount,
    getUnreadCountByCategory: store.getUnreadCountByCategory,
  };
};
