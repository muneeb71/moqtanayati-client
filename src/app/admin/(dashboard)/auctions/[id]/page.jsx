"use client";

import { useEffect, useState } from "react";
import { use } from "react";

import AuctionBidders from "@/components/sections/admin/auctions/AuctionBidders";
import AuctionsDescriptionCard from "@/components/sections/admin/auctions/AuctionsDescriptionCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import { getAdminAuctionById } from "@/lib/api/admin/auctions/getAdminAuctionById";
import AdminAuctionSkeleton from "@/components/shimmer/adminAuctionSkeletion";
import useTranslation from "@/hooks/useTranslation";

const AdminAuctionPage = ({ params }) => {
  const { id: productId } = use(params);
  const [auctionDetail, setAuctionDetail] = useState(null);
  const { t } = useTranslation();

  const fetchAuction = async () => {
    try {
      const res = await getAdminAuctionById(productId);
      setAuctionDetail(res.data);
    } catch (error) {
      console.log("Error fetching auction detail:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchAuction();
    }
  }, [productId]);

  if (!auctionDetail) return <AdminAuctionSkeleton />;

  return (
    <div className="flex w-full flex-col items-center gap-10 pb-20">
      <button className="self-end rounded-lg bg-white px-3 py-2 font-medium text-faluRed hover:bg-faluRed/10">
        {t("admin.auctions.cancel_button")}
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
