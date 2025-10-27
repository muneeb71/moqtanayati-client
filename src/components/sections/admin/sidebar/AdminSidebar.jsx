"use client";

import Image from "next/image";
import SidebarLinks from "./SidebarLinks";
import { logoutIcon } from "@/assets/icons/admin-icons";
import LogoutButton from "@/lib/api/auth/logout";
import { useState } from "react";

const AdminSidebar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingChange = (loading) => {
    console.log("🔄 Global loading state changed:", loading);
    setIsLoading(loading);
  };

  return (
    <div
      className="flex max-h-screen w-full max-w-[287px] flex-col justify-between overflow-auto rounded-[40px] bg-[#1C1C1C] px-3.5 py-16"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="mb-10 flex w-full flex-col gap-16">
        <Image
          src="/static/logo.png"
          width={143}
          height={72}
          alt="logo"
          className="self-center rounded-2xl"
          loading="eager"
          quality={100}
          style={{ width: "auto", height: "auto" }}
        />
        <SidebarLinks onLoadingChange={handleLoadingChange} />
        {isLoading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#878C90]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#878C90] border-t-transparent"></div>
            Navigating...
          </div>
        )}
      </div>
      <LogoutButton logoutIcon={logoutIcon} />
    </div>
  );
};

export default AdminSidebar;
