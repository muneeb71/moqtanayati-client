"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SidebarLink = ({ link }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasSubLinks = link.subLinks && link.subLinks.length > 0;
  
  const handleClick = (e) => {
    if (hasSubLinks) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full">
      <Link
        href={hasSubLinks ? "#" : link.href}
        onClick={handleClick}
        className={cn(
          "grid w-full grid-cols-[24px_1fr_20px] items-center gap-2 rounded-xl px-7 py-3.5 text-lg font-medium",
          pathname === link.href
            ? "bg-[#2F3133] text-white"
            : "text-[#878C90] hover:bg-[#2F3133] hover:text-white/80",
          "transition-colors duration-200 ease-in-out",
        )}
      >
        {link.icon}
        {link.title}
        {hasSubLinks && (
          <IoIosArrowDown 
            className={cn(
              "transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        )}
      </Link>

      {/* Dropdown for sublinks */}
      {hasSubLinks && isOpen && (
        <div className="ml-12 mt-1 flex flex-col gap-1">
          {link.subLinks.map((subLink, index) => (
            <Link
              key={index}
              href={subLink.href}
              className={cn(
                "rounded-xl px-4 py-2.5 text-base font-medium",
                pathname === subLink.href
                  ? "bg-[#2F3133] text-white"
                  : "text-[#878C90] hover:bg-[#2F3133] hover:text-white/80",
                "transition-colors duration-200 ease-in-out",
              )}
            >
              {subLink.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
