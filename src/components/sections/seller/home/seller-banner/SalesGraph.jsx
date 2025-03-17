const SalesGraph = () => {
  return (
    <div className="flex h-full w-full flex-col gap-1 rounded-[30px] bg-[#F9F9F9] p-6 md:gap-3">
      <h1 className="text-lg font-medium text-davyGray md:text-2xl">Sales</h1>
      <div className="flex items-baseline gap-1 md:gap-3">
        <span className="text-2xl font-medium text-eerieBlack md:text-5xl">
          $5004.04
        </span>
        <span className="text-sm font-medium text-moonstone md:text-xl">
          This Week
        </span>
      </div>
      <div className="grid h-full w-full grid-cols-[15px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] pt-5 md:grid-cols-[28px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
        <div className="flex flex-col justify-between gap-5 pb-9 text-right text-sm text-davyGray/70 md:text-xl">
          <span className="">5k</span>
          <span className="">4k</span>
          <span className="">3k</span>
          <span className="">2k</span>
          <span className="">1k</span>
          <span className="">0</span>
        </div>
        <div className="flex h-full flex-col items-center gap-2 px-1 md:px-4">
          <div className="flex h-full w-full max-w-3 flex-col justify-end rounded-full bg-battleShipGray/40 md:max-w-8">
            <div className="h-[70%] w-full rounded-full bg-[linear-gradient(180deg,#25A5B4_21.5%,#3F175F_96.5%)]"></div>
          </div>
          <span className="text-xs text-battleShipGray/80 md:text-xl">Mon</span>
        </div>
        <div className="flex h-full flex-col items-center gap-2 px-1 md:px-4">
          <div className="flex h-full w-full max-w-3 flex-col justify-end rounded-full bg-battleShipGray/40 md:max-w-8">
            <div className="h-[40%] w-full rounded-full bg-[linear-gradient(180deg,#25A5B4_21.5%,#3F175F_96.5%)]"></div>
          </div>
          <span className="text-xs text-battleShipGray/80 md:text-xl">Tue</span>
        </div>
        <div className="flex h-full flex-col items-center gap-2 px-1 md:px-4">
          <div className="flex h-full w-full max-w-3 flex-col justify-end rounded-full bg-battleShipGray/40 md:max-w-8">
            <div className="h-[85%] w-full rounded-full bg-[linear-gradient(180deg,#25A5B4_21.5%,#3F175F_96.5%)]"></div>
          </div>
          <span className="text-xs text-battleShipGray/80 md:text-xl">Wed</span>
        </div>
        <div className="flex h-full flex-col items-center gap-2 px-1 md:px-4">
          <div className="flex h-full w-full max-w-3 flex-col justify-end rounded-full bg-battleShipGray/40 md:max-w-8">
            <div className="h-[35%] w-full rounded-full bg-[linear-gradient(180deg,#25A5B4_21.5%,#3F175F_96.5%)]"></div>
          </div>
          <span className="text-xs text-battleShipGray/80 md:text-xl">Thu</span>
        </div>
        <div className="flex h-full flex-col items-center gap-2 px-1 md:px-4">
          <div className="flex h-full w-full max-w-3 flex-col justify-end rounded-full bg-battleShipGray/40 md:max-w-8">
            <div className="h-[45%] w-full rounded-full bg-[linear-gradient(180deg,#25A5B4_21.5%,#3F175F_96.5%)]"></div>
          </div>
          <span className="text-xs text-battleShipGray/80 md:text-xl">Fri</span>
        </div>
        <div className="flex h-full flex-col items-center gap-2 px-1 md:px-4">
          <div className="flex h-full w-full max-w-3 flex-col justify-end rounded-full bg-battleShipGray/40 md:max-w-8">
            <div className="h-[55%] w-full rounded-full bg-[linear-gradient(180deg,#25A5B4_21.5%,#3F175F_96.5%)]"></div>
          </div>
          <span className="text-xs text-battleShipGray/80 md:text-xl">Sat</span>
        </div>
        <div className="flex h-full flex-col items-center gap-2 px-1 md:px-4">
          <div className="flex h-full w-full max-w-3 flex-col justify-end rounded-full bg-battleShipGray/40 md:max-w-8">
            <div className="h-[30%] w-full rounded-full bg-[linear-gradient(180deg,#25A5B4_21.5%,#3F175F_96.5%)]"></div>
          </div>
          <span className="text-xs text-battleShipGray/80 md:text-xl">Sun</span>
        </div>
      </div>
    </div>
  );
};

export default SalesGraph;
