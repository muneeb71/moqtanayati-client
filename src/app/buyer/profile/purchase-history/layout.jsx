import PageHeading from "@/components/headings/PageHeading";
import HistoryBar from "@/components/sections/landing/profile/purchase-history/HistoryBar";

const PurchaseHistoryLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>Profile {">"} Purchase History</PageHeading>
      <div className="flex w-full max-w-lg flex-col">
        <HistoryBar />
        {children}
      </div>
    </div>
  );
};

export default PurchaseHistoryLayout;
