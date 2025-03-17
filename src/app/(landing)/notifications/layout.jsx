import PageHeading from "@/components/headings/PageHeading";
import NotificationBar from "@/components/sections/landing/notifications/NotificationBar";

const NotificationLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center gap-10 px-3">
      <PageHeading>Notifications</PageHeading>
      <div className="flex w-full max-w-[562px] items-center flex-col">
        <NotificationBar />
        {children}
      </div>
    </div>
  );
};

export default NotificationLayout;
