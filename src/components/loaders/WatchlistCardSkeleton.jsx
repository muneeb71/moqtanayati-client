const WatchlistCardSkeleton = () => (
  <div
    className="animate-pulse grid h-full max-h-[138px] grid-cols-[96px_1fr] overflow-hidden rounded-[12px] bg-white sm:grid-cols-[126px_1fr]"
    style={{ boxShadow: "0px 0px 29.85px 2.39px #0000001A" }}
  >
    <div className="h-full w-full overflow-hidden bg-gray-200" />
    <div className="flex h-full w-full flex-col justify-between p-2">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col px-1.5 gap-2">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-3 w-6 bg-gray-200 rounded" />
            <div className="flex items-center gap-1">
              <div className="size-[19.1px] min-h-[19.1px] min-w-[19.1px] rounded-full bg-gray-200" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
        <div className="grid size-[33px] place-items-center rounded-[4.6px] bg-gray-200" />
      </div>
      <div className="h-[1px] w-full bg-gray-200" />
      <div className="flex items-center justify-between gap-5 px-1.5">
        <div className="flex flex-col gap-1">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-12 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-20 rounded-[8px] bg-gray-200" />
      </div>
    </div>
  </div>
);

export default WatchlistCardSkeleton; 