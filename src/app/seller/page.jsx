import DraftsSection from "@/components/sections/seller/home/DraftsSection";
import SellerBanner from "@/components/sections/seller/home/seller-banner/SellerBanner";

const SellerPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <SellerBanner />
      <DraftsSection />
    </div>
  );
};

export default SellerPage;
