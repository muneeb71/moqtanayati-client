"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { bellIcon } from "@/assets/icons/header-icons";

const AdminHeader = () => {
  const router = useRouter();

  const handleBellClick = () => {
    router.push("/admin/notifications");
  };

  return (
    <div className="flex h-full max-h-[76px] w-full items-center justify-end rounded-l-[18px] rounded-r-[39px] bg-white px-8">
      <div className="align-center flex justify-end gap-4">
        <div
          className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100"
          onClick={handleBellClick}
        >
          {bellIcon}
        </div>

        <div className="flex items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src="/static/dummy-user/1.jpeg"
              alt="User profile"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium">Mr Alex Jhons</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
