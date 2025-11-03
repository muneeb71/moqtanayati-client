"use client";
import PageHeading from "@/components/headings/PageHeading";
import Watchlist from "@/components/sections/landing/watchlist/Watchlist";
import { getWatchlist } from "@/lib/api/watchlist/getWatchlist";
import { useState, useEffect } from "react";
import WatchlistCardSkeleton from "@/components/loaders/WatchlistCardSkeleton";
import { removeFromWatchlist } from "@/lib/api/watchlist/removeWatchlist";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const WatchListPage = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(items);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await getWatchlist();
        if (response?.success) {
          setItems(response.data?.data || response.data || []);
        } else {
          console.error("Failed to fetch watchlist:", response?.error);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const removeWatchlist = async (id) => {
    console.log("item watchlist id : ", id);
    // Store the current items for potential rollback
    const currentItems = items;

    // Optimistically remove the item from local state first
    setItems((prevItems) => {
      if (!prevItems) return [];
      return prevItems.filter((item) => item?.id !== id);
    });

    const res = await removeFromWatchlist(id);
    if (res?.success === true) {
      toast.success(t("buyer.watchlist.removed_success"));
    } else {
      // If removal failed, restore the original items
      setItems(currentItems);
      toast.error(t("buyer.watchlist.remove_failed"));
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <PageHeading>{t("buyer.watchlist.title")}</PageHeading>
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
