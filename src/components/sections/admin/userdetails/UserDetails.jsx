import React, { useState, useEffect } from "react";
import { recentBids } from "@/lib/recent-bids";
//import { recentPurchases } from "@/lib/recent-purchases";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { getUserById } from "@/lib/api/admin/users/getUserById";

import formatDateTime from "@/utils/dateFormatter";
import { getMyBidsDetail } from "@/lib/api/auctions/getMyBidsDetail";
import UserSkeleton from "@/components/shimmer/userSkeleton";
import { useRouter } from "next/navigation";
import api from "@/lib/api/axios";

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [purchases, setRecentPurchases] = useState(null);
  const [bids, setRecentBids] = useState(null);
  const [auction, setRecentListings] = useState(null);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function fetchUserDetail() {
    try {
      console.log("1");
      const res = await getUserById(userId);
      console.log("2 ", res);
      const fetchedUser = res.user || {};

      console.log("3 : ", fetchedUser.role);
      const isSeller = fetchedUser.role === "SELLER";

      const purchaseData = isSeller
        ? res.sales || []
        : fetchedUser.orders || [];

      const totalDeliveredPurchases = purchaseData.filter(
        (p) => p.status === "DELIVERED",
      );

      const purchase = totalDeliveredPurchases.length;

      const spent = totalDeliveredPurchases.reduce(
        (sum, p) => sum + p.totalAmount,
        0,
      );

      const listing = isSeller ? fetchedUser.auctions || [] : [];

      setUser(fetchedUser);
      setRecentPurchases(purchaseData);
      setTotalPurchases(purchase);
      setTotalSpent(spent);
      setRecentListings(listing);

      // If buyer and bids are present on user response, use them for recent bids
      if (!isSeller && Array.isArray(fetchedUser.bids)) {
        setRecentBids(fetchedUser.bids);
      }
    } catch (e) {
      setUser([]);
      setRecentPurchases([]);
      setTotalPurchases(0);
      setTotalSpent(0);
      setRecentListings([]);
    }
  }

  // API functions
  const deleteUser = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/admin/users/${userId}`);
      {
        // Remove from local store and go back
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
      setShowDropdown(false);
    }
  };

  const toggleUserStatus = async () => {
    try {
      setIsLoading(true);
      const newStatus =
        user.accountStatus === "DISABLED" ? "ACTIVE" : "DISABLED";
      // Prefer explicit disable route when disabling, otherwise generic status endpoint
      if (newStatus === "DISABLED") {
        await api.patch(`/admin/users/${userId}/disable`);
      } else {
        await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
      }
      // Update local state
      setUser((prev) => ({ ...prev, accountStatus: newStatus }));
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setIsLoading(false);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchUserDetail();
  }, [userId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".dropdown-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  if (!user) return <UserSkeleton />;

  return (
    <div className="flex h-full max-h-full flex-col gap-10 pb-10">
      <div className="flex flex-row justify-between rounded-xl bg-white px-5 py-5 lg:px-10">
        <div className="flex flex-row items-center gap-5">
          {typeof user?.avatar === "string" && user.avatar.trim().length > 0 ? (
            <Image
              src={user.avatar}
              width={150}
              height={150}
              alt="Profile Image"
              loading="lazy"
              quality={100}
              className="h-[100px] w-[100px] rounded-full object-cover lg:h-[150px] lg:w-[150px]"
              onError={(e) => {
                try {
                  e.target.src = "/static/user.svg";
                } catch {}
              }}
            />
          ) : (
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gray-200 lg:h-[150px] lg:w-[150px]">
              <svg
                className="h-12 w-12 text-gray-500 lg:h-16 lg:w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
          <div className="flex flex-col gap-1 xl:gap-4">
            <div className="flex flex-col">
              <div className="flex flex-col gap-1 xl:flex-row xl:gap-5">
                <p className="text-[18px] font-semibold text-eerieBlack lg:text-[23px]">
                  {user.name}
                </p>
                <div className="flex w-[50%] items-center justify-center rounded-lg bg-customGreen/10 px-5 py-1 lg:w-fit">
                  <p className="text-[14px] text-customGreen">
                    {user.accountStatus}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-eerieBlack lg:text-[19px] xl:mt-0">
                {user.role}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <IoMdPin className="text-[17px] text-moonstone" />
              <p className="lg: text-[13px] text-delftBlue">{user.address}</p>
            </div>
          </div>
        </div>
        {/* Desktop Dropdown */}
        <div className="dropdown-container relative hidden lg:block">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={isLoading}
            className="flex h-fit items-center gap-2 rounded-lg border border-faluRed bg-transparent px-10 py-3 text-faluRed hover:bg-faluRed hover:text-white disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <>
                {user.accountStatus === "DISABLED"
                  ? "Enable User"
                  : "Disable/Delete"}
                <IoChevronDown className="h-4 w-4" />
              </>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full z-10 w-44 -translate-y-px transform rounded-lg border border-gray-200 bg-white shadow-lg">
              <button
                onClick={toggleUserStatus}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {user.accountStatus === "DISABLED"
                  ? "Enable User"
                  : "Disable User"}
              </button>
              <button
                onClick={deleteUser}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Delete User
              </button>
              <button
                onClick={() => setShowDropdown(false)}
                className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="dropdown-container relative lg:hidden">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={isLoading}
            className="flex h-fit items-center gap-2 rounded-lg border border-faluRed bg-transparent p-3 text-faluRed hover:bg-faluRed hover:text-white disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <BiTrash className="text-[18px] sm:text-[26px]" />
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full z-10 w-44 -translate-y-px transform rounded-lg border border-gray-200 bg-white shadow-lg">
              <button
                onClick={toggleUserStatus}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {user.accountStatus === "DISABLED"
                  ? "Enable User"
                  : "Disable User"}
              </button>
              <button
                onClick={deleteUser}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Delete User
              </button>
              <button
                onClick={() => setShowDropdown(false)}
                className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="grid h-full w-full gap-0 lg:gap-4 xl:grid-cols-[1fr_331px]">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 lg:gap-5 xl:grid-cols-4">
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                Bids {user?.role === "SELLER" ? "" : "Placed"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                {user?.role === "SELLER"
                  ? auction.length || 0
                  : bids?.length || 0}
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {user?.role === "SELLER" ? "Sold Items" : "Purchases"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                {totalPurchases}
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8">
              <p className="text-[14px] text-lightGray/60">
                {user?.role === "SELLER" ? "Earned" : "Spent"}
              </p>
              <p className="text-[18px] font-semibold text-lightGray xl:text-[25px]">
                ${totalSpent}
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
              Recent {user?.role === "SELLER" ? "Listings" : "Bids"}
            </p>

            <div className="no-scrollbar flex h-full max-h-[335px] max-w-[93vw] overflow-auto rounded-lg">
              <table className="max-h-full w-full">
                <thead className="sticky top-0 text-nowrap bg-white">
                  <tr className="border-b border-gray-200 text-left">
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Product
                    </th>
                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      {user?.role === "SELLER" ? "Highest Bid" : "Current Bid"}
                    </th>

                    {user?.role === "SELLER" && (
                      <th className="text-customeBlue py-5 pl-8 font-semibold">
                        No of Bidders
                      </th>
                    )}

                    <th className="text-customeBlue py-5 pl-8 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {user?.role === "SELLER"
                    ? auction?.map((auctionItem, index) => {
                        const bids = auctionItem.bids || [];
                        const highestBid = bids.reduce(
                          (max, bid) => (bid.amount > max ? bid.amount : max),
                          0,
                        );
                        const noOfBidders = bids.length;

                        return (
                          <tr
                            key={index}
                            className="border-b border-gray-200 bg-white"
                          >
                            <td className="py-5 pl-8 align-top">
                              <div className="flex items-center gap-2">
                                {auctionItem?.product?.images &&
                                auctionItem.product.images.length > 0 ? (
                                  <Image
                                    src={auctionItem.product.images[0]}
                                    width={50}
                                    height={50}
                                    alt="Product Image"
                                    loading="lazy"
                                    quality={100}
                                    className="h-[50px] w-[50px] rounded-full object-cover"
                                    onError={(e) => {
                                      console.log(
                                        "Product image load error, using fallback",
                                      );
                                      e.target.src = "/static/prod.jpg";
                                    }}
                                  />
                                ) : (
                                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-200">
                                    <svg
                                      className="h-6 w-6 text-gray-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <div>
                                  <p className="text-[16px] font-semibold text-customBlue">
                                    {auctionItem?.product.name}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 pl-8 align-top text-[16px] text-customGray">
                              ${highestBid}
                            </td>

                            <td className="py-3 pl-8 align-top text-[16px] text-customGray">
                              {noOfBidders}
                            </td>

                            <td className="py-3 pl-8 align-top">
                              <span className="rounded-lg bg-moonstone/10 px-5 py-1 text-[14px] font-semibold text-moonstone">
                                Active
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    : bids?.map((bid, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 bg-white"
                        >
                          <td className="py-5 pl-8 align-top">
                            <div className="flex items-center gap-2">
                              {bid?.auction?.product?.images &&
                              bid.auction.product.images.length > 0 ? (
                                <Image
                                  src={bid.auction.product.images[0]}
                                  width={50}
                                  height={50}
                                  alt="Product Image"
                                  loading="lazy"
                                  quality={100}
                                  className="h-[50px] w-[50px] rounded-full object-cover"
                                  onError={(e) => {
                                    console.log(
                                      "Product image load error, using fallback",
                                    );
                                    e.target.src = "/static/prod.jpg";
                                  }}
                                />
                              ) : (
                                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-200">
                                  <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                              )}
                              <div>
                                <p className="text-[16px] font-semibold text-customBlue">
                                  {bid?.auction.product.name}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 pl-8 align-top text-[16px] text-customGray">
                            ${bid?.amount}
                          </td>

                          <td className="py-3 pl-8 align-top">
                            <span
                              className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                                bid.status === "HIGHEST"
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
              Recent {user?.role === "SELLER" ? "Sales" : "Purchases"}
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
                  {purchases?.map((purchase, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 bg-white"
                    >
                      <td className="py-2 pl-8 align-top">
                        <div className="flex items-center gap-2">
                          {purchase?.product?.images &&
                          purchase.product.images.length > 0 ? (
                            <Image
                              src={purchase.product.images[0]}
                              width={44}
                              height={44}
                              alt="Product Image"
                              loading="lazy"
                              quality={100}
                              className="h-[44px] w-[44px] rounded-full object-cover"
                              onError={(e) => {
                                console.log(
                                  "Product image load error, using fallback",
                                );
                                e.target.src = "/static/prod.jpg";
                              }}
                            />
                          ) : (
                            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-gray-200">
                              <svg
                                className="h-6 w-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                          <div>
                            <p className="text-[16px] font-semibold text-customBlue">
                              {purchase?.product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 pl-8 align-top text-[16px] text-customGray">
                        ${purchase?.totalAmount}
                      </td>
                      <td className="py-2 pl-8 align-top">
                        <span
                          className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                            purchase?.status === "DELIVERED"
                              ? "bg-customGreen/10 text-customGreen"
                              : purchase?.status === "CANCELLED"
                                ? "bg-faluRed/10 text-faluRed"
                                : purchase?.status === "PENDING"
                                  ? "bg-moonstone/10 text-moonstone"
                                  : purchase?.status === "PROCESSING"
                                    ? "bg-yellow/10 text-yellow"
                                    : "bg-black/10 text-eerieBlack/40"
                          }`}
                        >
                          {purchase?.status}
                        </span>
                      </td>
                      <td className="py-2 pl-8 align-top text-[16px] text-customGray">
                        {formatDateTime.formatDate(purchase.createdAt)}
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
              <p className="font-medium text-davyGray">{user.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Email</p>
              <p className="font-medium text-davyGray">{user.email}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Phone No.</p>
              <p className="font-medium text-davyGray">{user.phone}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Address</p>
              <p className="font-medium text-davyGray">{user.address}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-battleShipGray">Registration Date</p>
              <p className="font-medium text-davyGray">
                {formatDateTime.formatDate(user.registrationDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
