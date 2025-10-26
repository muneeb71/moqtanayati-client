"use client";

import { useProfileStore } from "@/providers/profile-store-provider";
import { useMemo } from "react";

const SalesGraph = () => {
  const sellerOrders = useProfileStore((state) => state.sellerOrders);
  const weekDays = [
    { label: "Mon", value: 70, letter: "M" },
    { label: "Tue", value: 40, letter: "T" },
    { label: "Wed", value: 85, letter: "W" },
    { label: "Thu", value: 35, letter: "T" },
    { label: "Fri", value: 45, letter: "F" },
    { label: "Sat", value: 55, letter: "S" },
    { label: "Sun", value: 30, letter: "S" },
  ];

  const days = useMemo(() => {
    const sales = Array(7).fill(0);
    const completedOrders = Array.isArray(sellerOrders)
      ? sellerOrders.filter(
          (o) => String(o?.status || "").toUpperCase() === "DELIVERED",
        )
      : [];

    completedOrders.forEach((order) => {
      const date = new Date(order.createdAt);
      // getDay: 0 (Sun) - 6 (Sat), shift so 0 is Mon
      let dayIdx = date.getDay();
      dayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
      sales[dayIdx] += order.totalAmount;
    });
    const max = Math.max(...sales, 1);
    return weekDays.map((d, i) => ({
      label: d.label,
      letter: d.letter,
      value: Math.round((sales[i] / max) * 100),
      amount: sales[i],
    }));
  }, [sellerOrders]);

  const totalSales = days.reduce((sum, d) => sum + d.amount, 0).toFixed(2);

  return (
    <div className="flex h-full w-full flex-col gap-1 rounded-[30px] bg-[#F9F9F9] p-6 md:gap-3">
      <h1 className="text-lg font-medium text-davyGray md:text-2xl">Sales</h1>
      <div className="flex items-baseline gap-1 md:gap-3">
        <span className="text-2xl font-medium text-eerieBlack md:text-5xl">
          ${totalSales}
        </span>
        <span className="text-sm font-medium text-moonstone md:text-xl">
          This Week
        </span>
      </div>
      <div className="flex h-full w-full max-w-[70vw] justify-between gap-1 overflow-auto pt-5">
        <div className="flex flex-col justify-between gap-5 pb-9 text-right text-sm text-davyGray/70 md:text-xl">
          <span className="">5k</span>
          <span className="">4k</span>
          <span className="">3k</span>
          <span className="">2k</span>
          <span className="">1k</span>
          <span className="">0</span>
        </div>
        {days.map((day) => (
          <div
            key={day.label}
            className="flex h-full w-12 flex-col items-center gap-2 px-1 md:px-2"
          >
            <div className="flex h-full w-7 max-w-3 flex-col justify-end rounded-full bg-battleShipGray/40 md:max-w-8">
              <div
                className="w-full rounded-full bg-[linear-gradient(180deg,#25A5B4_21.5%,#3F175F_96.5%)]"
                style={{ height: `${day.value}%` }}
              ></div>
            </div>
            <span className="hidden text-xs text-battleShipGray/80 sm:inline md:text-xl">
              {day.label}
            </span>
            <span className="text-xs text-battleShipGray/80 sm:hidden md:text-xl">
              {day.letter}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesGraph;
