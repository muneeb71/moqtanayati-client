"use client";

import Image from "next/image";
import SidebarLinks from "./SidebarLinks";
import { logoutIcon } from "@/assets/icons/admin-icons";
import LogoutButton from "@/lib/api/auth/logout";
import { useState } from "react";

const AdminSidebar = () => {
  // Per-link/logout components handle their own inline loading visuals.
  // Keep a no-op handler to satisfy child props without showing an overlay.
  const handleLoadingChange = () => {};

  return (
    <div
      className="relative flex max-h-screen w-full max-w-[287px] flex-col justify-between overflow-auto rounded-[40px] bg-[#1C1C1C] px-3.5 py-16"
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
      </div>
      <LogoutButton
        logoutIcon={logoutIcon}
        onLoadingChange={handleLoadingChange}
      />
    </div>
  );
};

export default AdminSidebar;
