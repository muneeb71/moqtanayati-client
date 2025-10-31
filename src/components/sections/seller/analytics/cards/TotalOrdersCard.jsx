"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import useTranslation from "@/hooks/useTranslation";

const TotalOrdersCard = ({ salesByMonth = [] }) => {
  const { t } = useTranslation();
  const data = Array.isArray(salesByMonth) ? salesByMonth : [];

  return (
    <div className="flex h-[500px] flex-col gap-8 rounded-[30px] bg-[#F9F9FA] p-5 md:p-8">
      <h1 className="flex flex-col gap-4 text-2xl font-semibold md:flex-row md:items-center">
        {t("analytics.total_orders")}
      </h1>
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <span className="text-black/40">{t("analytics.operating_status")}</span>
        <div className="h-[1px] w-5 bg-black/40 md:h-5 md:w-[1px]"></div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-black"></div>
          <span className="text-black">{t("analytics.this_year")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-secondaryCyan"></div>
          <span className="text-black">{t("analytics.last_year")}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis tickLine={false} axisLine={false} dataKey="name" />
          <YAxis tickLine={false} axisLine={false} tickMargin={30} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="lastYear"
            stroke="#bcbfc0"
            strokeDasharray="4"
            strokeWidth={1.64}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="thisYear"
            stroke="#25A5B4"
            strokeWidth={1.64}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalOrdersCard;
