"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  barsIcon,
  bellIcon,
  cartIcon,
  logoutIcon,
} from "@/assets/icons/header-icons";
import Image from "next/image";
import { headerDropdownLinks, headerLinks } from "@/lib/links";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const MobileSheet = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigate = (href) => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("navLoading", "1");
      }
    } catch (e) {}
    setIsNavigating(true);
    router.push(href);
  };

  useEffect(() => {
    // If we were remounted on the next page, show loader briefly
    let stop;
    try {
      const pending =
        typeof window !== "undefined" &&
        sessionStorage.getItem("navLoading") === "1";
      if (pending) {
        setIsNavigating(true);
        stop = setTimeout(() => {
          setIsNavigating(false);
          try {
            sessionStorage.removeItem("navLoading");
          } catch (e) {}
        }, 600);
      }
    } catch (e) {}

    if (isNavigating) {
      // When route changes, stop the loader shortly after
      stop = setTimeout(() => setIsNavigating(false), 600);
    }
    return () => {
      if (stop) clearTimeout(stop);
    };
  }, [pathname, isNavigating]);

  return (
    <>
      <Sheet>
        <SheetTrigger>{barsIcon}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
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
            </SheetTitle>
          </SheetHeader>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="grid grid-cols-[1fr_1px_1fr] place-items-center gap-3 self-end">
              <SheetClose asChild>
                <Link
                  href="/notification"
                  className="grid size-10 place-items-center rounded-full border border-[#3F175F1A]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("/notification");
                  }}
                >
                  {bellIcon}
                </Link>
              </SheetClose>
              <div className="h-[44px] w-[1px] bg-[#3F175F1A]"></div>
              <SheetClose asChild>
                <Link
                  href="/cart"
                  className="grid size-10 place-items-center rounded-full border border-[#3F175F1A]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("/cart");
                  }}
                >
                  {cartIcon}
                </Link>
              </SheetClose>
            </div>
            <div className="my-5 flex w-full flex-col gap-4 rounded-[20px] bg-moonstone/10 px-5 py-6">
              {headerLinks.map((headerLink, index) => (
                <SheetClose key={index} asChild>
                  <Link
                    href={headerLink.href}
                    className="text-sm font-medium text-[#5C5F6A] hover:text-moonstone"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(headerLink.href);
                    }}
                  >
                    {headerLink.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
            {headerDropdownLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className="flex w-full items-center justify-end gap-3 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(link.href);
                }}
              >
                <span className="text-[13.17px]">{link.title}</span>
                {link.icon}
              </Link>
            ))}
            <button className="mt-5 flex items-center justify-end gap-2 self-end rounded-[12px] border border-moonstone/40 bg-moonstone/10 px-5 py-3 text-[13px]">
              Logout
              {logoutIcon}
            </button>
          </div>
        </SheetContent>
      </Sheet>
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/30">
          <svg
            className="h-8 w-8 animate-spin text-moonstone"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      )}
    </>
  );
};

export default MobileSheet;
