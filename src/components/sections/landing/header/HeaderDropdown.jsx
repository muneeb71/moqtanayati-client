"use client";

import { barsIcon, logoutIcon } from "@/assets/icons/header-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutUserButton from "@/components/buttons/LogoutUserButton";
import { headerDropdownLinks } from "@/lib/links";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const HeaderDropdown = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{barsIcon}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="absolute -right-[20px] top-4 flex min-w-[229px] flex-col items-end justify-between gap-16 rounded-[20px] rounded-tr-none px-2 py-5"
        style={{
          boxShadow: "0px 0px 28px 0px #0000001A",
        }}
      >
        <div className="flex w-full flex-col gap-2">
          {headerDropdownLinks.map((link, index) => (
            <DropdownMenuItem
              key={index}
              className="flex w-full cursor-pointer"
              onClick={() => router.push(link.href)}
            >
              <div className="flex w-full items-center justify-end gap-3">
                <span className="text-[13.17px]">
                  {link.i18nKey ? t(link.i18nKey) : link.title}
                </span>
                {link.icon}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <LogoutUserButton logoutIcon={logoutIcon} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
