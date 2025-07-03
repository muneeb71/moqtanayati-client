import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { bellIcon } from "@/assets/icons/header-icons";

const AdminHeader = () => {
  return (
    <div className="flex items-center justify-between w-full bg-white rounded-l-[18px] rounded-r-[39px] h-full max-h-[76px] px-4">
      <div className="flex items-center gap-2 w-full max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="h-10 pl-10 pr-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-moonstone"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="relative cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-slate-100">
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
            <h3 className="font-medium text-sm">Mr Alex Jhons</h3>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminHeader;