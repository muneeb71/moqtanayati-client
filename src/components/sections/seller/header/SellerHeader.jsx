import { bellIcon, cartIcon } from "@/assets/icons/header-icons";
import Image from "next/image";
import NavLinks from "./SellerNavLinks";
import Link from "next/link";
import { searchIconSmall } from "@/assets/icons/common-icons";
import SellerMobileSheet from "./SellerMobileSheet";
import HeaderDropdown from "./HeaderDropdown";

const SellerHeader = () => {
  return (
    <header className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-5">
        <Link href="/seller">
          <Image
            src="/logo.png"
            width={121}
            height={61}
            alt="LOGO"
            loading="eager"
            quality={100}
            priority
          />
        </Link>
        <NavLinks />
        <div className="hidden items-center gap-2 md:flex md:gap-4">
          <Link
            href="/search"
            className="grid size-12 place-items-center rounded-full border border-[#3F175F1A]"
          >
            {searchIconSmall}
          </Link>
          <div className="h-[44px] w-[1px] bg-[#3F175F1A]"></div>
          <Link
            href="/seller/notifications/all"
            className="grid size-12 place-items-center rounded-full border border-[#3F175F1A]"
          >
            {bellIcon}
          </Link>
          <Link
            href="/seller/profile"
            className="size-12 overflow-hidden rounded-full"
          >
            <Image
              src="/dummy-user/1.jpeg"
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
            href="/seller/profile"
            className="size-10 overflow-hidden rounded-full"
          >
            <Image
              src="/dummy-user/1.jpeg"
              width={250}
              height={250}
              loading="lazy"
              alt="user image"
            />
          </Link>
          <SellerMobileSheet />
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
