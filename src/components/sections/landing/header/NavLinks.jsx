"use client";

import { headerLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-5 md:flex">
      {headerLinks.map((headerLink, index) => (
        <Link
          key={index}
          href={headerLink.href}
          className={cn(
            "text-sm font-medium",
            pathname === "href"
              ? "text-moonstone"
              : "text-[#5C5F6A] hover:text-moonstone",
          )}
        >
          {headerLink.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
