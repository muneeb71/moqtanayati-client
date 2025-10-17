"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { notificationHandler } from "@/lib/notification-handler";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Check if we're in the browser
        if (typeof window === "undefined") return;

        // Check notification permission
        if ("Notification" in window) {
          setPermission(Notification.permission);
        }

        // Initialize the notification handler
        const success = await notificationHandler.initialize();
        if (success) {
          setIsInitialized(true);
          console.log("Notification provider initialized");
        }
      } catch (error) {
        console.error("Failed to initialize notification provider:", error);
      }
    };

    initializeNotifications();
  }, []);

  const requestPermission = async () => {
    try {
      const granted = await notificationHandler.requestPermission();
      if (granted) {
        setPermission("granted");
        return true;
      } else {
        setPermission("denied");
        return false;
      }
    } catch (error) {
      console.error("Failed to request notification permission:", error);
      return false;
    }
  };

  const value = {
    isInitialized,
    permission,
    requestPermission,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
