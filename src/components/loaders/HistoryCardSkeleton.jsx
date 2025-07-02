const HistoryCardSkeleton = () => (
  <div className="animate-pulse rounded-xl bg-gray-100 p-4 flex flex-col gap-3">
    <div className="h-5 w-1/3 bg-gray-200 rounded" />
    <div className="h-4 w-1/2 bg-gray-200 rounded" />
    <div className="h-4 w-1/4 bg-gray-200 rounded" />
    <div className="h-8 w-full bg-gray-200 rounded mt-2" />
  </div>
);

export default HistoryCardSkeleton;
export { HistoryCardSkeleton }; 