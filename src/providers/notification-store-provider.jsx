"use client";

import { createContext, useContext, useEffect } from "react";
import useNotificationStore from "@/stores/notification-store";
import { getUserNotifications } from "@/lib/api/notification";
import { notificationHandler } from "@/lib/notification-handler";
import { socketManager } from "@/lib/socket-client";

const NotificationStoreContext = createContext();

export const useNotificationStoreContext = () => {
  const context = useContext(NotificationStoreContext);
  if (!context) {
    throw new Error(
      "useNotificationStoreContext must be used within a NotificationStoreProvider",
    );
  }
  return context;
};

export const NotificationStoreProvider = ({ children }) => {
  const store = useNotificationStore();

  // Fetch notifications from server
  const fetchNotifications = async () => {
    try {
      store.setLoading(true);
      store.setError(null);

      const response = await getUserNotifications();
      console.log("notification response : ", response);

      if (response.success) {
        const notifications = response.data || [];
        store.setNotifications(notifications);
      } else {
        store.setError(response.message || "Failed to fetch notifications");
      }
    } catch (error) {
      store.setError(error.message || "Failed to fetch notifications");
    } finally {
      store.setLoading(false);
    }
  };

  // Initialize notifications on mount
  useEffect(() => {
    const initializeNotifications = async () => {
      // Check if we need to refresh notifications
      if (store.needsRefresh() || store.notifications.length === 0) {
        await fetchNotifications();
      }
    };

    initializeNotifications();
  }, []);

  // Join user room on mount to ensure realtime events after refresh
  useEffect(() => {
    const getCookie = (name) => {
      try {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      } catch (_) {}
      return null;
    };
    (async () => {
      try {
        const userId = getCookie("userId");
        if (!userId) return;
        socketManager.setCurrentUser(userId);
        await socketManager.connect();
        await socketManager.joinUser(userId);
      } catch (_) {}
    })();
  }, []);

  // Set up Firebase message handling
  useEffect(() => {
    const setupFirebaseHandling = async () => {
      try {
        await notificationHandler.initialize();

        // Override the notification handler to add to store
        const originalHandleMessage =
          notificationHandler.handleForegroundMessage;
        notificationHandler.handleForegroundMessage = (payload) => {
          // Extract notification data
          const notification = {
            id: payload.messageId || Date.now().toString(),
            title:
              payload.notification?.title ||
              payload.data?.title ||
              "New Notification",
            body: payload.notification?.body || payload.data?.body || "",
            type: payload.data?.type || "general",
            category: payload.data?.category || "All",
            data: payload.data || {},
            createdAt: new Date().toISOString(),
          };

          // Add to store
          store.addNotification(notification);

          // Also show browser notification
          if (originalHandleMessage) {
            originalHandleMessage(payload);
          }
        };
      } catch (error) {
        console.error("Failed to setup Firebase notification handling:", error);
      }
    };

    setupFirebaseHandling();
  }, []);

  // Set up realtime socket listeners (order:new -> add notification)
  useEffect(() => {
    let unsubscribe = () => {};
    (async () => {
      try {
        await socketManager.connect();
        const off = socketManager.on("order:new", (order) => {
          // Create a purchase notification from order
          const notification = {
            id: `order:${order?.id}`,
            title: "New Order Received",
            body: "You have a new order.",
            type: "sales",
            category: "purchases",
            createdAt: new Date().toISOString(),
            data: { orderId: order?.id },
          };
          store.addNotification(notification);
        });
        unsubscribe = off;
      } catch (_) {}
    })();
    return () => {
      try {
        unsubscribe();
      } catch (_) {}
    };
  }, []);

  const value = {
    ...store,
    fetchNotifications,
  };

  return (
    <NotificationStoreContext.Provider value={value}>
      {children}
    </NotificationStoreContext.Provider>
  );
};
