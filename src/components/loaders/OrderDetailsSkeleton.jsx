import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OrderDetailsSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 pb-28">
      <Skeleton height={40} width={220} style={{ borderRadius: 8, margin: '32px 0' }} />
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-20">
        <div className="grid w-full gap-10 md:grid-cols-[6fr_4fr]">
          <div className="flex w-full flex-col justify-center gap-8">
            <Skeleton height={180} width={"100%"} style={{ borderRadius: 16 }} />
            <Skeleton height={120} width={"100%"} style={{ borderRadius: 16 }} />
          </div>
          <Skeleton height={220} width={"100%"} style={{ borderRadius: 16 }} />
        </div>
        <Skeleton height={60} width={"100%"} style={{ borderRadius: 16 }} />
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton; 