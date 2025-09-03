import Image from "next/image";
import SalesGraph from "./SalesGraph";
import OrdersCard from "./OrdersCard";
import AuctionCard from "./AuctionCard";
import InventoryCard from "./InventoryCard";

const SellerBanner = () => {
  return (
    <div className="relative flex w-full max-w-[87rem] flex-col overflow-hidden rounded-[30px] bg-moonstone/25 px-5 py-16 md:px-10 xl:px-20">
      <div className="z-10 grid w-full gap-4 md:grid-cols-[9.5fr_10fr] lg:grid-cols-[9fr_10fr] lg:gap-6">
        <div className="grid grid-rows-2 gap-4 lg:gap-6">
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <OrdersCard />
            <AuctionCard />
          </div>
          <InventoryCard />
        </div>
        <SalesGraph />
      </div>
      <div className="absolute left-0 top-0 z-[1]">
        <Image
          src="/static/bg/blob.svg"
          width={400}
          height={500}
          alt="blob"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-[-200px] right-0 z-[1] h-[500px] w-[400px] rounded-full bg-white/20"></div>
    </div>
  );
};

export default SellerBanner;
