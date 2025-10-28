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
      className="relative flex max-h-screen w-full max-w-[287px] flex-col justify-between overflow-auto rounded-[40px] bg-[#1C1C1C] px-3.5 py-16"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-[40px] bg-black/50">
          <div className="flex flex-col items-center gap-3 rounded-lg bg-white p-6">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
            <p className="text-sm font-medium text-gray-700">Loading...</p>
          </div>
        </div>
      )}
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
      </div>
      <LogoutButton
        logoutIcon={logoutIcon}
        onLoadingChange={handleLoadingChange}
      />
    </div>
  );
};

export default AdminSidebar;
