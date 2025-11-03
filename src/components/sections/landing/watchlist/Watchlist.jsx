"use client";

import WatchlistCard from "./WatchlistCard";
import useTranslation from "@/hooks/useTranslation";

const Watchlist = ({ items, removeFromWatchlist }) => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[40rem] w-full max-w-7xl flex-col gap-5 px-3">
      <h1 className="text-[21px] font-medium leading-[31px]">
        {items.length}{" "}
        <span className="font-normal text-battleShipGray">
          {t("buyer.watchlist.results")}
        </span>
      </h1>
      <div className="grid min-h-[20rem] gap-x-5 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
        {items?.length > 0 ? (
          items.map((item, index) => (
            <WatchlistCard
              key={index}
              item={item}
              removeFromWatchlist={removeFromWatchlist}
            />
          ))
        ) : (
          <p className="text-black-500 col-span-3 w-full text-center md:col-span-2">
            {t("buyer.watchlist.no_items")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
