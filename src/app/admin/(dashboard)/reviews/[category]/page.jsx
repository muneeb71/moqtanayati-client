"use client";

import { useState } from "react";
import ReviewsTable from "@/components/sections/admin/reviews/ReviewsTable";
import ReviewsTableHeader from "@/components/sections/admin/reviews/ReviewsTableHeader";

const ReviewsPageClient = ({ category }) => {
  const [sortBy, setSortBy] = useState("newest");

  const reviewCategories = [
    {
      title: "Buyer Reviews Sellers",
      slug: "buyer-reviews-sellers",
      href: "/admin/reviews/buyer-reviews-sellers",
    },
    {
      title: "Seller Reviews Buyers",
      slug: "seller-reviews-buyers",
      href: "/admin/reviews/seller-reviews-buyers",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-2 py-5">
      <div className="flex w-full flex-col gap-5">
        <span className="text-2xl font-semibold text-russianViolet">
          Reviews
        </span>
        <ReviewsTableHeader
          reviewCategory={category}
          reviewCategories={reviewCategories}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <ReviewsTable category={category} sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
};

export default ReviewsPageClient;
