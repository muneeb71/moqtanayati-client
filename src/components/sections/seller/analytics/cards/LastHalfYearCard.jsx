const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LastHalfYearCard = ({ salesByMonth, sales }) => {
  const source = sales ?? salesByMonth ?? [];
  const data = source.map(item => {
    let monthLabel = "";
    let value = 0;
    if (typeof item.month === "string" && item.month.includes("-")) {
      const monthIdx = parseInt(item.month.split("-")[1], 10) - 1;
      monthLabel = monthNames[monthIdx];
      value = item.totalSales ?? 0;
    } else {
      monthLabel = monthNames[item.month - 1];
      value = item.sales ?? 0;
    }
    return {
      month: monthLabel,
      value,
      color: "#9F9FF8",
    };
  });

  const calculateMax = () => {
    return data.length > 0 ? Math.max(...data.map((item) => item.value)) : 0;
  };
  const maxValue = calculateMax();
  return (
    <div className="flex flex-col gap-8 rounded-[30px] bg-[#F9F9FA] p-5 md:p-8">
      <h1 className="text-2xl font-semibold text-black">Sales - Last 6 months</h1>
      <div className="grid h-full grid-cols-[40px_1fr] gap-2">
        <div className="flex flex-col items-end justify-between gap-10 pb-8 text-davyGray/80 md:text-xl">
          <h1 className="">{maxValue.toFixed(1)}k</h1>
          <h1 className="">{((maxValue * 2) / 3).toFixed(1)}k</h1>
          <h1 className="">{(maxValue / 3).toFixed(1)}k</h1>
          <h1 className="">0</h1>
        </div>
        <div className="grid w-full grid-cols-6 gap-2">
          {data.map((bar, index) => (
            <div className="flex flex-col items-center gap-3" key={index}>
              <div className="flex h-full w-full flex-col items-center justify-end">
                <div
                  className="w-full max-w-14 rounded-[15px]"
                  style={{
                    backgroundColor: bar.color,
                    height: `${maxValue ? (bar.value / maxValue) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="text-davyGray/80 md:text-xl">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LastHalfYearCard;
