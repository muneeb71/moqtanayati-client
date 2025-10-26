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
