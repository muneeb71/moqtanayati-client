"use client";

import { bellIcon } from "@/assets/icons/header-icons";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import NavLinks from "./SellerNavLinks";
import Link from "next/link";
import { searchIconSmall } from "@/assets/icons/common-icons";
import SellerMobileSheet from "./SellerMobileSheet";
import HeaderDropdown from "./HeaderDropdown";
import { useProfileStore } from "@/providers/profile-store-provider";

const SellerHeader = () => {
  const { avatar } = useProfileStore((state) => state);

  const hasProfileImage =
    avatar && typeof avatar === "string" && avatar.trim() !== "";

  return (
    <header className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-5">
        <Link href="/seller">
          <Image
            src="/static/logo.png"
            width={121}
            height={61}
            alt="LOGO"
            loading="eager"
            quality={100}
            priority
          />
        </Link>

        <NavLinks />

        {/* Desktop View */}
        <div className="hidden items-center gap-2 md:flex md:gap-4">
          <Link
            href="/search"
            className="grid size-12 place-items-center rounded-full border border-[#3F175F1A]"
          >
            {searchIconSmall}
          </Link>
          <div className="h-[44px] w-[1px] bg-[#3F175F1A]" />

          <Link
            href="/seller/notifications/all"
            className="grid size-12 place-items-center rounded-full border border-[#3F175F1A]"
          >
            {bellIcon}
          </Link>

          {/* Profile Image or Icon */}
          <Link
            href="/seller/profile"
            className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-gray-200"
          >
            {hasProfileImage ? (
              <Image
                src={avatar}
                width={250}
                height={250}
                alt="user image"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="size-6 text-gray-400" />
            )}
          </Link>

          <HeaderDropdown />
        </div>

        {/* Mobile View */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/seller/profile"
            className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-gray-200"
          >
            {hasProfileImage ? (
              <Image
                src={avatar}
                width={250}
                height={250}
                alt="user image"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="size-5 text-gray-400" />
            )}
          </Link>
          <SellerMobileSheet />
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
