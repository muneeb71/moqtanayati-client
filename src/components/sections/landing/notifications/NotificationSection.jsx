import NotificationCard from "@/components/cards/NotificationCard";
import { dummyNotifications } from "@/lib/dummy-notifications";
import Image from "next/image";

const NotificationSection = ({ category = "" }) => {
  const notifications =
    category == "all"
      ? dummyNotifications
      : dummyNotifications.filter(
          (notification) => notification.category === category,
        );
  return (
    <div className="no-scrollbar flex w-full flex-col gap-5 overflow-auto px-5 py-7 md:h-[800px]">
      {notifications.map((notification, index) => (
        <NotificationCard
          image={notification.image}
          title={notification.title}
          desc={notification.desc}
          time={notification.time}
        />
      ))}
    </div>
  );
};

export default NotificationSection;
