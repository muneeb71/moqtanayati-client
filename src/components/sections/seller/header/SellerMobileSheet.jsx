"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
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
import { sellerHeaderLinks } from "@/lib/links";
import Link from "next/link";
import { searchIconSmall } from "@/assets/icons/common-icons";

const SellerMobileSheet = () => {
  return (
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
            />
          </SheetTitle>
        </SheetHeader>
        <div className="flex w-full flex-col items-center justify-center">
          <div className="grid grid-cols-[1fr_1px_1fr_1fr] place-items-center gap-3 self-end">
            <SheetClose asChild>
              <Link
                href="/search"
                className="grid size-12 place-items-center rounded-full border border-[#3F175F1A]"
              >
                {searchIconSmall}
              </Link>
            </SheetClose>
            <div className="h-[44px] w-[1px] bg-[#3F175F1A]"></div>
            <SheetClose asChild>
              <Link
                href="/notification"
                className="grid size-10 place-items-center rounded-full border border-[#3F175F1A]"
              >
                {bellIcon}
              </Link>
            </SheetClose>
          </div>
          <div className="my-5 flex w-full flex-col gap-4 rounded-[20px] bg-moonstone/10 px-5 py-6">
            {sellerHeaderLinks.map((headerLink, index) => (
              <SheetClose key={index} asChild>
                <Link
                  href={headerLink.href}
                  className="text-sm font-medium text-[#5C5F6A] hover:text-moonstone"
                >
                  {headerLink.title}
                </Link>
              </SheetClose>
            ))}
          </div>
          <button className="mt-5 flex items-center justify-end gap-2 self-end rounded-[12px] border border-moonstone/40 bg-moonstone/10 px-5 py-3 text-[13px]">
            Logout
            {logoutIcon}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SellerMobileSheet;
