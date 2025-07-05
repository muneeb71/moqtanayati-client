import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductDetailsSkeleton = () => {
  return (
    <div className="grid w-full max-w-7xl gap-10 px-3 py-8 md:grid-cols-2 md:py-20">
      <div className="flex flex-col gap-5">
        {/* Image slider skeleton */}
        <Skeleton height={340} width={"100%"} style={{ borderRadius: 20 }} />
        {/* Seller card skeleton */}
        <Skeleton height={100} width={"100%"} style={{ borderRadius: 16 }} />
      </div>
      <div>
        {/* Product details card skeleton */}
        <Skeleton height={320} width={"100%"} style={{ borderRadius: 20 }} />
      </div>
      {/* Recommended section skeleton */}
      <div className="md:col-span-2 flex flex-col gap-4 w-full mt-10">
        <Skeleton height={32} width={220} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={180} width={"100%"} style={{ borderRadius: 16 }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton; 