import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AuctionSectionSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Title */}
      <div className="flex justify-between items-center">
        <Skeleton height={32} width={200} />
        <Skeleton height={32} width={100} />
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton height={180} style={{ borderRadius: 12 }} />
            <Skeleton height={20} width={"80%"} />
            <Skeleton height={16} width={"50%"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionSectionSkeleton; 