import { recentBids } from "@/lib/recent-bids";
import { recentPurchases } from "@/lib/recent-purchases";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";

const UserDetails = () => {
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
      <div className="grid h-full w-full gap-0 xl:grid-cols-[1fr_331px] lg:gap-4">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 lg:gap-5 xl:grid-cols-4">
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">Bids Placed</p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                40
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">Purchases</p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                15
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">Spent</p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                $1200
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">Last Active</p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                Today 9:45 am
              </p>
            </div>
          </div>
          <div className="flex h-full flex-col gap-4">
            <p className="text-[18px] font-semibold text-eerieBlack">
              Recent Bids
            </p>
            <div className="no-scrollbar flex h-full max-h-[335px] max-w-[93vw] overflow-auto rounded-lg">
              <table className="max-h-full w-full">
                <thead className="sticky top-0 text-nowrap bg-white">
                  <tr className="border-b border-gray-200 text-left">
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Product
                    </th>
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Current Bid
                    </th>
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBids?.map((bid, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 bg-white"
                    >
                      <td className="py-5 pl-8">
                        <div className="flex items-center gap-2">
                          <Image
                            src={"/product.svg"}
                            width={50}
                            height={50}
                            alt="Profile Image"
                            loading="lazy"
                            quality={100}
                            className="rounded-full"
                          />
                          <div>
                            <p className="text-[16px] font-semibold text-customBlue">
                              {bid?.products}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 pl-8 text-[16px] text-customGray">
                        {bid?.currentBid}
                      </td>
                      <td className="py-5 pl-8">
                        <span
                          className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                            bid.status === "Winning"
                              ? "bg-customGreen/10 text-customGreen"
                              : "bg-black/10 text-eerieBlack/40"
                          }`}
                        >
                          {bid?.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex h-full flex-col gap-4 pb-10">
            <p className="text-[18px] font-semibold text-eerieBlack">
              Recent Purchases
            </p>
            <div className="no-scrollbar flex h-full max-h-[335px] max-w-[93vw] overflow-auto rounded-lg">
              <table className="max-h-full w-full">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-gray-200 text-left">
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Product
                    </th>
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Price
                    </th>
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Status
                    </th>
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentPurchases?.map((purchase, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 bg-white"
                    >
                      <td className="py-5 pl-8">
                        <div className="flex items-center gap-2">
                          <Image
                            src={"/product.svg"}
                            width={50}
                            height={50}
                            alt="Profile Image"
                            loading="lazy"
                            quality={100}
                            className="rounded-full"
                          />
                          <div>
                            <p className="text-[16px] font-semibold text-customBlue">
                              {purchase?.product}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 pl-8 text-[16px] text-customGray">
                        {purchase?.price}
                      </td>
                      <td className="py-5 pl-8">
                        <span
                          className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                            purchase?.status === "Delivered"
                              ? "bg-customGreen/10 text-customGreen"
                              : "bg-black/10 text-eerieBlack/40"
                          }`}
                        >
                          {purchase?.status}
                        </span>
                      </td>
                      <td className="py-5 pl-8 text-[16px] text-customGray">
                        {purchase?.date}
                      </td>
                    </tr>
                  ))}
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
              <p className="text-davyGray font-medium">Kristian Waston</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Email</p>
              <p className="text-davyGray font-medium">kristian@mumtlkaty.com</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Phone No.</p>
              <p className="text-davyGray font-medium">+92 333 66 13900</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Address</p>
              <p className="text-davyGray font-medium">Lane 10, Hostel City, Islamabad</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Registration Date</p>
              <p className="text-davyGray font-medium">26 June, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
