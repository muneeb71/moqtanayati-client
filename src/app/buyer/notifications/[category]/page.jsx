import NotificationSection from "@/components/sections/landing/notifications/NotificationSection";

const NotificationCategoryPage = async ({ params }) => {
  const category = (await params).category;
  return <NotificationSection category={category} />;
};

export default NotificationCategoryPage;
