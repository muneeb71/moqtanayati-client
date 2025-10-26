"use client";

import { getMessagingIfSupported } from "./firebase";
import { onMessage } from "firebase/messaging";

export class NotificationHandler {
  constructor() {
    this.messaging = null;
    this.isInitialized = false;
    this.tokenRefreshInterval = null;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      this.messaging = await getMessagingIfSupported();
      if (!this.messaging) {
        console.log("Firebase messaging not supported");
        return false;
      }

      // Set up foreground message handling
      onMessage(this.messaging, (payload) => {
        console.log("Foreground message received:", payload);
        this.handleForegroundMessage(payload);
      });

      // Set up token refresh mechanism
      this.setupTokenRefresh();

      this.isInitialized = true;
      console.log("Notification handler initialized");
      return true;
    } catch (error) {
      console.error("Failed to initialize notification handler:", error);
      return false;
    }
  }

  handleForegroundMessage(payload) {
    const { title, body, icon } = payload.notification || {};

    if (title && body) {
      // Show browser notification
      if (Notification.permission === "granted") {
        const notificationId =
          payload.messageId ||
          payload.data?.notificationId ||
          Date.now().toString();
        const userRole = payload.data?.userRole || "seller";

        const notification = new Notification(title, {
          body: body,
          icon: icon || "/static/logo.png",
          badge: "/static/logo.png",
          tag: "moqtanayati-notification",
          requireInteraction: true,
          data: {
            notificationId: notificationId,
            userRole: userRole,
            ...payload.data,
          },
        });

        // Handle notification click
        notification.onclick = () => {
          window.focus();
          notification.close();

          // Navigate to notification page with highlight
          const targetUrl = `/${userRole}/notifications/all?highlight=${notificationId}`;
          window.location.href = targetUrl;
        };
      }
    }
  }

  // Method to add notification to store (called by provider)
  addNotificationToStore(notification) {
    // This will be overridden by the provider
    console.log("Notification to be added to store:", notification);
  }

  async requestPermission() {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission === "denied") {
      console.log("Notification permission denied by user");
      // Clear any existing token since permission is denied
      localStorage.removeItem("deviceToken");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "denied") {
        console.log("User denied notification permission");
        localStorage.removeItem("deviceToken");
      }
      return permission === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }

  setupTokenRefresh() {
    // Refresh token every 30 minutes to ensure it's always valid
    this.tokenRefreshInterval = setInterval(
      async () => {
        try {
          console.log("Refreshing FCM token...");
          await this.refreshToken();
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      },
      30 * 60 * 1000,
    ); // 30 minutes
  }

  async refreshToken() {
    if (!this.messaging) return null;

    // Check permission first
    if (Notification.permission !== "granted") {
      console.log(
        "Notification permission not granted, skipping token refresh",
      );
      return null;
    }

    try {
      const { getToken } = await import("firebase/messaging");
      const token = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
      });

      if (token && this.isValidToken(token)) {
        console.log("Token refreshed successfully");
        localStorage.setItem("deviceToken", token);
        return token;
      } else {
        console.warn("Invalid token generated");
      }
    } catch (error) {
      if (error.code === "messaging/permission-blocked") {
        console.log("Notification permission blocked by user");
        // Clear any existing token since permission is blocked
        localStorage.removeItem("deviceToken");
        return null;
      } else if (error.code === "messaging/permission-default") {
        console.log("Notification permission not requested yet");
        return null;
      } else {
        console.error("Token refresh failed:", error);
      }
    }
    return null;
  }

  isValidToken(token) {
    // FCM tokens are typically 163 characters long and contain specific patterns
    if (!token || typeof token !== "string") return false;
    if (token.length < 100) return false;

    // Check for common FCM token patterns
    const fcmTokenPattern = /^[A-Za-z0-9_-]+:[A-Za-z0-9_-]+$/;
    return fcmTokenPattern.test(token);
  }

  cleanup() {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
      this.tokenRefreshInterval = null;
    }
  }
}

// Create a singleton instance
export const notificationHandler = new NotificationHandler();
