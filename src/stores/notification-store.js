import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNotificationStore = create(
  persist(
    (set, get) => ({
      // State
      notifications: [],
      loading: false,
      error: null,
      lastFetched: null,
      highlightedNotificationId: null,

      // Actions
      setNotifications: (notifications) => {
        // Normalize incoming notifications from API
        // Preserve previous read state when possible
        const existingById = Object.fromEntries(
          (get().notifications || []).map((n) => [n.id, n]),
        );
        const mapTypeToCategory = (type) => {
          const t = (type || "").toLowerCase();
          if (t === "sales" || t === "purchases") return "purchases";
          if (t === "bids" || t === "bid") return "bids";
          if (t === "messages" || t === "message") return "messages";
          return "all";
        };

        const normalized = (notifications || []).map((n) => {
          const categoryLower = (
            n.category ? n.category : mapTypeToCategory(n.type)
          )
            .toString()
            .toLowerCase();
          const previous = existingById[n.id];
          return {
            id: n.id,
            title: n.title,
            body: n.body || n.message,
            type: n.type || "general",
            category: categoryLower, // one of: all|bids|messages|purchases
            // Keep existing read flag if we have it to avoid badge reappearing
            isRead: previous ? Boolean(previous.isRead) : Boolean(n.isRead),
            createdAt: n.createdAt || n.created_at || new Date().toISOString(),
            data: n.data || {},
            ...n,
          };
        });

        // Sort notifications by createdAt (latest first)
        const sortedNotifications = normalized.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.created_at || 0);
          const dateB = new Date(b.createdAt || b.created_at || 0);
          return dateB - dateA;
        });
        set({
          notifications: sortedNotifications,
          lastFetched: new Date().toISOString(),
        });
      },

      addNotification: (notification) => {
        const currentNotifications = get().notifications;
        const mapTypeToCategory = (type) => {
          const t = (type || "").toLowerCase();
          if (t === "sales" || t === "purchases") return "purchases";
          if (t === "bids" || t === "bid") return "bids";
          if (t === "messages" || t === "message") return "messages";
          return "all";
        };
        const newNotification = {
          id: notification.id || Date.now().toString(),
          title: notification.title,
          body: notification.body || notification.message,
          type: notification.type || "general",
          category:
            (notification.category
              ? notification.category
              : mapTypeToCategory(notification.type)) || "all",
          isRead: Boolean(notification.isRead),
          createdAt: notification.createdAt || new Date().toISOString(),
          data: notification.data || {},
          ...notification,
        };

        // Add to beginning of array (most recent first) and sort
        const updatedNotifications = [
          newNotification,
          ...currentNotifications,
        ].sort((a, b) => {
          const dateA = new Date(a.createdAt || a.created_at || 0);
          const dateB = new Date(b.createdAt || b.created_at || 0);
          return dateB - dateA;
        });
        set({ notifications: updatedNotifications });
      },

      markAsRead: (notificationId) => {
        const notifications = get().notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification,
        );
        set({ notifications });
      },

      markAllAsRead: () => {
        const notifications = get().notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));
        set({ notifications });
      },

      removeNotification: (notificationId) => {
        const notifications = get().notifications.filter(
          (notification) => notification.id !== notificationId,
        );
        set({ notifications });
      },

      clearNotifications: () => {
        set({
          notifications: [],
          lastFetched: null,
          highlightedNotificationId: null,
        });
      },

      setHighlightedNotification: (notificationId) => {
        set({ highlightedNotificationId: notificationId });
      },

      clearHighlightedNotification: () => {
        set({ highlightedNotificationId: null });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      setError: (error) => {
        set({ error });
      },

      // Get notifications by category
      getNotificationsByCategory: (category) => {
        const notifications = get().notifications;

        const c = (category || "all").toString().toLowerCase();
        if (c === "all") {
          return notifications;
        }

        // Match on normalized category
        return notifications.filter((notification) => {
          const notificationCategory = (notification.category || "all")
            .toString()
            .toLowerCase();
          return notificationCategory === c;
        });
      },

      // Get unread count
      getUnreadCount: () => {
        return get().notifications.filter(
          (notification) => !notification.isRead,
        ).length;
      },

      // Get unread count by category
      getUnreadCountByCategory: (category) => {
        const notifications = get().getNotificationsByCategory(category);
        return notifications.filter((notification) => !notification.isRead)
          .length;
      },

      // Check if notifications need refresh (older than 5 minutes)
      needsRefresh: () => {
        const lastFetched = get().lastFetched;
        if (!lastFetched) return true;
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        return new Date(lastFetched) < fiveMinutesAgo;
      },
    }),
    {
      name: "notification-store",
      partialize: (state) => ({
        notifications: state.notifications,
        lastFetched: state.lastFetched,
      }),
    },
  ),
);

export default useNotificationStore;
