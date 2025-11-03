"use client";
import { arrowUpRightIcon } from "@/assets/icons/seller-icons";
import useTranslation from "@/hooks/useTranslation";

const ActiveOrdersCard = ({ activeOrders }) => {
  const { t } = useTranslation();
  return (
    <div
      className="flex w-full flex-col gap-5 rounded-[30px] px-6 py-7 text-[#C35A00]"
      style={{
        background: "linear-gradient(180deg, #F9E3CB 0%, #FAEEE0 100%)",
      }}
    >
      <h1 className="text-2xl font-semibold">{t("analytics.active_orders")}</h1>
      <div className="flex w-full justify-between">
        <span className="text-5xl font-semibold">{activeOrders ?? 0}</span>
        <div className="flex flex-col items-end">
          {arrowUpRightIcon}
          <span className="">+0.00%</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrdersCard;
