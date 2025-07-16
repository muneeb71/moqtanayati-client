"use client";

import { filterIcon } from "@/assets/icons/admin-icons";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ActionsDropdownButton from "./ActionsDropdownButton";
import { getAllAuctions } from "@/lib/api/admin/auctions/getAllAuctions";
import ShimmerRow from "@/components/shimmer/shimmerRow";
import TablePagination from "@/components/pagination/TablePagination";
import { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import Filter from "@/components/dropdown/filter";

const tableHeaders = [
  "Product",
  "Starting Bid",
  "Current Bid",
  "Bidders",
  "Time Remaining",
  "Status",
  "Actions",
];

const AuctionsTable = () => {
  const [sortBy, setSortBy] = useState("SELLER");

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

  const tableRef = useRef(null);
  const [auctions, setAuctions] = useState([]);

  const [isAuctionLoading, setIsAuctionLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAuctions, setTotalAuctions] = useState(0);

  const fetchAuctions = async (currentPage = 1) => {
    try {
      setIsAuctionLoading(true);
      if (!currentPage || isNaN(currentPage)) return;

      const res = await getAllAuctions({
        currentPage,
        search: debouncedSearchTerm.trim(),
        filter: sortBy.trim(),
      });
      const pagination = res?.data?.pagination || {};
      const fetchedAuctions = res.data.auctions;
      setAuctions(fetchedAuctions);
      setRowsPerPage(pagination.limit || 10);
      setTotalPages(pagination.pages || 1);
      setTotalAuctions(pagination.total || res.length);
    } catch (error) {
      setAuctions([]);
    } finally {
      setIsAuctionLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    fetchAuctions(currentPage);
  }, [currentPage, debouncedSearchTerm, sortBy]);

  if (!auctions) setIsAuctionLoading(false);

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
          <div className="flex flex-row items-center gap-5">
            <p className="text-[18px] font-normal text-davyGray">
              All Auctions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-[220px]">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full rounded-lg border border-silver bg-white pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-moonstone"
            />
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-500" />
          </div>

          <Filter
            sortBy={sortBy}
            setSortBy={setSortBy}
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
            {isAuctionLoading ? (
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
              auctions.map((auction, index) => {
                const product = auction.product;
                const imageUrl = product.images?.[0] || "/fallback.png";
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
                        <Image
                          src={imageUrl}
                          width={44}
                          height={44}
                          alt="Product"
                          loading="lazy"
                          className="rounded-full border border-black/10"
                        />
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-darkBlue">
                            {product.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <Image
                              src="/static/dummy-user/1.jpeg"
                              width={18}
                              height={18}
                              alt="Seller"
                              className="rounded-full border border-black/10"
                            />
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
                        ${currentBid}
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
                      <ActionsDropdownButton />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalItems={totalAuctions}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AuctionsTable;
