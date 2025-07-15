"use client";

import { useEffect, useState } from "react";
import AuctionBidders from "@/components/sections/admin/auctions/AuctionBidders";
import AuctionsDescriptionCard from "@/components/sections/admin/auctions/AuctionsDescriptionCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import { getAuctionById } from "@/lib/api/admin/auctions/getAdminAuctionById";
import { use } from "react";

const AdminAuctionPage = ({ params }) => {
  const { id: productId } = use(params);

  const [auctionDetail, setAuctionDetail] = useState(null);

  const fetchAuction = async () => {
    try {
      const res = await getAuctionById(productId);
      setAuctionDetail(res.data);
    } catch (error) {
      console.error("Error fetching auction detail:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchAuction();
    }
  }, [productId]);

  if (!auctionDetail) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col items-center gap-10 pb-20">
      <button className="self-end rounded-lg bg-white px-3 py-2 font-medium text-faluRed hover:bg-faluRed/10">
        Cancel Auction
      </button>
      <div className="grid w-full max-w-7xl gap-10 md:grid-cols-2">
        <ProductDetailsSlider auctionDetail={auctionDetail} />
        <AuctionsDescriptionCard item={auctionDetail} />
      </div>
      <AuctionBidders bidders={auctionDetail.bids} />
    </div>
  );
};

export default AdminAuctionPage;
