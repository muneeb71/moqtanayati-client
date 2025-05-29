import { sellerChatIcon, starIcon } from "@/assets/icons/common-icons";
import {
  profileEmailIcon,
  profilePhoneIcon,
} from "@/assets/icons/profile-icons";
import GoBackButton from "@/components/buttons/GoBackButton";
import PageHeading from "@/components/headings/PageHeading";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SellerProfilePage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <PageHeading>
        <div className="flex flex-col gap-12">
          <GoBackButton />
          Alex Jhons
        </div>
      </PageHeading>
      <div className="grid w-full max-w-4xl gap-16 pb-28 pt-10 md:grid-cols-[4fr_6fr]">
        <div className="relative flex w-full flex-col items-center justify-center gap-2 rounded-3xl border border-black/10 bg-[#F8F7FB] p-6">
          <Link href="/seller/profile/edit" className="absolute right-5 top-5">
            <Pencil className="size-8 rounded-lg border border-black/10 p-1 text-black/60 transition-all duration-100 ease-in hover:border-black hover:text-black" />
          </Link>
          <Image
            src="/static/dummy-user/1.jpeg"
            width={151}
            height={151}
            alt="Profile Image"
            loading="lazy"
            quality={100}
            className="rounded-full"
          />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-medium text-darkBlue">
              Alex Jhons
            </span>
            <span className="font-medium text-battleShipGray">
              Joined Jan, 2024
            </span>
          </div>
          <div className="flex w-full max-w-52 gap-8 py-3">
            <div className="flex items-center rounded-lg bg-moonstone/10 px-3 py-1">
              {sellerChatIcon}{" "}
              <span className="text-sm text-moonstone">Chat</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-0.5 text-[#F3B95A]">
                {starIcon}
                {starIcon}
                {starIcon}
                {starIcon}
                <span className="text-battleShipGray/40">{starIcon}</span>
              </div>
              <div className="5 flex items-baseline gap-0">
                <span className="text-sm">3.9</span>
                <span className="text-xs">(12 Reviews)</span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col gap-4">
            <div className="flex items-center gap-4">
              {profileEmailIcon}
              <span className="text-">alexjhons@moqtanayati.com</span>
            </div>
            <div className="flex items-center gap-4">
              {profilePhoneIcon}
              <span className="text-">+92 3336613900</span>
            </div>
          </div>
        </div>
        <div className="grid h-fit grid-cols-2 gap-3">
          <div className="flex h-fit w-full flex-col gap-2 rounded-2xl bg-[#BEC8F9] px-5 pb-12 pt-4">
            <span className="text-lg text-delftBlue/60">Bids Placed</span>
            <span className="text-4xl font-semibold text-delftBlue">42</span>
          </div>
          <div className="flex h-fit w-full flex-col gap-2 rounded-2xl bg-[#EFDB88] px-5 pb-12 pt-4">
            <span className="text-lg text-delftBlue/60">Bids Won</span>
            <span className="text-4xl font-semibold text-delftBlue">04</span>
          </div>
          <div className="flex h-fit w-full flex-col gap-2 rounded-2xl bg-[#C9DFDD] px-5 pb-12 pt-4">
            <span className="text-lg text-delftBlue/60">Purchases</span>
            <span className="text-4xl font-semibold text-delftBlue">15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
