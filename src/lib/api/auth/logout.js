"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function LogoutButton({ logoutIcon }) {
  const router = useRouter();

  const logoutUser = () => {
    deleteCookie("token");
    deleteCookie("userId");
    deleteCookie("role");
    deleteCookie("survey");
    deleteCookie("storeId");
    router.push("/admin/login");
  };

  return (
    <div
      className="mt-auto flex cursor-pointer items-center gap-2 px-3.5"
      onClick={logoutUser}
    >
      {logoutIcon}

      <p className="text-red-400">Logout</p>
    </div>
  );
}
