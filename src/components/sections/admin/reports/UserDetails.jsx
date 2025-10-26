"use client";

import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";
import { getUserById } from "@/lib/api/admin/users/getUserById";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import formatDateTime from "@/utils/dateFormatter";
import {
  cardIcon,
  cashIcon,
  thirdPartyIcon,
} from "@/assets/icons/admin-icons.jsx";
import UserDetailsShimmer from "@/components/shimmer/userDetailsShimmer";

const UserDetails = () => {
  const params = useParams();
  const id = params?.id;

  const [userDetail, setUserDetail] = useState(null);
  const [totalSpent, setTotalSpent] = useState(null);
  const [ordersPlaced, setOrdersPlaced] = useState(null);
  const [toReceive, setToReceive] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await getUserById(id);
        const fetchedData = res;

        const orders =
          role === "BUYER"
            ? (fetchedData?.user?.orders ?? [])
            : (fetchedData?.sales ?? []);

        const spent = parseFloat(
          orders
            .reduce((sum, order) => sum + (order.totalAmount || 0), 0)
            .toFixed(2),
        );

        const received = orders.filter(
          (order) => order.status === "DELIVERED",
        ).length;

        const pending = orders.filter(
          (order) => order.status === "PENDING",
        ).length;

        setUserDetail(fetchedData);
        setRole(fetchedData?.user?.role);
        setTotalSpent(spent);
        setOrdersPlaced(orders.length);
        setToReceive(role === "BUYER" ? received : pending);
      } catch (err) {
        console.error("Failed to fetch user detail", err);
        setUserDetail([]);
      }
    };

    fetchUserDetail();
  }, [userDetail]);

  return userDetail === null ? (
    <UserDetailsShimmer />
  ) : (
    <div className="flex h-full max-h-full flex-col gap-10 pb-10">
      <div className="flex flex-row justify-between rounded-xl bg-white px-5 py-5 lg:px-10">
        <div className="flex flex-row items-center gap-5">
          <Image
            src={"/static/testuser.svg"}
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
                  {userDetail?.user.name}
                </p>

                <div className="flex w-[50%] items-center justify-center rounded-lg bg-customGreen/10 px-5 py-1 lg:w-fit">
                  <p className="text-[14px] text-customGreen">
                    {userDetail?.user.accountStatus}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-eerieBlack lg:text-[19px] xl:mt-0">
                {userDetail?.user.role}
                {role == "SELLER" ? " - " : ""}
                {role == "SELLER" ? userDetail?.user.sellerType : ""}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <IoMdPin className="text-[17px] text-moonstone" />

              <p className="lg: text-[13px] text-delftBlue">
                {userDetail?.user.address}
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
        <div className="flex max-h-[calc(100vh-150px)] flex-col gap-5 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-3 lg:gap-5 xl:grid-cols-4">
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {role == "BUYER" ? "Total Spent" : "Total Sales"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                ${totalSpent}
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {role == "BUYER" ? "Orders Placed" : "Completed Orders"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                {ordersPlaced}
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {role == "BUYER" ? "To Receive" : "Pending Orders"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                {toReceive}
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {role == "BUYER" ? "Favorite Category" : "Collections"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                {role == "BUYER" ? "Fashion" : "$119.99"}
              </p>
            </div>
          </div>

          {/* Product */}
          <div className="flex h-full flex-col gap-4 pb-2">
            <p className="text-[18px] font-semibold text-eerieBlack">
              {role == "BUYER"
                ? "Most Interested Product"
                : "Best Selling Products"}
            </p>
            <div className="relative">
              {role == "SELLER" ? (
                <div className="no-scrollbar flex overflow-x-auto rounded-lg bg-white px-1 py-6">
                  {userDetail?.listings.map((item, index) => (
                    <div
                      key={index}
                      className="relative ml-4 min-w-[280px] rounded-lg bg-white shadow-md"
                    >
                      <div className="relative">
                        <Image
                          src="/static/prod.jpg"
                          width={280}
                          height={200}
                          alt="Product"
                          className="h-[200px] w-full rounded-t-lg object-cover"
                        />
                        <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2">
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                          >
                            <path
                              d="M10 17.25L8.55 15.94C3.4 11.28 0 8.22 0 4.75C0 1.69 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 1.69 20 4.75C20 8.22 16.6 11.28 11.45 15.94L10 17.25Z"
                              fill="#FF6B6B"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="p-4">
                        <p className="mb-2 text-xl font-semibold text-eerieBlack">
                          <span>
                            $
                            {item.price !== null
                              ? item.price.toFixed(2)
                              : "0.00"}
                          </span>
                        </p>
                        <p className="mb-1 line-clamp-1 text-sm font-medium text-eerieBlack">
                          {item.name}, {item.conditionRating}
                          /10 condition..
                        </p>
                        {!item.city ||
                          (!item.country && (
                            <div className="flex items-center gap-1 text-xs text-davyGray">
                              <span>
                                {item.city},{item.country}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-scrollbar flex overflow-x-auto rounded-lg bg-white px-1 py-6">
                  {userDetail?.user.watchlists.map((item, index) => (
                    <div
                      key={index}
                      className="relative ml-4 min-w-[280px] rounded-lg bg-white shadow-md"
                    >
                      <div className="relative">
                        <Image
                          src="/static/prod.jpg"
                          width={280}
                          height={200}
                          alt="Product"
                          className="h-[200px] w-full rounded-t-lg object-cover"
                        />
                        <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2">
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                          >
                            <path
                              d="M10 17.25L8.55 15.94C3.4 11.28 0 8.22 0 4.75C0 1.69 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 1.69 20 4.75C20 8.22 16.6 11.28 11.45 15.94L10 17.25Z"
                              fill="#FF6B6B"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="p-4">
                        <p className="mb-2 text-xl font-semibold text-eerieBlack">
                          ${item.auction?.product.price}
                        </p>
                        <p className="mb-1 line-clamp-1 text-sm font-medium text-eerieBlack">
                          {item.auction.product.name},{" "}
                          {item.auction.product.conditionRating}
                          /10 condition..
                        </p>
                        {!item.auction.product.city ||
                          (!item.auction.product.country && (
                            <div className="flex items-center gap-1 text-xs text-davyGray">
                              <span>
                                {item.auction.product.city},
                                {item.auction.product.country}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation Arrows */}
              <button className="absolute -right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md">
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
        </div>

        <div className="flex h-fit flex-col gap-5 rounded-xl bg-white px-5 py-10">
          <div className="border-b border-gray-200 py-3 text-xl font-medium text-eerieBlack">
            Personal Information
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Full Name</p>
              <p className="font-medium text-davyGray">
                {userDetail?.user.name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Email</p>
              <p className="font-medium text-davyGray">
                {userDetail?.user.email}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Phone No.</p>
              <p className="font-medium text-davyGray">
                {userDetail?.user.phone}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Address</p>
              <p className="font-medium text-davyGray">
                {userDetail?.user.address}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Registration Date</p>
              <p className="font-medium text-davyGray">
                {formatDateTime.formatDate(userDetail?.user.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Breakdown */}
      <div className="flex flex-col gap-4 pb-2">
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
                  {role == "SELLER" ? "Total Received" : "Amount"}
                </th>
                <th className="pb-4 text-sm font-medium text-davyGray">
                  {role == "SELLER" ? "Percentage" : "Spending"}
                </th>
              </tr>
            </thead>
            <tbody>
              {role == "SELLER"
                ? userDetail?.payments.map((item, index) => {
                    const percentage = (
                      (item.amount / totalSpent) *
                      100
                    ).toFixed(0);
                    let textColor = "";
                    let badgeColor = "";

                    if (percentage < 20) {
                      textColor = "text-[#6B7280]"; // dark gray
                      badgeColor = "#F5F5F5"; // light gray
                    } else if (percentage >= 20 && percentage < 45) {
                      textColor = "text-[#0095FF]"; // dark blue
                      badgeColor = "#E6F4FF"; // light blue
                    } else {
                      textColor = "text-customGreen"; // dark green
                      badgeColor = "#E6F6EC"; // light green
                    }

                    return (
                      <tr
                        key={index}
                        className={
                          index !== userDetail?.user.payments.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                              {item.gateway === "PayPal" && (
                                <Image
                                  src="/static/wallet.svg"
                                  width={24}
                                  height={24}
                                  alt="Payment method"
                                  loading="lazy"
                                  quality={100}
                                />
                              )}
                              {item.gateway === "Cash" && (
                                <Image
                                  src="/static/cash.svg"
                                  width={24}
                                  height={24}
                                  alt="Payment method"
                                  loading="lazy"
                                  quality={100}
                                />
                              )}
                              {item.gateway === "Card" && (
                                <Image
                                  src="/static/card.svg"
                                  width={24}
                                  height={24}
                                  alt="Payment method"
                                  loading="lazy"
                                  quality={100}
                                />
                              )}
                            </div>
                            <span className="text-sm font-medium text-eerieBlack">
                              {item.gateway}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-eerieBlack">
                            ${item.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm ${textColor}`}
                            style={{ backgroundColor: badgeColor }}
                          >
                            {percentage}% of total
                          </span>
                        </td>
                      </tr>
                    );
                  })
                : userDetail?.user.payments.map((item, index) => {
                    const percentage = (
                      (item.amount / totalSpent) *
                      100
                    ).toFixed(0);
                    let textColor = "";
                    let badgeColor = "";

                    if (percentage < 20) {
                      textColor = "text-[#6B7280]"; // dark gray
                      badgeColor = "#F5F5F5"; // light gray
                    } else if (percentage >= 20 && percentage < 45) {
                      textColor = "text-[#0095FF]"; // dark blue
                      badgeColor = "#E6F4FF"; // light blue
                    } else {
                      textColor = "text-customGreen"; // dark green
                      badgeColor = "#E6F6EC"; // light green
                    }

                    return (
                      <tr
                        key={index}
                        className={
                          index !== userDetail?.user.payments.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                              {item.gateway === "PayPal" && (
                                <Image
                                  src="/static/wallet.svg"
                                  width={24}
                                  height={24}
                                  alt="Payment method"
                                  loading="lazy"
                                  quality={100}
                                />
                              )}
                              {item.gateway === "Cash" && (
                                <Image
                                  src="/static/cash.svg"
                                  width={24}
                                  height={24}
                                  alt="Payment method"
                                  loading="lazy"
                                  quality={100}
                                />
                              )}
                              {item.gateway === "Card" && (
                                <Image
                                  src="/static/card.svg"
                                  width={24}
                                  height={24}
                                  alt="Payment method"
                                  loading="lazy"
                                  quality={100}
                                />
                              )}
                            </div>
                            <span className="text-sm font-medium text-eerieBlack">
                              {item.gateway}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-eerieBlack">
                            ${item.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm ${textColor}`}
                            style={{ backgroundColor: badgeColor }}
                          >
                            {percentage}% of total spent
                          </span>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>

      {role === "SELLER" && (
        <div className="-mt-10 flex flex-col gap-4">
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
                      ${totalSpent}
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
