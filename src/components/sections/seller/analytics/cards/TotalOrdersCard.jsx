"use client";
import dynamic from "next/dynamic";

const Line = dynamic(() => import("recharts").then(mod => mod.Line), { ssr: false });
const LineChart = dynamic(() => import("recharts").then(mod => mod.LineChart), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TotalOrdersCard = ({ salesByMonth }) => {
  const data = (salesByMonth || []).map(item => ({
    name: monthNames[item.month - 1] + ' ' + item.year,
    uv: item.sales,
    pv: item.sales,
    amt: item.sales,
    value: item.sales,
  }));

  const calculateMax = () => {
    return data.length > 0 ? Math.max(...data.map((item) => item.value)) : 0;
  };
  const maxValue = calculateMax();
  return (
    <div className="h-[500px] flex flex-col gap-8 rounded-[30px] bg-[#F9F9FA] p-5 md:p-8">
      <h1 className="flex flex-col gap-4 text-2xl font-semibold md:flex-row md:items-center">
        Total Orders
        <span className="font-normal text-black/40">Total Projects</span>
      </h1>
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <span className="text-black/40">Operating Status</span>
        <div className="h-[1px] w-5 bg-black/40 md:h-5 md:w-[1px]"></div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-black"></div>
          <span className="text-black">This year</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-secondaryCyan size-2 rounded-full"></div>
          <span className="text-black">This year</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis tickLine={false} axisLine={false} dataKey="name" />
          <YAxis tickLine={false} axisLine={false} tickMargin={30} />
          <Line
            dot={false}
            type="monotone"
            dataKey="pv"
            stroke="#bcbfc0"
            strokeDasharray="4"
            strokeWidth={1.64}
          />
          <Line
            dot={false}
            strokeWidth={1.64}
            type="monotone"
            dataKey="uv"
            stroke="#25A5B4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalOrdersCard;
