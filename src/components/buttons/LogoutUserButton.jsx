"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function LogoutUserButton({ logoutIcon }) {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("userId");
    deleteCookie("role");
    deleteCookie("survey");
    deleteCookie("storeId");

    router.push("/");
  };

  return (
    <div
      className="mt-5 flex cursor-pointer items-center gap-2 rounded-[12px] border border-moonstone/40 bg-moonstone/10 px-5 py-3 text-[13px]"
      onClick={handleLogout}
    >
      Logout
      {logoutIcon}
    </div>
  );
}
