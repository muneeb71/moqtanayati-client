"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/cards/StatsCard";
import LastHalfYearCard from "../../seller/analytics/cards/LastHalfYearCard";
import TotalOrdersCard from "../../seller/analytics/cards/TotalOrdersCard";
import { getDashboardStats } from "@/lib/api/admin/dashboard/getDashboardStats";
import { getDashboardOrderChart } from "@/lib/api/admin/dashboard/getDashboardOrderChart";
import { getDashboardProfitChart } from "@/lib/api/admin/dashboard/getDashboardProfitChart";

const Dashboard = () => {
  const [stats, setStats] = useState({
    monthlyProfit: 0,
    bidsPlaced: 0,
    bidsSuccessful: 0,
    completedOrders: 0,
  });

  const [orderChart, setOrderChartStats] = useState(null);
  const [profitChart, setProfitChartStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardStats();
        const data = res?.data || {};

        setStats({
          monthlyProfit: data.monthlyProfit ?? 0,
          bidsPlaced: data.bidsPlaced ?? 0,
          bidsSuccessful: data.bidsSuccessful ?? 0,
          completedOrders: data.completedOrders ?? 0,
        });

        const response = await getDashboardOrderChart();
        const orderChartData = response?.data;

        setOrderChartStats(orderChartData);

        const responseProfit = await getDashboardProfitChart();
        const profitChartData = responseProfit?.data;

        setProfitChartStats(profitChartData);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatsCard
          className="flex flex-col bg-lightOrange pb-16 pl-3 pt-4 xl:pl-5"
          text="Profit"
          count={`$${stats.monthlyProfit}`}
        />
        <StatsCard
          className="flex flex-col bg-lightPurple pb-16 pl-3 pt-4 xl:pl-5"
          text="Bids Placed"
          count={stats.bidsPlaced}
        />
        <StatsCard
          className="flex flex-col bg-lightYellow pb-16 pl-3 pt-4 xl:pl-5"
          text="Bids Successful"
          count={stats.bidsSuccessful}
        />
        <StatsCard
          className="flex flex-col bg-lightGreen pb-16 pl-3 pt-4 xl:pl-5"
          text="Completed Orders"
          count={stats.completedOrders}
        />
      </div>

      <div className="grid w-full gap-5 xl:grid-cols-[6fr_5fr] 2xl:gap-10">
        <LastHalfYearCard profit={true} sales={profitChart} />
        <TotalOrdersCard salesByMonth={orderChart} />
      </div>
    </div>
  );
};

export default Dashboard;
