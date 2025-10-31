"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { bellIcon } from "@/assets/icons/header-icons";
import { useAdminProfile } from "@/hooks/useAdminProfile";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import useTranslation from "@/hooks/useTranslation";

const AdminHeader = () => {
  const { dir } = useTranslation();
  const router = useRouter();
  const { profile, loading, error, refetch } = useAdminProfile();
  const [navLoading, setNavLoading] = useState(false);
  const [cacheBust, setCacheBust] = useState(0);
  const pathname = usePathname();

  const handleBellClick = async () => {
    if (navLoading) return;
    setNavLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 100));
      router.push("/admin/notifications");
    } finally {
      // do not clear; header will unmount on route change
    }
  };

  // Clear nav loader when route changes (in case header persists across pages)
  if (navLoading && pathname?.startsWith("/admin/notifications")) {
    setNavLoading(false);
  }

  // Listen for profile updates from settings to refresh avatar
  useEffect(() => {
    const handler = () => {
      refetch?.();
      setCacheBust(Date.now());
    };
    if (typeof window !== "undefined") {
      window.addEventListener("admin_profile_updated", handler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("admin_profile_updated", handler);
      }
    };
  }, [refetch]);

  // Get profile image with fallback
  const getProfileImage = () => {
    if (profile?.avatar) {
      return profile.avatar;
    }
    return "/static/user.svg"; // Default dummy user icon
  };

  // Get display name with fallback
  const getDisplayName = () => {
    if (profile?.name) {
      return profile.name;
    }
    return "Admin User";
  };

  return (
    <div
      className="flex h-full max-h-[76px] w-full items-center justify-end rounded-l-[18px] rounded-r-[39px] bg-white px-8"
      dir={dir}
    >
      <div className="align-center flex justify-end gap-4">
        <LanguageSwitcher />
        <div
          className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100"
          onClick={handleBellClick}
        >
          {navLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          ) : (
            bellIcon
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            {loading ? (
              <div className="h-full w-full animate-pulse rounded-full bg-gray-200" />
            ) : (
              <Image
                src={`${getProfileImage()}${getProfileImage().includes("?") ? "&" : "?"}t=${cacheBust || 0}`}
                alt="Admin profile"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = "/static/user.svg";
                }}
              />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium">
              {loading ? (
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              ) : error ? (
                "Admin User"
              ) : (
                getDisplayName()
              )}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
