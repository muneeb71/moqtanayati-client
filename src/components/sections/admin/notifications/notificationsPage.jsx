"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { getAllNotifications } from "@/lib/api/admin/notifications/getAllNotifications";

const tabs = ["All", "Bids", "Messages", "Purchases"];

const AdminNotifications = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await getAllNotifications();
        setNotifications(res.data.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  const filtered =
    selectedTab === "All"
      ? notifications
      : notifications.filter(
          (n) => n.type?.toLowerCase() === selectedTab.toLowerCase(),
        );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        User Notifications
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              selectedTab === tab
                ? "bg-teal-600 text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {loading ? (
        <p className="text-gray-500">Loading notifications...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No notifications found.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm md:flex-row md:items-start md:justify-between"
            >
              <div className="flex gap-4">
                <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={
                      n.user?.avatar
                        ? n.user.avatar
                        : "/static/headphone-2.jpeg"
                    }
                    alt={n.title}
                    width={50}
                    height={50}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md font-semibold text-gray-800">
                    {n.title}
                    <span className="ml-2 font-normal text-gray-700">
                      — {n.message}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                  {n.user && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        <strong>User:</strong> {n.user.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {n.user.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {n.user.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {n.user.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <MoreVertical className="self-start text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
