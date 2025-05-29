"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLink = ({ link }) => {
  const pathname = usePathname();
  return (
    <Link
      href={link.href}
      className={cn(
        "grid w-full grid-cols-[24px_1fr] items-center gap-2 rounded-xl px-7 py-3.5 text-lg font-medium",
        pathname === link.href
          ? "bg-[#2F3133] text-white"
          : "text-[#878C90] hover:bg-[#2F3133] hover:text-white/80",
        "transition-colors duration-200 ease-in-out",
      )}
    >
      {link.icon}
      {link.title}
    </Link>
  );
};

export default SidebarLink;
