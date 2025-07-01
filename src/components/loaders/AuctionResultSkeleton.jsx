import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AuctionResultSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <Skeleton height={32} width={150} />
        <Skeleton height={40} width={100} style={{ borderRadius: 12 }}/>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton height={160} style={{ borderRadius: 12 }} />
            <Skeleton height={20} width={"80%"} />
            <Skeleton height={16} width={"50%"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionResultSkeleton; 