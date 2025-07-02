"use client"
import NotificationCard from "@/components/cards/NotificationCard";
import NotificationCardSkeleton from "@/components/loaders/NotificationCardSkeleton";
import { useEffect, useState } from "react";
import { getUserNotifications } from "@/lib/api/notification";

const NotificationSection = ({ category = "" }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getUserNotifications().then(({ success, data, message }) => {
      console.log(success, data);
      
      if (!mounted) return;
      if (success) {
        setNotifications(data?.data);
      } else {
        setError(message || "Failed to fetch notifications.");
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [category]);

  if (loading) {
    return (
      <div className="flex flex-col gap-5 py-10 px-5">
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
      </div>
    );
  }
  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  // Filter notifications by title if category is not 'all' and not empty
  let filteredNotifications = notifications;
  if (category && category !== "all") {
    filteredNotifications = notifications.filter(n =>
      n.title?.toLowerCase().includes(category.toLowerCase())
    );
  }

  return (
    <div className="no-scrollbar flex w-full flex-col gap-5 overflow-auto px-5 py-7 md:h-[800px]">
      {filteredNotifications.length === 0 ? (
        <div className="py-10 text-center text-gray-500">No notifications available.</div>
      ) : (
        filteredNotifications.map((notification, index) => (
          <NotificationCard
            key={index}
            // image={notification.image}
            title={notification.title}
            desc={notification.message}
            time={notification.createdAt}
          />
        ))
      )}
    </div>
  );
};

export default NotificationSection;
