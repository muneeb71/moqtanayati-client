import { deleteIcon } from "@/assets/icons/common-icons";
import { cn } from "@/lib/utils";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  weight: ["400"],
  subsets: ["latin"],
});

const CreditCard = ({ hideDeleteIcon = false }) => {
  return (
    <div
      className="relative flex h-full min-h-[212px] min-w-[334px] flex-col justify-between rounded-2xl px-5 py-6 text-white"
      style={{
        background: "linear-gradient(112deg, #FED4B4 0%, #3BB9A1 100%)",
      }}
    >
      {!hideDeleteIcon && (
        <button className="absolute right-3 top-3 grid size-[50px] place-items-center rounded-full bg-white/40 hover:bg-white">
          {deleteIcon}
        </button>
      )}
      <h1 className="font-bold">ADRBank</h1>
      <span
        className={cn("text-[22px]", robotoMono.className)}
        style={{
          textShadow: "0px 1.95px 3.9px 0px #00000040",
        }}
      >
        **** **** **** 1234
      </span>
      <div className="flex justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs">Card Holder Name</span>
          <h1 className="font-bold uppercase">HILLERY NEVELIN</h1>
        </div>
        <div className="flex flex-col">
          <span className="text-xs">Expired Date</span>
          <h1 className="font-bold uppercase">10/28</h1>
        </div>
        <div className="flex items-center">
          <svg
            width="48"
            height="28"
            viewBox="0 0 48 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="14.5233" cy="14.2127" r="13.6327" fill="#E33A24" />
            <circle
              cx="33.9959"
              cy="14.2127"
              r="13.6327"
              fill="#F8CB2E"
              fillOpacity="0.8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
