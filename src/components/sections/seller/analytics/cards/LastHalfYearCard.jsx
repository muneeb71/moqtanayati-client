
const LastHalfYearCard = ({ profit }) => {
  const data = [
    {
      month: "Jun",
      value: 20,
      color: "#9F9FF8",
    },
    {
      month: "Jul",
      value: 30,
      color: "#96E2D6",
    },
    {
      month: "Aug",
      value: 25,
      color: "#000000",
    },
    {
      month: "Sep",
      value: 30,
      color: "#92BFFF",
    },
    {
      month: "Oct",
      value: 10,
      color: "#AEC7ED",
    },
    {
      month: "Nov",
      value: 20,
      color: "#94E9B8",
    },
  ];

  const calculateMax = () => {
    return Math.max(...data.map((item) => item.value));
  };
  const maxValue = calculateMax();
  return (
    <div className="flex flex-col gap-8 rounded-[30px] bg-[#F9F9FA] p-5 md:p-8">
      {profit ? (
        <h1 className="text-2xl font-semibold text-black">
          Profit - Last 6 months
        </h1>
      ) : (
        <h1 className="text-2xl font-semibold text-black">
          Sales - Last 6 months
        </h1>
      )}

      <div className="grid h-full grid-cols-[40px_1fr] gap-2">
        <div className="flex flex-col items-end justify-between gap-10 pb-8 text-davyGray/80 md:text-xl">
          <h1 className="">{maxValue}k</h1>
          <h1 className="">{(maxValue * 2) / 3}k</h1>
          <h1 className="">{maxValue / 3}k</h1>
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
                    height: `${(bar.value / maxValue) * 100}%`,
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
