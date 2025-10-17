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
    console.log("🔍 [Header] User profile response:", res);
    if (res?.success) {
      console.log("🔍 [Header] User data:", res?.data);
      console.log("🔍 [Header] User avatar:", res?.data?.avatar);
      setUser(res?.data);
    } else {
      console.error("🔍 [Header] Error fetching user details:", res);
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
          style={{ width: "auto", height: "auto" }}
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
            {user?.avatar && user.avatar.trim() !== "" ? (
              <Image
                src={user.avatar}
                width={250}
                height={250}
                loading="lazy"
                alt="user image"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </Link>
          <HeaderDropdown />
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/buyer/profile"
            className="size-10 overflow-hidden rounded-full"
          >
            {user?.avatar && user.avatar.trim() !== "" ? (
              <Image
                src={user.avatar}
                width={250}
                height={250}
                loading="lazy"
                alt="user image"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </Link>
          <MobileSheet />
        </div>
      </div>
    </header>
  );
};

export default Header;
