"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ActionsDropdownButton from "./ActionsDropdownButton";
import { getAllAuctions } from "@/lib/api/admin/auctions/getAllAuctions";
import ShimmerRow from "@/components/shimmer/shimmerRow";

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
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isAuctionLoading, setIsAuctionLoading] = useState(false);

  const fetchAuctions = async (currentPage = 1) => {
    try {
      setIsAuctionLoading(true);
      const res = await getAllAuctions({ page: currentPage });
      const { auctions = [], pagination = {} } = res.data;
      setAuctions(auctions);
      setPage(pagination.page || 1);
      setPages(pagination.pages || 1);
      setLimit(pagination.limit || 10);
      setTotal(pagination.total || auctions.length);
    } catch (error) {
      console.error("Error fetching auctions:", error);
      setAuctions([]);
    } finally {
      setIsAuctionLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions(page);
  }, [page]);

  if (!auctions) setIsAuctionLoading(false);

  return (
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
              .map((_, idx) => <ShimmerRow key={idx} />)
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
                  ? Math.max(...bids.map((b) => b.amount))
                  : startingBid;

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
                      ${currentBid.toFixed(2)}
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
                            const timeDiff = endDate.getTime() - now.getTime();

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

      {/* Pagination */}
      <div className="flex justify-end gap-2 p-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded bg-moonstone/10 px-3 py-1 text-sm text-moonstone disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={cn(
              "rounded px-3 py-1 text-sm",
              p === page
                ? "bg-moonstone text-white"
                : "bg-moonstone/10 text-moonstone hover:bg-moonstone/20",
            )}
          >
            {p}
          </button>
        ))}
        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="rounded bg-moonstone/10 px-3 py-1 text-sm text-moonstone disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuctionsTable;
