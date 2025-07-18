import Image from "next/image";
import SidebarLinks from "./SidebarLinks";
import { logoutIcon } from "@/assets/icons/admin-icons";
import LogoutButton from "@/lib/api/auth/logout";

const AdminSidebar = () => {
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
        />
        <SidebarLinks />
      </div>
      <LogoutButton logoutIcon={logoutIcon} />
    </div>
  );
};

export default AdminSidebar;
