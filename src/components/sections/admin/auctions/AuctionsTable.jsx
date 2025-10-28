"use client";

import { filterIcon } from "@/assets/icons/admin-icons";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import Filter from "@/components/dropdown/filter";
import ShimmerRow from "@/components/shimmer/shimmerRow";
import TablePagination from "@/components/pagination/TablePagination";
import ActionsDropdownButton from "./ActionsDropdownButton";

import useAuctionStore from "@/stores/useAuctionStore";

const tableHeaders = [
  "Product",
  "Starting Bid",
  "Current Bid",
  "Bidders",
  "Time Remaining",
  "Status",
  "Actions",
];

const auctionSortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Live", value: "live" },
  { label: "Ended", value: "ended" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Highest Starting Bid", value: "highest starting bid" },
  { label: "Lowest Starting Bid", value: "lowest starting bid" },
  { label: "Highest Current Bid", value: "highest current bid" },
  { label: "Lowest Current Bid", value: "lowest current bid" },
];

const AuctionsTable = () => {
  const tableRef = useRef(null);

  const {
    auctions,
    auctionsLoading,
    fetchAuctions,
    currentAuctionPage,
    setCurrentAuctionPage,
    rowsPerAuctionPage,
    totalAuctionPages,
    totalAuctions,
    auctionSearchTerm,
    setAuctionSearchTerm,
    debouncedAuctionSearchTerm,
    setDebouncedAuctionSearchTerm,
    auctionSortBy,
    setAuctionSortBy,
  } = useAuctionStore();

  // Debounce search term
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedAuctionSearchTerm(auctionSearchTerm);
    }, 400);
    return () => clearTimeout(delay);
  }, [auctionSearchTerm]);

  // Fetch auctions when search, sort or page changes
  useEffect(() => {
    fetchAuctions(currentAuctionPage);
  }, [debouncedAuctionSearchTerm, auctionSortBy, currentAuctionPage]);

  return (
    <div className="flex h-full w-full flex-col gap-2 py-5">
      <div
        ref={tableRef}
        className="mb-5 flex w-full items-end justify-between"
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold text-russianViolet">
            Auctions
          </span>
          <p className="text-[18px] font-normal text-davyGray">All Auctions</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-[220px]">
            <input
              type="text"
              placeholder="Search"
              value={auctionSearchTerm}
              onChange={(e) => {
                setAuctionSearchTerm(e.target.value);
                setCurrentAuctionPage(1);
              }}
              className="h-10 w-full rounded-lg border border-silver bg-white pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-moonstone"
            />
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-500" />
          </div>
          <Filter
            sortBy={auctionSortBy}
            setSortBy={setAuctionSortBy}
            sortingOptions={auctionSortOptions}
          />
        </div>
      </div>

      <div className="flex h-full w-full flex-col overflow-auto rounded-lg">
        <table className="w-full min-w-[1200px] table-auto bg-white">
          <thead className="sticky top-0">
            <tr className="sticky top-0 border-b border-silver/30 bg-white">
              {tableHeaders.map((header, index) => (
                <th key={index}>
                  <div className="flex w-full min-w-[200px] items-center justify-between gap-3 text-nowrap px-5 py-4">
                    <span className="text-sm font-medium text-darkBlue">
                      {header}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {auctionsLoading ? (
              Array(5)
                .fill(0)
                .map((_, idx) => <ShimmerRow key={idx} columns={7} />)
            ) : auctions.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-sm text-gray-500"
                >
                  No auctions found.
                </td>
              </tr>
            ) : (
              auctions.map((auction) => {
                const product = auction.product;
                const imageUrl = product.images?.[0];
                const seller = auction.seller;
                const startingBid = product.startingBid ?? 0;
                const bids = auction.bids ?? [];
                const currentBid =
                  bids.length > 0
                    ? `$${Math.max(...bids.map((b) => b.amount)).toFixed(3)}`
                    : `$0.00`;

                return (
                  <tr key={auction.id} className="border-b border-silver/30">
                    <td>
                      <Link
                        href={`/admin/auctions/${auction.id}`}
                        className="flex items-center gap-2 px-5 py-4"
                      >
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            width={44}
                            height={44}
                            alt="Product"
                            loading="lazy"
                            className="h-[44px] w-[44px] rounded-full border border-black/10 object-cover"
                            onError={(e) => {
                              console.log(
                                "Product image load error, using fallback",
                              );
                              e.target.src = "/static/prod.jpg";
                            }}
                          />
                        ) : (
                          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/10 bg-gray-200">
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
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-darkBlue">
                            {product.name}
                          </span>
                          <div className="flex items-center gap-1">
                            {seller.avatar ||
                            seller.profileImage ||
                            seller.profile_image ? (
                              <Image
                                src={
                                  seller.avatar ||
                                  seller.profileImage ||
                                  seller.profile_image
                                }
                                width={18}
                                height={18}
                                alt="Seller"
                                className="h-[18px] w-[18px] rounded-full border border-black/10 object-cover"
                                onError={(e) => {
                                  console.log(
                                    "Seller avatar load error, using fallback",
                                  );
                                  e.target.src = "/static/user.svg";
                                }}
                              />
                            ) : (
                              <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-black/10 bg-gray-200">
                                <svg
                                  className="h-3 w-3 text-gray-500"
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
                            <span className="text-[10px] text-battleShipGray">
                              {seller.name}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <div className="px-5 py-4 font-medium text-[#667085]">
                        ${startingBid.toFixed(2)}
                      </div>
                    </td>
                    <td>
                      <div className="px-5 py-4 font-medium text-[#667085]">
                        {currentBid}
                      </div>
                    </td>
                    <td>
                      <div className="px-5 py-4 font-medium text-[#667085]">
                        {bids.length}
                      </div>
                    </td>
                    <td>
                      <div className="px-5 py-4 font-medium text-[#667085]">
                        {["LIVE", "UPCOMING"].includes(auction.status) &&
                        product.auctionLaunchDate &&
                        product.auctionDuration
                          ? (() => {
                              const launchDate = new Date(
                                product.auctionLaunchDate,
                              );
                              const endDate = new Date(
                                launchDate.getTime() +
                                  product.auctionDuration * 24 * 60 * 60 * 1000,
                              );
                              const now = new Date();
                              const timeDiff =
                                endDate.getTime() - now.getTime();
                              if (timeDiff <= 0) return "0d 0h 0m";

                              const days = Math.floor(
                                timeDiff / (1000 * 60 * 60 * 24),
                              );
                              const hours = Math.floor(
                                (timeDiff / (1000 * 60 * 60)) % 24,
                              );
                              const minutes = Math.floor(
                                (timeDiff / (1000 * 60)) % 60,
                              );
                              return `${days}d ${hours}h ${minutes}m`;
                            })()
                          : "N/A"}
                      </div>
                    </td>
                    <td>
                      <div
                        className={cn(
                          "w-fit rounded-lg px-3.5 py-1",
                          auction.status === "LIVE"
                            ? "bg-shamrockGreen/10 text-shamrockGreen"
                            : auction.status === "ENDED"
                              ? "bg-[#608DFF]/5 text-[#608DFF]"
                              : "bg-black/5 text-black/60",
                        )}
                      >
                        {auction.status}
                      </div>
                    </td>
                    <td>
                      <ActionsDropdownButton
                        auctionId={auction.id}
                        status={auction.status}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentAuctionPage}
        totalPages={totalAuctionPages}
        rowsPerPage={rowsPerAuctionPage}
        totalItems={totalAuctions}
        onPageChange={setCurrentAuctionPage}
      />
    </div>
  );
};

export default AuctionsTable;
