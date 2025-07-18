export default function AdminAuctionSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col items-center gap-10 pb-20">
      <div className="h-9 w-32 self-end rounded-lg bg-gray-200" />
      <div className="grid w-full max-w-7xl gap-10 md:grid-cols-2">
        <div className="h-[400px] w-full rounded-lg bg-gray-200" />
        <div className="flex flex-col gap-4">
          <div className="h-6 w-1/2 rounded bg-gray-200" />
          <div className="h-10 w-1/3 rounded bg-gray-300" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-20 w-full rounded bg-gray-100" />
        </div>
      </div>
      <div className="flex w-full max-w-7xl flex-col gap-6">
        <div className="h-8 w-40 rounded bg-gray-200" />
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-24 w-full rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
