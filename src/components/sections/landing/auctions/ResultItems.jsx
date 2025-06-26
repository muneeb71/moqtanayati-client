"use client";
import { filterSvg } from "@/assets/icons/common-icons";
import MenuCard from "@/components/cards/MenuCard";
import { getAllAuctions } from "@/lib/api/auctions/getAll";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ResultItems = ({ items }) => {
  const pathname = usePathname();
  const [products, setProducts] = useState([]);

  const getAuctionData = async () => {
    const res = await getAllAuctions();    
    setProducts(res)
  }

  useEffect(() => {
    getAuctionData();
  }, [])

  const getFilterType = () => {
    if (pathname === "/buyer/auctions") return "all";
    const type = pathname.split("/").pop();
    return type;
  };    

  const filteredProducts = products.filter((product) => {    
    if (product?.product?.pricingFormat?.toLowerCase() !== "auctions") {
      return false;
    }    

    const filterType = getFilterType();
    if (filterType === "all") return true;

    const now = new Date();
    const launchDate = new Date(product?.product?.auctionLaunchDate);
    const endDate = new Date(
      launchDate.getTime() + product?.product?.auctionDuration * 24 * 60 * 60 * 1000
    );

    switch (filterType) {
      case "live-auctions":
        return product.status === "LIVE";
      case "upcoming":
        return product.status === "UPCOMING";
      case "history":
        return product.status === "ENDED";
      default:
        return true;
    }
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[21px] font-medium leading-[31px]">
          {filteredProducts.length}{" "}
          <span className="font-normal text-battleShipGray">Results</span>
        </h1>
        <button className="flex items-center gap-2 rounded-[12px] bg-[#F8F7FB] px-2 py-2 text-russianViolet transition-all duration-150 ease-in hover:bg-russianViolet hover:text-white">
          {filterSvg}
          <span className="">Filters</span>
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map((item, index) => (
          <MenuCard
            id={item?.id}
            key={index}
            title={item?.product?.name}
            user={item?.seller?.name}
            price={item.minimumOffer}
            image={item?.product?.images[0]}
            isFavourite={false}
            productId={item?.product?.id}
            highestBid={item.product.minimumOffer}
            startingBid={item?.product?.startingBid}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultItems;
