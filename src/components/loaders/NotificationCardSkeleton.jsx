const NotificationCardSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-2 rounded-xl bg-gray-100 p-4 w-96">
    <div className="h-5 w-1/2 bg-gray-200 rounded" />
    <div className="h-4 w-3/4 bg-gray-200 rounded" />
    <div className="h-3 w-1/4 bg-gray-200 rounded self-end" />
  </div>
);

export default NotificationCardSkeleton; 