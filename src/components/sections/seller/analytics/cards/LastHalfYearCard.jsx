const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COLORS = [
  "#9F9FF8", // 1st bar – purple
  "#9EF0E0", // 2nd – mint
  "#000000", // 3rd – black
  "#A3C7F7", // 4th – light blue
  "#B4B4DC", // 5th – light gray-blue
  "#97E5B4", // 6th – light green
];

const LastHalfYearCard = ({ salesByMonth, sales }) => {
  const rawSource = sales ?? salesByMonth ?? [];
  const source = Array.isArray(rawSource) ? rawSource : [];

  // Get current month index (0-based)
  const currentMonthIndex = new Date().getMonth();

  // Extract last 6 months data from full year
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const monthOffset = (currentMonthIndex - 5 + i + 12) % 12;
    const monthName = monthNames[monthOffset];
    const matchingData = source.find((item) => item.name === monthName);

    return {
      month: monthName,
      value: matchingData?.profit ?? 0,
      color: COLORS[i],
    };
  });

  const maxValue = Math.max(...last6Months.map((item) => item.value), 0);

  return (
    <div className="flex flex-col gap-8 rounded-[30px] bg-[#F9F9FA] p-5 md:p-8">
      <h1 className="text-2xl font-semibold text-black">
        Profit - Last 6 months
      </h1>
      <div className="grid h-full grid-cols-[40px_1fr] gap-2">
        <div className="flex flex-col items-end justify-between gap-10 pb-8 text-davyGray/80 md:text-xl">
          <h1>{(maxValue / 1000).toFixed(1)}k</h1>
          <h1>{((maxValue * 2) / 3 / 1000).toFixed(1)}k</h1>
          <h1>{(maxValue / 3 / 1000).toFixed(1)}k</h1>
          <h1>0</h1>
        </div>
        <div className="grid w-full grid-cols-6 gap-2">
          {last6Months.map((bar, index) => (
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
