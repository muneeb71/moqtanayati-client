// "use server";

// import { cookies } from "next/headers";

// export async function logoutUser() {
//   try {
//     const cookieStore = await cookies();

//     cookieStore.delete("token");
//     cookieStore.delete("userId");
//     cookieStore.delete("role");

//     return { success: true, message: "Logout successfully!" };
//   } catch (error) {
//     console.error("Logout error:", error);
//     return {
//       success: false,
//       message: "Logout failed",
//     };
//   }
// }

"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

export default function LogoutButton({ logoutIcon, onLoadingChange }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logoutUser = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks

    setIsLoggingOut(true);
    onLoadingChange?.(true);

    try {
      // Add a small delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      deleteCookie("token");
      deleteCookie("userId");
      deleteCookie("role");
      deleteCookie("survey");
      deleteCookie("storeId");

      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Do not clear loaders here; let the route change unmount clear UI
      // In case of navigation delays (>4s), auto-clear to avoid being stuck
      setTimeout(() => {
        setIsLoggingOut(false);
        onLoadingChange?.(false);
      }, 4000);
    }
  };

  return (
    <div
      className="mt-auto flex cursor-pointer items-center gap-2 px-3.5"
      onClick={logoutUser}
    >
      {isLoggingOut ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
      ) : (
        logoutIcon
      )}
      <p className="text-red-500">
        {isLoggingOut
          ? t("admin.logout.logging_out")
          : t("admin.logout.logout")}
      </p>
    </div>
  );
}
