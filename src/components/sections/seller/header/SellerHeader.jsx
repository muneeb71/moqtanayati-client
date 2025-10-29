"use client";

import { bellIcon } from "@/assets/icons/header-icons";
import { Loader2, UserIcon } from "lucide-react";
import Image from "next/image";
import NavLinks from "./SellerNavLinks";
import Link from "next/link";
import { searchIconSmall } from "@/assets/icons/common-icons";
import SellerMobileSheet from "./SellerMobileSheet";
import HeaderDropdown from "./HeaderDropdown";
import { useProfileStore } from "@/providers/profile-store-provider";
import NotificationBadge from "@/components/NotificationBadge";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SellerHeader = () => {
  const { avatar } = useProfileStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();
  const [notifLoading, setNotifLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  // Clear loading when route changes to the target
  useEffect(() => {
    if (pathname?.startsWith("/seller/notifications")) {
      setNotifLoading(false);
    }
    if (pathname === "/seller/profile") {
      setProfileLoading(false);
    }
  }, [pathname]);

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
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <NavLinks />

        {/* Desktop View */}
        <div className="hidden items-center gap-2 md:flex md:gap-4">
          {/* <Link
            href="/search"
            className="grid size-12 place-items-center rounded-full border border-[#3F175F1A]"
          >
            {searchIconSmall}
          </Link> */}
          <div className="h-[44px] w-[1px] bg-[#3F175F1A]" />

          <button
            type="button"
            onClick={() => {
              if (notifLoading) return;
              setNotifLoading(true);
              router.push("/seller/notifications/all");
            }}
            className={`grid size-12 place-items-center rounded-full border ${
              pathname?.startsWith("/seller/notifications")
                ? "border-primary text-primary"
                : "border-[#3F175F1A]"
            }`}
          >
            {notifLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <NotificationBadge />
            )}
          </button>

          {/* Profile Image or Icon */}
          <button
            type="button"
            onClick={() => {
              if (profileLoading) return;
              setProfileLoading(true);
              router.push("/seller/profile");
            }}
            className={`flex size-12 items-center justify-center overflow-hidden rounded-full ${
              pathname === "/seller/profile" ? "ring-primary ring-2" : ""
            } bg-gray-200`}
          >
            {profileLoading ? (
              <Loader2 className="size-5 animate-spin text-gray-500" />
            ) : hasProfileImage ? (
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
          </button>

          <HeaderDropdown />
        </div>

        {/* Mobile View */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => {
              if (profileLoading) return;
              setProfileLoading(true);
              router.push("/seller/profile");
            }}
            className={`flex size-10 items-center justify-center overflow-hidden rounded-full ${
              pathname === "/seller/profile" ? "ring-primary ring-2" : ""
            } bg-gray-200`}
          >
            {profileLoading ? (
              <Loader2 className="size-4 animate-spin text-gray-500" />
            ) : hasProfileImage ? (
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
          </button>
          <SellerMobileSheet />
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
