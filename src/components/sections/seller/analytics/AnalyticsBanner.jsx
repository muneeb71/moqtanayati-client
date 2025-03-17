import ActiveOrdersCard from "./cards/ActiveOrdersCard";
import LastHalfYearCard from "./cards/LastHalfYearCard";
import OrdersCompletedCard from "./cards/OrdersCompletedCard";
import RatingReviewsCard from "./cards/RatingReviewsCard";
import SalesAnalyticsCard from "./cards/SalesAnalyticsCard";
import TotalOrdersCard from "./cards/TotalOrdersCard";

const AnalyticsBanner = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-6 py-10 text-davyGray">
      <div className="grid w-full md:grid-cols-[9fr_10fr] gap-6">
        <div className="grid w-full md:grid-rows-[10fr_8fr] gap-6">
          <SalesAnalyticsCard />
          <div className="grid w-full md:grid-cols-[5fr_6fr] gap-6">
            <ActiveOrdersCard />
            <OrdersCompletedCard />
          </div>
        </div>
        <RatingReviewsCard />
      </div>
      <div className="grid w-full md:grid-cols-[6fr_5fr] gap-6">
        <LastHalfYearCard />
        <TotalOrdersCard />
      </div>
    </div>
  );
};

export default AnalyticsBanner;
