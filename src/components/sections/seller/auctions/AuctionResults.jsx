"use client";

import { filterSvg } from "@/assets/icons/common-icons";
import AuctionCard from "./AuctionCard";
import { useAuctionStore } from "@/providers/auction-store-provider";
import { useMemo, useState } from "react";
import useTranslation from "@/hooks/useTranslation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const AuctionResults = ({ auctionType }) => {
  const { t } = useTranslation();
  const auctions = useAuctionStore((state) => state.auctionProducts);

  // Search and Filters state
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");

  // Temp states for dialog
  const [tmpCategory, setTmpCategory] = useState("");
  const [tmpCondition, setTmpCondition] = useState("");
  const [tmpMonth, setTmpMonth] = useState("");
  const [tmpYear, setTmpYear] = useState("");
  const [tmpLocation, setTmpLocation] = useState("");

  const openFilters = () => {
    setTmpCategory(category);
    setTmpCondition(condition);
    setTmpMonth(month);
    setTmpYear(year);
    setTmpLocation(location);
    setShowFilters(true);
  };

  const applyFilters = () => {
    setCategory(tmpCategory);
    setCondition(tmpCondition);
    setMonth(tmpMonth);
    setYear(tmpYear);
    setLocation(tmpLocation);
    setShowFilters(false);
  };

  const baseFiltered = auctions.filter((auction) => {
    const type = auctionType?.toLowerCase();
    const serverStatus = (auction.status || auction.product?.status || "")
      .toString()
      .toLowerCase();

    // Prefer server-provided status when available
    if (serverStatus) {
      const normalized = serverStatus === "ended" ? "history" : serverStatus;
      return normalized === type;
    }

    // Fallback: derive from launchDate + duration
    const now = new Date();
    const launchDateRaw = auction.product?.auctionLaunchDate;
    const durationDays = Number(auction.product?.auctionDuration) || 0;

    const launchDate = launchDateRaw ? new Date(launchDateRaw) : null;

    let derived;
    if (!launchDate || Number.isNaN(launchDate.getTime())) {
      // If launch date invalid, default to history so it won't appear live mistakenly
      derived = "history";
    } else if (durationDays <= 0) {
      // No duration means it ends immediately at launch
      derived = now < launchDate ? "upcoming" : "history";
    } else {
      const endDate = new Date(
        launchDate.getTime() + durationDays * 24 * 60 * 60 * 1000,
      );
      if (now < launchDate) derived = "upcoming";
      else if (now >= launchDate && now < endDate)
        derived = "live"; // strictly before end
      else derived = "history";
    }

    return derived === type;
  });

  // Build options (categories, locations, years)
  const { categoryOptions, locationOptions, yearOptions } = useMemo(() => {
    const cats = new Set();
    const locs = new Set();
    const years = new Set();
    auctions.forEach((a) => {
      if (Array.isArray(a.product?.categories)) {
        a.product.categories.forEach((c) => c && cats.add(String(c)));
      }
      if (a.product?.address) locs.add(String(a.product.address));
      const y = new Date(a.createdAt).getFullYear();
      if (!isNaN(y)) years.add(String(y));
    });
    return {
      categoryOptions: Array.from(cats),
      locationOptions: Array.from(locs),
      yearOptions: Array.from(years).sort((a, b) => Number(b) - Number(a)),
    };
  }, [auctions]);

  // Apply search and filters
  const filteredAuctions = useMemo(() => {
    return baseFiltered.filter((a) => {
      const nameMatch = query
        ? a.product?.name?.toLowerCase().includes(query.toLowerCase())
        : true;
      const catMatch = category
        ? Array.isArray(a.product?.categories) &&
          a.product.categories.map(String).includes(category)
        : true;
      const rawCondition =
        a.product?.productCondition ?? a.product?.condition ?? "";
      const condMatch = condition
        ? String(rawCondition).toLowerCase() === condition.toLowerCase()
        : true;
      const created = new Date(a.createdAt);
      const monthMatch = month
        ? String(created.getMonth() + 1) === month
        : true;
      const yearMatch = year ? String(created.getFullYear()) === year : true;
      const locMatch = location
        ? String(a.product?.address || "")
            .toLowerCase()
            .includes(location.toLowerCase())
        : true;
      return (
        nameMatch &&
        catMatch &&
        condMatch &&
        monthMatch &&
        yearMatch &&
        locMatch
      );
    });
  }, [baseFiltered, query, category, condition, month, year, location]);

  const conditionLabel = (value) => {
    const v = String(value || "").toLowerCase();
    if (v === "new") return t("seller.auctions.new");
    if (v === "old") return t("seller.auctions.old");
    return value || "";
  };

  const translateCategory = (value) => {
    const key = `categories.${value}`;
    const tr = t(key);
    return tr === key ? value : tr;
  };

  const emptyMessage = (() => {
    const type = (auctionType || "").toLowerCase();
    if (type === "live") return t("seller.auctions.no_live");
    if (type === "upcoming") return t("seller.auctions.no_upcoming");
    if (type === "history") return t("seller.auctions.no_history");
    return t("seller.auctions.no_products");
  })();

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-[21px] font-medium leading-[31px]">
          {baseFiltered.length}{" "}
          <span className="font-normal text-battleShipGray">
            {t("seller.auctions.results")}
          </span>
        </h1>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("seller.auctions.search_by_name")}
            className="h-10 w-40 rounded-[12px] bg-[#F8F7FB] px-3 text-sm text-russianViolet placeholder:text-battleShipGray/70 focus:outline-none md:w-64"
          />
          <button
            className="flex h-10 items-center gap-2 rounded-[12px] bg-[#F8F7FB] px-3 text-russianViolet transition-all duration-150 ease-in hover:bg-russianViolet hover:text-white"
            onClick={openFilters}
          >
            {filterSvg}
            <span className="">{t("seller.auctions.filters")}</span>
          </button>
        </div>
      </div>
      {/* Applied filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        {query && (
          <button
            onClick={() => setQuery("")}
            className="flex items-center gap-1 rounded-full bg-moonstone/10 px-2 py-1 text-xs text-darkBlue"
          >
            <span>
              {t("seller.auctions.query")}: {query}
            </span>
            <span className="rounded-full bg-moonstone px-1 py-0.5 text-white">
              ×
            </span>
          </button>
        )}
        {category && (
          <button
            onClick={() => setCategory("")}
            className="flex items-center gap-1 rounded-full bg-moonstone/10 px-2 py-1 text-xs text-darkBlue"
          >
            <span>
              {t("seller.auctions.category")}: {translateCategory(category)}
            </span>
            <span className="rounded-full bg-moonstone px-1 py-0.5 text-white">
              ×
            </span>
          </button>
        )}
        {condition && (
          <button
            onClick={() => setCondition("")}
            className="flex items-center gap-1 rounded-full bg-moonstone/10 px-2 py-1 text-xs text-darkBlue"
          >
            <span>
              {t("seller.auctions.condition")}: {conditionLabel(condition)}
            </span>
            <span className="rounded-full bg-moonstone px-1 py-0.5 text-white">
              ×
            </span>
          </button>
        )}
        {(month || year) && (
          <button
            onClick={() => {
              setMonth("");
              setYear("");
            }}
            className="flex items-center gap-1 rounded-full bg-moonstone/10 px-2 py-1 text-xs text-darkBlue"
          >
            <span>
              {t("seller.auctions.date")}: {month ? `M${month}` : ""}{" "}
              {year ? `Y${year}` : ""}
            </span>
            <span className="rounded-full bg-moonstone px-1 py-0.5 text-white">
              ×
            </span>
          </button>
        )}
        {location && (
          <button
            onClick={() => setLocation("")}
            className="flex items-center gap-1 rounded-full bg-moonstone/10 px-2 py-1 text-xs text-darkBlue"
          >
            <span>
              {t("seller.auctions.location")}: {location}
            </span>
            <span className="rounded-full bg-moonstone px-1 py-0.5 text-white">
              ×
            </span>
          </button>
        )}
      </div>

      {/* Filter dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-[600px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>{t("seller.auctions.filters")}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-battleShipGray">
                {t("seller.auctions.category")}
              </label>
              <select
                value={tmpCategory}
                onChange={(e) => setTmpCategory(e.target.value)}
                className="h-9 rounded-md border border-silver px-2 text-sm"
              >
                <option value="">{t("seller.auctions.all_categories")}</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-battleShipGray">
                {t("seller.auctions.condition")}
              </label>
              <select
                value={tmpCondition}
                onChange={(e) => setTmpCondition(e.target.value)}
                className="h-9 rounded-md border border-silver px-2 text-sm"
              >
                <option value="">{t("seller.auctions.any_condition")}</option>
                <option value="new">{t("seller.auctions.new")}</option>
                <option value="old">{t("seller.auctions.old")}</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-battleShipGray">
                {t("seller.auctions.month")}
              </label>
              <select
                value={tmpMonth}
                onChange={(e) => setTmpMonth(e.target.value)}
                className="h-9 rounded-md border border-silver px-2 text-sm"
              >
                <option value="">{t("seller.auctions.any_month")}</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={String(m)}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-battleShipGray">
                {t("seller.auctions.year")}
              </label>
              <select
                value={tmpYear}
                onChange={(e) => setTmpYear(e.target.value)}
                className="h-9 rounded-md border border-silver px-2 text-sm"
              >
                <option value="">{t("seller.auctions.any_year")}</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs text-battleShipGray">
                {t("seller.auctions.location")}
              </label>
              <input
                value={tmpLocation}
                onChange={(e) => setTmpLocation(e.target.value)}
                placeholder={t("seller.auctions.location")}
                className="h-9 rounded-md border border-silver px-2 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-4">
            <DialogClose asChild>
              <button className="rounded-md border border-silver px-3 py-1.5 text-sm">
                {t("seller.auctions.cancel")}
              </button>
            </DialogClose>
            <button
              onClick={applyFilters}
              className="rounded-md bg-moonstone px-3 py-1.5 text-sm text-white"
            >
              {t("seller.auctions.apply_filters")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {filteredAuctions.length === 0 ? (
        <div className="flex w-full items-center justify-center py-24">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-moonstone/10">
              <span className="text-2xl">🗂️</span>
            </div>
            <span className="text-sm text-battleShipGray">{emptyMessage}</span>
          </div>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
          {filteredAuctions?.map((auction, index) => (
            <AuctionCard
              key={index}
              id={auction.id}
              title={auction.product.name}
              bids={auction.bids}
              image={auction.product.images[0]}
              address={auction.product.address}
              createdAt={auction.createdAt}
              isFavourite={auction.product.isFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionResults;
