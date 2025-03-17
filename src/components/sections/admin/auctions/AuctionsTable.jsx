"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import ActionsDropdownButton from "./ActionsDropdownButton";
import Link from "next/link";

const AuctionsTable = () => {


  const tableHeaders = [
    "Product",
    "Starting Bid",
    "Current Bid",
    "Bidders",
    "Time Remaining",
    "Status",
    "Actions",
  ];

  const tableData = [
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      startingBid: 400,
      currentBid: 450,
      bidders: 22,
      status: "Active",
      timeRemaining: "2 hr 30 mins",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      startingBid: 400,
      currentBid: 450,
      bidders: 22,
      status: "Completed",
      timeRemaining: "2 hr 30 mins",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      startingBid: 400,
      currentBid: 450,
      bidders: 22,
      status: "Cancelled",
      timeRemaining: "2 hr 30 mins",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-auto rounded-lg">
      <table className="w-full min-w-[1200px] table-auto bg-white">
        <thead className="sticky top-0">
          <tr className="sticky top-0 border-b border-silver/30 bg-white">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className={cn(header == "Review" ? "col-span-2" : "col-span-1")}
              >
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
          {tableData.map((data, index) => (
            <tr key={index} className="border-b border-silver/30">
              <td>
                <Link href="/admin/auctions/1" className="flex items-center gap-2 px-5 py-4">
                  <Image
                    src={data.product.image}
                    width={44}
                    height={44}
                    alt="Buyer"
                    loading="lazy"
                    quality={100}
                    className="rounded-full border border-black/10"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-darkBlue">
                      {data.product.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <Image
                        src={data.seller.image}
                        width={18}
                        height={18}
                        alt="seller"
                        loading="lazy"
                        quality={100}
                        className="rounded-full border border-black/10"
                      />
                      <span className="text-[10px] text-battleShipGray">
                        {data.seller.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </td>
              <td>
                <div className="flex items-center gap-3 px-5 py-4 font-medium text-[#667085]">
                  ${data.startingBid.toFixed(2)}
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-1 px-5 py-4 font-medium text-[#667085]">
                  ${data.currentBid.toFixed(2)}
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-1 px-5 py-4 font-medium text-[#667085]">
                  {data.bidders}
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-1 px-5 py-4 font-medium text-[#667085]">
                  {data.status === "Active" && data.timeRemaining}
                </div>
              </td>
              <td>
                <div
                  className={cn(
                    "w-fit rounded-lg px-3.5 py-1",
                    data.status == "Active"
                      ? "bg-shamrockGreen/10 text-shamrockGreen"
                      : data.status == "Completed"
                        ? "bg-[#608DFF]/5 text-[#608DFF]"
                        : "bg-black/5 text-black/60",
                  )}
                >
                  {data.status}
                </div>
              </td>
              <td>
                <ActionsDropdownButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionsTable;
