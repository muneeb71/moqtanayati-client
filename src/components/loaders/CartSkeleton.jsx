import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CartSkeleton = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col gap-10 py-10">
      <Skeleton height={40} width={200} style={{ marginBottom: 24 }} />
      <div className="grid w-full max-w-7xl gap-10 md:grid-cols-2">
        <div className="flex h-80 w-full flex-col gap-10 overflow-y-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex w-full items-center justify-between">
              <div className="flex h-full w-full items-center gap-4">
                <Skeleton height={140} width={140} style={{ borderRadius: 16 }} />
                <div className="flex h-full flex-col justify-between py-2 w-full">
                  <Skeleton height={28} width={180} style={{ marginBottom: 8 }} />
                  <Skeleton height={20} width={120} />
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-between gap-2">
                <Skeleton circle height={40} width={40} />
                <Skeleton height={24} width={32} />
                <Skeleton circle height={40} width={40} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col justify-between rounded-3xl border border-black/10 bg-[#CCCCCC1F] px-5 py-8">
          <Skeleton height={32} width={180} style={{ marginBottom: 16 }} />
          <Skeleton height={24} width={120} style={{ marginBottom: 8 }} />
          <Skeleton height={24} width={120} style={{ marginBottom: 8 }} />
          <Skeleton height={24} width={120} style={{ marginBottom: 8 }} />
          <Skeleton height={48} width={200} style={{ marginTop: 24 }} />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton; 