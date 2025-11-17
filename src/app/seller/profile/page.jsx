"use client";

import { sellerChatIcon, starIcon } from "@/assets/icons/common-icons";
import {
  profileEmailIcon,
  profilePhoneIcon,
} from "@/assets/icons/profile-icons";
import GoBackButton from "@/components/buttons/GoBackButton";
import PageHeading from "@/components/headings/PageHeading";
import { useProfileStore } from "@/providers/profile-store-provider";
import { Loader2, Pencil, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const SellerProfilePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [editLoading, setEditLoading] = useState(false);
  const {
    name,
    email,
    avatar,
    joinedDate,
    averageRating,
    auctions,
    reviews,
    phone,
    orders,
    store,
  } = useProfileStore((state) => state);

  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <PageHeading>
        <div className="flex flex-col gap-12">
          <GoBackButton />
          {name}
        </div>
      </PageHeading>
      <div className="grid w-full max-w-4xl gap-16 pb-28 pt-10 md:grid-cols-[4fr_6fr]">
        <div className="relative flex w-full flex-col items-center justify-center gap-2 rounded-3xl border border-black/10 bg-[#F8F7FB] p-6">
          <button
            type="button"
            onClick={() => {
              if (editLoading) return;
              setEditLoading(true);
              router.push("/seller/profile/edit");
            }}
            className="absolute right-5 top-5"
          >
            {editLoading ? (
              <Loader2 className="size-8 animate-spin rounded-lg border border-black/10 p-1 text-black/60" />
            ) : (
              <Pencil className="size-8 rounded-lg border border-black/10 p-1 text-black/60 transition-all duration-100 ease-in hover:border-black hover:text-black" />
            )}
          </button>

          <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {avatar && typeof avatar === "string" && avatar.trim() !== "" ? (
              <Image
                src={avatar}
                width={151}
                height={151}
                alt="Profile Image"
                loading="lazy"
                quality={100}
                className="rounded-full object-cover"
              />
            ) : (
              <User className="size-16 text-gray-400" />
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-medium text-darkBlue">{name}</span>
            <span className="font-medium text-battleShipGray">
              {t("seller.profile.joined")} {joinedDate}
            </span>
          </div>

          <div className="flex w-full max-w-52 gap-8 py-3">
            <div className="flex items-center rounded-lg bg-moonstone/10 px-3 py-1">
              {sellerChatIcon}{" "}
              <span className="text-sm text-moonstone">
                {t("seller.profile.chat")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-0.5 text-[#F3B95A]">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < Math.round(averageRating) ? (
                    <span key={i}>{starIcon}</span>
                  ) : (
                    <span key={i} className="text-battleShipGray/40">
                      {starIcon}
                    </span>
                  ),
                )}
              </div>
              <div className="flex items-baseline gap-0">
                <span className="text-sm">{averageRating}</span>
                <span className="text-xs">
                  ({reviews?.length} {t("seller.profile.reviews")})
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex w-full flex-col gap-4">
            <div className="flex items-center gap-4">
              {profileEmailIcon}
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-4">
              {profilePhoneIcon}
              <span>{phone}</span>
            </div>
          </div>
        </div>

        <div className="grid h-fit grid-cols-2 gap-3">
          <div className="flex h-fit w-full flex-col gap-2 rounded-2xl bg-[#BEC8F9] px-5 pb-12 pt-4">
            <span className="text-lg text-delftBlue/60">
              {t("seller.profile.orders_received")}
            </span>
            <span className="text-4xl font-semibold text-delftBlue">
              {orders?.length}
            </span>
          </div>
          <div className="flex h-fit w-full flex-col gap-2 rounded-2xl bg-[#EFDB88] px-5 pb-12 pt-4">
            <span className="text-lg text-delftBlue/60">
              {t("seller.profile.auctions")}
            </span>
            <span className="text-4xl font-semibold text-delftBlue">
              {auctions?.length}
            </span>
          </div>
          <div className="flex h-fit w-full flex-col gap-2 rounded-2xl bg-[#C9DFDD] px-5 pb-12 pt-4">
            <span className="text-lg text-delftBlue/60">
              {t("seller.profile.products")}
            </span>
            <span className="text-4xl font-semibold text-delftBlue">
              {store.products ? store?.products?.length : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
