"use client";
import { starIcon } from "@/assets/icons/common-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getAllReviews } from "@/lib/api/admin/reviews/getAllReviews";
import { approveReview } from "@/lib/api/admin/reviews/approveReview";
import { rejectReview } from "@/lib/api/admin/reviews/rejectReview";

const ReviewsTable = ({ category, sortBy, setSortBy }) => {
  const [review, setReview] = useState(null);
  const actions = [
    {
      title: "Approve",
      href: "",
    },
    {
      title: "Reject",
      href: "",
    },
  ];
  const tableHeaders = ["Buyer", "Seller", "Rating", "Review", "Actions"];

  async function fetchReviewData() {
    try {
      const res = await getAllReviews();
      console.log("reviews data 1 : ", res.data);

      const fetchReviews = res.data.reviews || [];
      console.log("reviews data 2 : ", fetchReviews);
      setReview(fetchReviews);
    } catch (error) {
      setReview([]);
    }
  }

  async function handleStatusChange(id, action) {
    try {
      const res =
        action == "APPROVE" ? await approveReview(id) : await rejectReview(id);
      console.log("reviews action data 1 : ", res.data);

      // Update local review list
      setReview((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: action === "APPROVE" ? "APPROVED" : "REJECTED",
              }
            : item,
        ),
      );

      toast.success(
        `Review ${action === "APPROVE" ? "approved" : "rejected"} successfully`,
      );
    } catch (error) {
      setReview([]);
    }
  }

  const sortedReviews = (review || []).slice().sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  useEffect(() => {
    fetchReviewData();
  }, [category]);

  if (!review) return <div>Loading reviews ....</div>;

  return (
    <div className="flex h-full max-h-full w-full flex-col overflow-auto">
      <table className="w-full min-w-[1200px] table-fixed rounded-lg bg-white">
        <thead>
          <tr className="sticky top-0 border-b border-silver/30 bg-white">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className={cn(
                  header === "Review"
                    ? "w-[30%]"
                    : header === "Actions"
                      ? "w-[200px] text-center"
                      : "w-[20%]",
                )}
              >
                <div className="flex w-full items-center justify-between gap-3 px-5 py-4">
                  <span className="text-sm font-medium text-darkBlue">
                    {header}
                  </span>
                  {category == "buyer-reviews-sellers" && header == "Buyer" ? (
                    <span className="text-[10px] font-normal text-davyGray">
                      Reviewed
                    </span>
                  ) : category == "seller-reviews-buyers" &&
                    header == "Seller" ? (
                    <span className="text-[10px] font-normal text-davyGray">
                      Reviewed
                    </span>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedReviews.map((data, index) => (
            <tr key={index} className="border-b border-silver/30">
              <td>
                <div className="flex items-center gap-3 px-5 py-4">
                  <Image
                    src="/static/dummy-user/1.jpeg"
                    width={34}
                    height={34}
                    alt="Buyer"
                    loading="lazy"
                    quality={100}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-[#667085]">
                    {data.user.name}
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-3 px-5 py-4">
                  <Image
                    src="/static/dummy-user/2.jpeg"
                    width={34}
                    height={34}
                    alt="Buyer"
                    loading="lazy"
                    quality={100}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-[#667085]">
                    {data.seller.name}
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-1 px-5 py-4">
                  <div className="flex items-center gap-1 text-[#F3B95A]">
                    {/* render amount of rating in stars */}
                    {Array.from({ length: data.rating }, (_, index) => (
                      <span key={index}>{starIcon}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-silver">
                    {/* render remaining stars out of 5 here */}
                    {Array.from({ length: 5 - data.rating }, (_, index) => (
                      <span key={index}>{starIcon}</span>
                    ))}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-1 px-5 py-4 text-sm text-davyGray/50">
                  {data.comment}
                </div>
              </td>
              <td className="flex min-h-20 w-full items-center justify-center">
                <div className="flex items-center gap-2">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleStatusChange(data.id, action.title.toUpperCase())
                      }
                      disabled={data.status !== "PENDING"}
                      className={cn(
                        "rounded-lg border px-2 py-2 text-xs sm:px-4",
                        data.status === "PENDING" && action.title === "Approve"
                          ? "bg-customGreen text-white hover:bg-customGreen/70"
                          : data.status === "PENDING" &&
                              action.title === "Reject"
                            ? "bg-faluRed/10 text-faluRed hover:bg-faluRed/30"
                            : "bg-davyGray/10 text-davyGray",
                        "w-fit transition-all duration-100 ease-linear",
                      )}
                    >
                      {action.title}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTable;
