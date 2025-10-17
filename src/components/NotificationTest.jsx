"use client";

import { useNotification } from "@/providers/notification-provider";
import { useState } from "react";

const NotificationTest = () => {
  const { permission, requestPermission, isInitialized } = useNotification();
  const [testMessage, setTestMessage] = useState("");

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      alert("Notification permission granted!");
    } else {
      alert("Notification permission denied!");
    }
  };

  const sendTestNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Test Notification", {
        body: testMessage || "This is a test notification",
        icon: "/static/logo.png",
        badge: "/static/logo.png",
      });
    } else {
      alert("Please grant notification permission first!");
    }
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h3 className="mb-4 text-lg font-semibold">Notification Test</h3>

      <div className="space-y-2">
        <p>
          <strong>Permission Status:</strong> {permission}
        </p>
        <p>
          <strong>Initialized:</strong> {isInitialized ? "Yes" : "No"}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleRequestPermission}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Request Permission
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Test message"
            className="rounded border px-3 py-2"
          />
          <button
            onClick={sendTestNotification}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Send Test Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationTest;
