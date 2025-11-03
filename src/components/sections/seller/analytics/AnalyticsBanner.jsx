"use client";
import { useEffect, useState } from "react";
import { createChat as getAnalytics } from "@/lib/api/profile/getAnalytics";
import ActiveOrdersCard from "./cards/ActiveOrdersCard";
import LastHalfYearCard from "./cards/LastHalfYearCard";
import OrdersCompletedCard from "./cards/OrdersCompletedCard";
import RatingReviewsCard from "./cards/RatingReviewsCard";
import SalesAnalyticsCard from "./cards/SalesAnalyticsCard";
import TotalOrdersCard from "./cards/TotalOrdersCard";
import AnalyticsBannerSkeleton from "@/components/loaders/AnalyticsBannerSkeleton";
import useTranslation from "@/hooks/useTranslation";

const AnalyticsBanner = () => {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAnalytics();
        setAnalytics(data?.data);
      } catch (err) {
        setError(t("analytics.error_failed_load"));
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <AnalyticsBannerSkeleton />;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-6 py-10 text-davyGray">
      <div className="grid w-full gap-6 md:grid-cols-[9fr_10fr]">
        <div className="grid w-full gap-6 md:grid-rows-[10fr_8fr]">
          <SalesAnalyticsCard totalSales={analytics?.totalSales} />
          <div className="grid w-full gap-6 md:grid-cols-[5fr_6fr]">
            <ActiveOrdersCard activeOrders={analytics?.activeOrders} />
            <OrdersCompletedCard completedOrders={analytics?.completedOrders} />
          </div>
        </div>
        <RatingReviewsCard
          ratings={
            analytics?.ratings
              ? [
                  {
                    name: "Positive",
                    value: analytics.ratings.positive,
                    color: "#00FF7F",
                  },
                  {
                    name: "Neutral",
                    value: analytics.ratings.neutral,
                    color: "#C8FFC8",
                  },
                  {
                    name: "Negative",
                    value: analytics.ratings.negative,
                    color: "#FF9999",
                  },
                  {
                    name: "Nil",
                    value: analytics.ratings.nil,
                    color: "#C0C0C0",
                  },
                ]
              : undefined
          }
        />
      </div>
      <div className="grid w-full gap-6 md:grid-cols-[6fr_5fr]">
        <LastHalfYearCard salesByMonth={analytics?.salesByMonth} />
        <TotalOrdersCard salesByMonth={analytics?.salesByMonth} />
      </div>
    </div>
  );
};

export default AnalyticsBanner;
