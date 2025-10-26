/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js",
);

// firebase.initializeApp({
//   apiKey: self.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: self.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: self.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: self.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: self.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: self.NEXT_PUBLIC_FIREBASE_APP_ID,
// });

firebase.initializeApp({
  apiKey: "AIzaSyCHX4xkQhj_DMMHb3xcNm5FejY82odfM7k",
  authDomain: "vorae-70496.firebaseapp.com",
  projectId: "vorae-70496",
  storageBucket: "vorae-70496.firebasestorage.app",
  messagingSenderId: "847303960399",
  appId: "1:847303960399:web:5dfff21c15f64cd536c73a",
  measurementId: "G-TK5GPYNDLR",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  try {
    console.log("Background message received:", payload);
    const { title, body, icon } = payload.notification || {};
    const notificationTitle = title || "New Notification";
    const notificationBody = body || "You have a new notification";
    const notificationIcon = icon || "/static/logo.png";

    const notificationOptions = {
      body: notificationBody,
      icon: notificationIcon,
      badge: "/static/logo.png",
      tag: "moqtanayati-notification",
      requireInteraction: true,
      actions: [
        {
          action: "view",
          title: "View",
        },
        {
          action: "dismiss",
          title: "Dismiss",
        },
      ],
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error("Error showing notification:", error);
  }
});

// Broadcast helper to notify all open clients (pages)
async function broadcastToClients(message) {
  try {
    const allClients = await clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });
    for (const client of allClients) {
      client.postMessage(message);
    }
  } catch (e) {
    // noop
  }
}

// Try to handle token refresh (compat API). If available, ask pages to refresh token.
try {
  if (typeof messaging.onTokenRefresh === "function") {
    messaging.onTokenRefresh(async () => {
      // Request pages to refresh token and sync to server
      await broadcastToClients({ type: "FCM_REFRESH_TOKEN" });
    });
  }
} catch (e) {
  // ignore
}

// When push subscription changes (browser may rotate subscription), ask pages to refresh token
self.addEventListener("pushsubscriptionchange", async () => {
  await broadcastToClients({ type: "FCM_REFRESH_TOKEN" });
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event);
  event.notification.close();

  const notificationData = event.notification.data || {};
  const notificationId = notificationData.notificationId;
  const userRole = notificationData.userRole || "seller";

  let targetUrl = `/${userRole}/notifications/all`;

  // If we have a specific notification ID, add it as a query parameter
  if (notificationId) {
    targetUrl += `?highlight=${notificationId}`;
  }

  if (event.action === "view") {
    // Open the notification page
    event.waitUntil(clients.openWindow(targetUrl));
  } else if (event.action === "dismiss") {
    // Just close the notification
    event.notification.close();
  } else {
    // Default action - open the notification page
    event.waitUntil(clients.openWindow(targetUrl));
  }
});

// Handle service worker errors gracefully
self.addEventListener("error", (event) => {
  console.error("Service worker error:", event.error);
});

self.addEventListener("unhandledrejection", (event) => {
  console.error("Service worker unhandled rejection:", event.reason);
});
