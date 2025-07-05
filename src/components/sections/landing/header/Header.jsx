"use client";
import { bellIcon, cartIcon } from "@/assets/icons/header-icons";
import Image from "next/image";
import NavLinks from "./NavLinks";
import MobileSheet from "./MobileSheet";
import Link from "next/link";
import HeaderDropdown from "./HeaderDropdown";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/api/profile/getProfile";
import toast from "react-hot-toast";

const Header = () => {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    const res = await getUserProfile();
    if (res?.success) {
      setUser(res?.data);
    } else {
      toast.error("Error fetching user details.");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-5">
        <Image
          src={user?.avatar || "/static/logo.png"}
          width={121}
          height={61}
          alt="LOGO"
          loading="eager"
          quality={100}
          priority
        />
        <NavLinks />
        <div className="hidden items-center gap-2 md:flex md:gap-4">
          <div className="grid grid-cols-[1fr_1px_1fr] place-items-center gap-5">
            <Link
              href="/buyer/notifications/all"
              className="grid size-12 place-items-center rounded-full border border-[#3F175F1A]"
            >
              {bellIcon}
            </Link>
            <div className="h-[44px] w-[1px] bg-[#3F175F1A]"></div>
            <Link
              href="/buyer/cart"
              className="grid size-12 place-items-center rounded-full border border-[#3F175F1A]"
            >
              {cartIcon}
            </Link>
          </div>
          <Link
            href="/buyer/profile"
            className="size-12 overflow-hidden rounded-full"
          >
            <Image
              src="/static/dummy-user/1.jpeg"
              width={250}
              height={250}
              loading="lazy"
              alt="user image"
            />
          </Link>
          <HeaderDropdown />
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/profile"
            className="size-10 overflow-hidden rounded-full"
          >
            <Image
              src="/static/dummy-user/1.jpeg"
              width={250}
              height={250}
              loading="lazy"
              alt="user image"
            />
          </Link>
          <MobileSheet />
        </div>
      </div>
    </header>
  );
};

export default Header;
