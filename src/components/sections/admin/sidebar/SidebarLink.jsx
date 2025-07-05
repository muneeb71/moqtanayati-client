"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SidebarLink = ({ link }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (link.subLinks && link.subLinks.length > 0) {
    return (
      <div className="flex flex-col w-full">
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-xl px-7 py-3.5 text-lg font-medium transition-colors duration-200 ease-in-out",
            pathname.startsWith(link.subLinks[0].href.split("/").slice(0,4).join("/"))
              ? "bg-[#2F3133] text-white"
              : "text-[#878C90] hover:bg-[#2F3133] hover:text-white/80"
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          {link.icon}
          {link.title}
        </button>
        {open && (
          <div className="ml-8 flex flex-col gap-1 mt-1">
            {link.subLinks.map((sub, idx) => (
              <Link
                key={idx}
                href={sub.href || "/admin"}
                className={cn(
                  "rounded-lg px-4 py-2 text-base transition-colors duration-200 ease-in-out",
                  pathname === sub.href
                    ? "bg-[#2F3133] text-white"
                    : "text-[#878C90] hover:bg-[#2F3133] hover:text-white/80"
                )}
              >
                {sub.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={link.href || "/admin"}
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
