import { arrowUpRightIcon } from "@/assets/icons/seller-icons";
import PageHeading from "@/components/headings/PageHeading";
import AnalyticsBanner from "@/components/sections/seller/analytics/AnalyticsBanner";

const AnalyticsPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <PageHeading>Analytics</PageHeading>
      <AnalyticsBanner />
    </div>
  );
};

export default AnalyticsPage;
