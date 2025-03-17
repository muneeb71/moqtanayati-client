import { sellerChatIcon, starIcon } from "@/assets/icons/common-icons";
import Image from "next/image";

const SellerReviewCard = () => {
  return (
    <div className="flex w-full max-w-[404px] flex-col gap-3.5 rounded-[14px] bg-[#F8F7FB] p-3">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="grid size-[57.6px] place-items-center overflow-hidden rounded-full">
            <Image
              src="/dummy-user/1.jpeg"
              width={100}
              height={100}
              alt="notification"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14.4px] text-black/50">Seller</span>
            <span className="text-[17px] font-medium leading-[25px] text-black/70">
              Alex Jhons
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-0.5">
            <span className="text-[#F3B95A]">{starIcon}</span>
            <span className="text-[#F3B95A]">{starIcon}</span>
            <span className="text-[#F3B95A]">{starIcon}</span>
            <span className="text-[#F3B95A]">{starIcon}</span>
            <span className="text-silver">{starIcon}</span>
          </div>
          <p className="text-sm text-davyGray">
            3.9 <span className="text-[10px]">(12 reviews)</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="flex items-center gap-1 rounded-[5.6px] border border-moonstone/10 bg-moonstone/10 px-2 py-1 text-moonstone hover:border-moonstone hover:bg-moonstone/20">
          {sellerChatIcon} <span className="text-sm">Chat with seller</span>
        </button>
        <button className="flex items-center gap-1 rounded-[5.6px] border border-moonstone/10 bg-moonstone/10 px-3 py-1 text-moonstone hover:border-moonstone hover:bg-moonstone/20">
          <span className="text-sm">View Profile</span>
        </button>
      </div>
    </div>
  );
};

export default SellerReviewCard;
