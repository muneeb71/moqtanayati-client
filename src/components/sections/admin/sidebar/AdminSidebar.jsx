import Image from "next/image";
import SidebarLinks from "./SidebarLinks";
import { logoutIcon } from "@/assets/icons/admin-icons";
import { logoutUser } from "@/lib/api/auth/logout";

const AdminSidebar = () => {
  return (
    <div className="flex overflow-auto max-h-screen w-full max-w-[287px] flex-col justify-between rounded-[40px] bg-[#1C1C1C] px-3.5 py-16"
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex w-full flex-col gap-16 mb-10">
        <Image
          src="/static/logo.png"
          width={143}
          height={72}
          alt="logo"
          className="self-center rounded-2xl"
          loading="eager"
          quality={100}
        />
    <SidebarLinks />
      </div>
      <div className="flex items-center gap-2 mt-auto px-3.5 cursor-pointer" onClick={logoutUser}>
        {logoutIcon}
        <p className="text-[#DA6D75CC]">Logout</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
