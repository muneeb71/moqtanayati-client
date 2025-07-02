import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AnalyticsBannerSkeleton = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-6 py-10 text-davyGray">
      <div className="grid w-full md:grid-cols-[9fr_10fr] gap-6">
        <div className="grid w-full md:grid-rows-[10fr_8fr] gap-6">
          {/* SalesAnalyticsCard Skeleton */}
          <div className="flex w-full flex-col rounded-[30px] px-6 py-10">
            <Skeleton height={32} width={100} style={{ marginBottom: 16 }} />
            <div className="grid w-full grid-cols-2">
              <Skeleton height={48} width={120} />
              <div className="flex flex-col items-end gap-5">
                <Skeleton height={32} width={32} circle />
                <Skeleton height={28} width={60} />
              </div>
            </div>
          </div>
          <div className="grid w-full md:grid-cols-[5fr_6fr] gap-6">
            {/* ActiveOrdersCard Skeleton */}
            <div className="flex w-full flex-col gap-5 rounded-[30px] px-6 py-7">
              <Skeleton height={32} width={120} style={{ marginBottom: 16 }} />
              <div className="flex w-full justify-between">
                <Skeleton height={48} width={80} />
                <div className="flex flex-col items-end">
                  <Skeleton height={32} width={32} circle />
                  <Skeleton height={20} width={40} />
                </div>
              </div>
            </div>
            {/* OrdersCompletedCard Skeleton */}
            <div className="flex w-full flex-col gap-5 rounded-[30px] px-6 py-7">
              <Skeleton height={32} width={160} style={{ marginBottom: 16 }} />
              <div className="flex w-full justify-between">
                <Skeleton height={48} width={80} />
                <div className="flex flex-col items-end">
                  <Skeleton height={32} width={32} circle />
                  <Skeleton height={20} width={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* RatingReviewsCard Skeleton */}
        <div className="flex flex-col gap-5 rounded-[30px] bg-[#F9F9FA] px-8 py-8">
          <Skeleton height={32} width={180} style={{ marginBottom: 16 }} />
          <div className="flex flex-col md:flex-row h-full items-center gap-6">
            <Skeleton height={250} width={250} circle />
            <div className="flex flex-col gap-6 w-full">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Skeleton height={12} width={12} circle />
                    <Skeleton height={20} width={60} />
                  </div>
                  <Skeleton height={20} width={40} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full md:grid-cols-[6fr_5fr] gap-6">
        {/* LastHalfYearCard Skeleton */}
        <div className="flex flex-col gap-8 rounded-[30px] bg-[#F9F9FA] p-5 md:p-8">
          <Skeleton height={32} width={200} style={{ marginBottom: 16 }} />
          <div className="grid h-full grid-cols-[40px_1fr] gap-2">
            <div className="flex flex-col items-end justify-between gap-10 pb-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={24} width={40} />
              ))}
            </div>
            <div className="grid w-full grid-cols-6 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <Skeleton height={80} width={32} style={{ borderRadius: 15 }} />
                  <Skeleton height={20} width={32} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* TotalOrdersCard Skeleton */}
        <div className="h-[500px] flex flex-col gap-8 rounded-[30px] bg-[#F9F9FA] p-5 md:p-8">
          <Skeleton height={32} width={200} style={{ marginBottom: 16 }} />
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <Skeleton height={20} width={120} />
            <Skeleton height={20} width={40} />
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={80} />
          </div>
          <Skeleton height={250} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBannerSkeleton; 