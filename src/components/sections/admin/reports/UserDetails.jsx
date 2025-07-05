import { recentPurchases } from "@/lib/recent-purchases";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";
import {
  cardIcon,
  cashIcon,
  thirdPartyIcon,
} from "@/assets/icons/admin-icons.jsx";

const UserDetails = ({ role }) => {
  return (
    <div className="flex h-full max-h-full flex-col gap-10 pb-10">
      <div className="flex flex-row justify-between rounded-xl bg-white px-5 py-5 lg:px-10">
        <div className="flex flex-row items-center gap-5">
          <Image
            src={"/testuser.svg"}
            width={150}
            height={150}
            alt="Profile Image"
            loading="lazy"
            quality={100}
            className="h-[100px] w-[100px] rounded-full lg:h-[150px] lg:w-[150px]"
          />
          <div className="flex flex-col gap-1 xl:gap-4">
            <div className="flex flex-col">
              <div className="flex flex-col gap-1 xl:flex-row xl:gap-5">
                <p className="text-[18px] font-semibold text-eerieBlack lg:text-[23px]">
                  Kristin Watson
                </p>
                <div className="flex w-[50%] items-center justify-center rounded-lg bg-customGreen/10 px-5 py-1 lg:w-fit">
                  <p className="text-[14px] text-customGreen">Active</p>
                </div>
              </div>
              <p className="mt-4 text-eerieBlack lg:text-[19px] xl:mt-0">
                Buyer
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <IoMdPin className="text-[17px] text-moonstone" />
              <p className="lg: text-[13px] text-delftBlue">
                Islamabad, Pakistan
              </p>
            </div>
          </div>
        </div>
        <button className="hidden h-fit rounded-lg border border-faluRed bg-transparent px-10 py-3 text-faluRed hover:bg-faluRed hover:text-white lg:flex">
          Disable/Delete
        </button>

        <button className="flex h-fit rounded-lg border border-faluRed bg-transparent p-3 text-faluRed hover:bg-faluRed hover:text-white lg:hidden">
          <BiTrash className="text-[18px] sm:text-[26px]" />
        </button>
      </div>
      <div className="grid h-full w-full gap-0 lg:gap-4 xl:grid-cols-[1fr_331px]">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 lg:gap-5 xl:grid-cols-4">
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">Total Spent</p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                40
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {role == "buyer" ? "Orders Placed" : "Completed Orders"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                15
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {role == "buyer" ? "To Receive" : "Pending Orders"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                $1200
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {role == "buyer" ? "Favorite Category" : "Collections"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                {role == "buyer" ? "Fashion" : "$119.99"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[18px] font-semibold text-eerieBlack">
              Payment Breakdown
            </p>
            <div className="rounded-lg bg-white p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-4 text-sm font-medium text-davyGray">
                      Payment Method
                    </th>
                    <th className="pb-4 text-sm font-medium text-davyGray">
                      Amount
                    </th>
                    <th className="pb-4 text-sm font-medium text-davyGray">
                      Spending
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Card Payment */}
                  <tr className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                          {cardIcon}
                        </div>
                        <span className="text-sm font-medium text-eerieBlack">
                          Card
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium text-eerieBlack">
                        $450.00
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-[#E6F6EC] px-3 py-1 text-sm text-customGreen">
                        45 % of total spent
                      </span>
                    </td>
                  </tr>

                  {/* Cash Payment */}
                  <tr className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                          {cashIcon}
                        </div>
                        <span className="text-sm font-medium text-eerieBlack">
                          Cash
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium text-eerieBlack">
                        $230.00
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-[#E6F4FF] px-3 py-1 text-sm text-[#0095FF]">
                        20 % of total spent
                      </span>
                    </td>
                  </tr>

                  {/* Third-Party Payment */}
                  <tr>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                          {thirdPartyIcon}
                        </div>
                        <span className="text-sm font-medium text-eerieBlack">
                          Third-Party Payment
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium text-eerieBlack">
                        $103.00
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-sm text-[#6B7280]">
                        17 % of total spent
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex h-fit flex-col gap-5 rounded-xl bg-white px-5 py-4">
          <div className="border-b border-gray-200 py-3 text-xl font-medium text-eerieBlack">
            Personal Information
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Full Name</p>
              <p className="font-medium text-davyGray">Kristian Waston</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Email</p>
              <p className="font-medium text-davyGray">
                kristian@mumtlkaty.com
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Phone No.</p>
              <p className="font-medium text-davyGray">+92 333 66 13900</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Address</p>
              <p className="font-medium text-davyGray">
                Lane 10, Hostel City, Islamabad
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Registration Date</p>
              <p className="font-medium text-davyGray">26 June, 2024</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-4 pb-10">
        <p className="text-[18px] font-semibold text-eerieBlack">
          {role == "buyer"
            ? "Most Interested Product"
            : "Best Selling Products"}
        </p>
        <div className="relative">
          <div className="no-scrollbar flex gap-4 overflow-x-auto rounded-lg bg-white px-4 pb-4">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="relative min-w-[280px] rounded-lg bg-white shadow-md"
              >
                <div className="relative">
                  <Image
                    src="/static/product.svg"
                    width={280}
                    height={200}
                    alt="Product"
                    className="h-[200px] w-full rounded-t-lg object-cover"
                  />
                  <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                      <path
                        d="M10 17.25L8.55 15.94C3.4 11.28 0 8.22 0 4.75C0 1.69 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 1.69 20 4.75C20 8.22 16.6 11.28 11.45 15.94L10 17.25Z"
                        fill="#FF6B6B"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4">
                  <p className="mb-2 text-xl font-semibold text-eerieBlack">
                    $500.00
                  </p>
                  <p className="mb-1 line-clamp-1 text-sm font-medium text-eerieBlack">
                    Iphone 6s, 10/10 condition..
                  </p>
                  <div className="flex items-center gap-1 text-xs text-davyGray">
                    <IoMdPin className="text-moonstone" />
                    <span>College Road, Islamabad</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="absolute -right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      {role === "seller" && (
        <div className="flex flex-col gap-4 -mt-10">
          <p className="text-lg font-medium text-eerieBlack">
            Collections Overview
          </p>
          <div className="mb-10 rounded-lg bg-white p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-4 text-sm font-medium text-eerieBlack">
                    Total Sales
                  </th>
                  <th className="pb-4 text-sm font-medium text-eerieBlack">
                    Collection Method
                  </th>
                  <th className="pb-4 text-sm font-medium text-eerieBlack">
                    Pending Collection
                  </th>
                  <th className="pb-4 text-sm font-medium text-eerieBlack">
                    Profit Deducted
                  </th>
                  <th className="pb-4 text-sm font-medium text-eerieBlack">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4">
                    <p className="text-lg font-semibold text-eerieBlack">
                      $4090.00
                    </p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {cardIcon}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-eerieBlack">
                          Mastercard
                        </span>
                        <span className="text-xs text-davyGray">
                          **** **** ****** 091
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-lg font-semibold text-gray-500">
                      $450.00
                    </p>
                  </td>
                  <td className="py-4">
                    <p className="text-lg font-semibold text-gray-500">
                      $450.00
                    </p>
                  </td>
                  <td className="py-4">
                    <span className="w-fit rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-faluRed">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
