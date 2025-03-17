import StoreBanner from "@/components/sections/seller/my-store/StoreBanner";
import StoreProductsSection from "@/components/sections/seller/my-store/StoreProductsSection";

const MyStorePage = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center px-3 pb-20">
      <StoreBanner />
      <StoreProductsSection />
    </div>
  );
};

export default MyStorePage;
