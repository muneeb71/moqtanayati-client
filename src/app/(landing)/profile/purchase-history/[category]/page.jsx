import HistoryCard from "@/components/sections/landing/profile/purchase-history/HistoryCard";
import { purchaseHistoryList } from "@/lib/dummy-purchase-history";

const PurchaseHistoryPage = () => {
  return (
    <div className="no-scrollbar flex max-h-[40rem] flex-col gap-3 overflow-y-auto py-5">
      {purchaseHistoryList.map((item, index) => (
        <HistoryCard item={item} key={index} />
      ))}
    </div>
  );
};

export default PurchaseHistoryPage;
