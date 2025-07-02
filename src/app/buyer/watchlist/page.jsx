"use client";
import PageHeading from "@/components/headings/PageHeading";
import Watchlist from "@/components/sections/landing/watchlist/Watchlist";
import { getUserProfile } from "@/lib/api/profile/getProfile";
import { Suspense, useState, useEffect } from "react";
import WatchlistCardSkeleton from "@/components/loaders/WatchlistCardSkeleton";
import { removeFromWatchlist } from "@/lib/api/watchlist/removeWatchlist";
import toast from "react-hot-toast";

const WatchListPage = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(items);

  useEffect(() => {
    getUserProfile().then((user) => {
      setItems(user?.data?.watchlists || []);
      setLoading(false);
    });
  }, []);

  const removeWatchlist = async (id) => {
    const res = await removeFromWatchlist(id);
    if (res?.data?.success) {
      toast.success("Removed from Watchlist");
      setLoading(true);
      getUserProfile().then((user) => {
        setItems(user?.data?.watchlists || []);
        setLoading(false);
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>Watchlist</PageHeading>
      {loading ? (
        <div className="grid min-h-[30rem] w-full max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          <WatchlistCardSkeleton />
          <WatchlistCardSkeleton />
          <WatchlistCardSkeleton />
        </div>
      ) : (
        <Watchlist items={items} removeFromWatchlist={removeWatchlist} />
      )}
    </div>
  );
};

export default WatchListPage;
