const PreferencesSectionSkeleton = () => (
  <div className="flex w-full max-w-[470px] flex-col gap-6 p-5 animate-pulse">
    {/* Category Selection */}
    <div className="flex w-full flex-col gap-2">
      <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
      <div className="flex gap-2 mb-2">
        <div className="h-8 w-2/3 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-7 w-20 bg-gray-200 rounded-full" />
        <div className="h-7 w-20 bg-gray-200 rounded-full" />
      </div>
    </div>
    {/* Price Range */}
    <div className="flex w-full flex-col gap-2">
      <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="flex w-full items-center justify-between gap-2">
        <div className="h-8 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="h-8 w-24 bg-gray-200 rounded" />
      </div>
    </div>
    {/* Auction Alerts */}
    <div className="flex w-full flex-col gap-2">
      <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-48 bg-gray-200 rounded mb-2" />
      <div className="flex flex-col gap-4 py-5">
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="h-6 w-12 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 w-56 bg-gray-200 rounded" />
          <div className="h-6 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
    <div className="h-10 w-40 bg-gray-200 rounded self-center my-10" />
  </div>
);

export default PreferencesSectionSkeleton; 