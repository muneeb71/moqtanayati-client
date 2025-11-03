"use client";
import useTranslation from "@/hooks/useTranslation";
import { starIcon } from "@/assets/icons/common-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { getAllReviews } from "@/lib/api/admin/reviews/getAllReviews";
import { approveReview } from "@/lib/api/admin/reviews/approveReview";
import { rejectReview } from "@/lib/api/admin/reviews/rejectReview";
import ShimmerRow from "@/components/shimmer/shimmerRow";
import TablePagination from "@/components/pagination/TablePagination";
import { BiSearch } from "react-icons/bi";
import Filter from "@/components/dropdown/filter";

const ReviewsTable = () => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState(
    "buyer-reviews-sellers",
  );

  const reviewSortOptions = [
    { label: t("admin.reviews.sort.newest"), value: "newest" },
    { label: t("admin.reviews.sort.oldest"), value: "oldest" },
    { label: t("admin.reviews.sort.highest"), value: "highest" },
    { label: t("admin.reviews.sort.lowest"), value: "lowest" },
  ];

  const reviewCategories = [
    {
      title: "Buyer Reviews Sellers",
      slug: "buyer-reviews-sellers",
    },
    {
      title: "Seller Reviews Buyers",
      slug: "seller-reviews-buyers",
    },
  ];

  const [review, setReview] = useState(null);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);

  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const actions = [
    { key: "APPROVE", label: t("admin.reviews.actions.approve") },
    { key: "REJECT", label: t("admin.reviews.actions.reject") },
  ];

  const tableHeaders = [
    t("admin.reviews.headers.buyer"),
    t("admin.reviews.headers.seller"),
    t("admin.reviews.headers.rating"),
    t("admin.reviews.headers.review"),
    t("admin.reviews.headers.actions"),
  ];

  const fetchReviewData = async (page = 1) => {
    try {
      setIsReviewsLoading(true);
      const res = await getAllReviews({
        currentPage: page,
        search: debouncedSearchTerm.trim(),
        category: selectedCategory,
      });

      const pagination = res?.data?.pagination || {};
      setReview(res?.data?.reviews || []);
      setRowsPerPage(pagination.limit || 10);
      setTotalPages(pagination.pages || 1);
      setTotalReviews(pagination.total || 0);
    } catch (error) {
      setReview([]);
    } finally {
      setIsReviewsLoading(false);
    }
  };

  const handleStatusChange = async (id, action) => {
    try {
      const res =
        action === "APPROVE" ? await approveReview(id) : await rejectReview(id);

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
        action === "APPROVE"
          ? t("admin.reviews.toast.approved")
          : t("admin.reviews.toast.rejected"),
      );
    } catch {
      setReview([]);
    }
  };

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
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    fetchReviewData(currentPage);
  }, [selectedCategory, currentPage, debouncedSearchTerm]);

  return (
    <div className="flex h-full w-full flex-col gap-2 py-5">
      <div
        ref={tableRef}
        className="mb-5 flex w-full items-end justify-between"
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold text-russianViolet">
            {t("admin.reviews.title")}
          </span>

          {/* <div className="flex flex-col justify-between gap-5 sm:items-center md:flex-row">
            <div className="flex items-center gap-2">
              {reviewCategories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "rounded-lg border px-2 py-2 text-xs sm:px-4",
                    selectedCategory === cat.slug
                      ? "bg-moonstone text-white"
                      : "border-silver bg-white text-davyGray hover:bg-moonstone/5",
                    "w-fit transition-all duration-100 ease-linear",
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div> */}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-[220px]">
            <input
              type="text"
              placeholder={t("admin.reviews.search")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full rounded-lg border border-silver bg-white pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-moonstone"
            />
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-500" />
          </div>

          <Filter
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortingOptions={reviewSortOptions}
          />
        </div>
      </div>

      <div className="flex h-full max-h-full flex-col overflow-hidden">
        <div className="flex h-full w-full flex-col overflow-auto rounded-lg">
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
                      {selectedCategory === "buyer-reviews-sellers" &&
                        header === t("admin.reviews.headers.buyer") && (
                          <span className="text-[10px] font-normal text-davyGray">
                            {t("admin.reviews.reviewed")}
                          </span>
                        )}
                      {selectedCategory === "seller-reviews-buyers" &&
                        header === t("admin.reviews.headers.seller") && (
                          <span className="text-[10px] font-normal text-davyGray">
                            {t("admin.reviews.reviewed")}
                          </span>
                        )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isReviewsLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, idx) => <ShimmerRow key={idx} columns={5} />)
              ) : sortedReviews.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-sm text-gray-500"
                  >
                    {t("admin.reviews.empty")}
                  </td>
                </tr>
              ) : (
                sortedReviews.map((data, index) => (
                  <tr key={index} className="border-b border-silver/30">
                    <td>
                      <div className="flex items-center gap-3 px-5 py-4">
                        <Image
                          src="/static/dummy-user/1.jpeg"
                          width={34}
                          height={34}
                          alt="Buyer"
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
                          alt="Seller"
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
                          {Array.from({ length: data.rating }, (_, index) => (
                            <span key={index}>{starIcon}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-silver">
                          {Array.from(
                            { length: 5 - data.rating },
                            (_, index) => (
                              <span key={index}>{starIcon}</span>
                            ),
                          )}
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
                        {data.status !== "PENDING" ? (
                          <button
                            disabled
                            className={cn(
                              "rounded-lg border px-2 py-2 text-xs sm:px-4",
                              "bg-davyGray/10 text-davyGray",
                              "w-fit transition-all duration-100 ease-linear",
                            )}
                          >
                            Reviewed
                          </button>
                        ) : (
                          actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleStatusChange(data.id, action.key)
                              }
                              className={cn(
                                "rounded-lg border px-2 py-2 text-xs sm:px-4",
                                action.key === "APPROVE"
                                  ? "bg-customGreen text-white hover:bg-customGreen/70"
                                  : "bg-faluRed/10 text-faluRed hover:bg-faluRed/30",
                                "w-fit transition-all duration-100 ease-linear",
                              )}
                            >
                              {action.label}
                            </button>
                          ))
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={totalReviews}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ReviewsTable;

// "use client";
// import { starIcon } from "@/assets/icons/common-icons";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import { getAllReviews } from "@/lib/api/admin/reviews/getAllReviews";
// import { approveReview } from "@/lib/api/admin/reviews/approveReview";
// import { rejectReview } from "@/lib/api/admin/reviews/rejectReview";
// import ShimmerRow from "@/components/shimmer/shimmerRow";
// import TablePagination from "@/components/pagination/TablePagination";
// import { useRef } from "react";
// import ReviewsTableHeader from "@/components/sections/admin/reviews/ReviewsTableHeader";
// import { BiSearch } from "react-icons/bi";
// import { filterIcon } from "@/assets/icons/admin-icons";
// import Filter from "@/components/dropdown/filter";
// import Link from "next/link";

// const ReviewsTable = ({ category }) => {
//   const [sortBy, setSortBy] = useState("newest");

//   const reviewSortOptions = [
//     { label: "Newest", value: "newest" },
//     { label: "Oldest", value: "oldest" },
//     { label: "Highest Rated", value: "highest" },
//     { label: "Lowest Rated", value: "lowest" },
//   ];

//   const reviewCategories = [
//     {
//       title: "Buyer Reviews Sellers",
//       slug: "buyer-reviews-sellers",
//       href: "/admin/reviews/buyer-reviews-sellers",
//     },
//     {
//       title: "Seller Reviews Buyers",
//       slug: "seller-reviews-buyers",
//       href: "/admin/reviews/seller-reviews-buyers",
//     },
//   ];

//   const [review, setReview] = useState(null);
//   const [isReviewsLoading, setIsReviewsLoading] = useState(false);

//   const tableRef = useRef(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalReviews, setTotalReviews] = useState(0);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   const actions = [
//     {
//       title: "Approve",
//       href: "",
//     },
//     {
//       title: "Reject",
//       href: "",
//     },
//   ];

//   const tableHeaders = ["Buyer", "Seller", "Rating", "Review", "Actions"];

//   const fetchReviewData = async (currentPage = 1) => {
//     try {
//       setIsReviewsLoading(true);
//       if (!currentPage || isNaN(currentPage)) return;

//       const res = await getAllReviews({
//         currentPage,
//         search: debouncedSearchTerm.trim(),
//       });

//       const pagination = res?.data?.pagination || {};

//       const fetchReviews = res.data.reviews || [];

//       setReview(fetchReviews);
//       setRowsPerPage(pagination.limit || 10);
//       setTotalPages(pagination.pages || 1);
//       setTotalReviews(pagination.total || res.length);
//     } catch (error) {
//       setReview([]);
//     } finally {
//       setIsReviewsLoading(false);
//     }
//   };

//   async function handleStatusChange(id, action) {
//     try {
//       const res =
//         action == "APPROVE" ? await approveReview(id) : await rejectReview(id);
//       console.log("reviews action data 1 : ", res.data);

//       // Update local review list
//       setReview((prev) =>
//         prev.map((item) =>
//           item.id === id
//             ? {
//                 ...item,
//                 status: action === "APPROVE" ? "APPROVED" : "REJECTED",
//               }
//             : item,
//         ),
//       );

//       toast.success(
//         `Review ${action === "APPROVE" ? "approved" : "rejected"} successfully`,
//       );
//     } catch (error) {
//       setReview([]);
//     }
//   }

//   const sortedReviews = (review || []).slice().sort((a, b) => {
//     switch (sortBy) {
//       case "newest":
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       case "oldest":
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       case "highest":
//         return b.rating - a.rating;
//       case "lowest":
//         return a.rating - b.rating;
//       default:
//         return 0;
//     }
//   });

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [searchTerm]);

//   useEffect(() => {
//     fetchReviewData(currentPage);
//   }, [category, currentPage, debouncedSearchTerm]);

//   return (
//     <div className="flex h-full w-full flex-col gap-2 py-5">
//       <div
//         ref={tableRef}
//         className="mb-5 flex w-full items-end justify-between"
//       >
//         <div className="flex flex-col gap-1">
//           <span className="text-2xl font-semibold text-russianViolet">
//             Reviews
//           </span>

//           {/* Selected Button */}

//           <div className="flex flex-col justify-between gap-5 sm:items-center md:flex-row">
//             <div className="flex items-center gap-2">
//               {reviewCategories.map((cat, index) => (
//                 <Link
//                   key={index}
//                   className={cn(
//                     "rounded-lg border px-2 py-2 text-xs sm:px-4",
//                     category === cat.slug
//                       ? "bg-moonstone text-white"
//                       : "border-silver bg-white text-davyGray hover:bg-moonstone/5",
//                     "w-fit transition-all duration-100 ease-linear",
//                   )}
//                   href={cat.href}
//                 >
//                   {cat.title}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="relative w-full max-w-[220px]">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="h-10 w-full rounded-lg border border-silver bg-white pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-moonstone"
//             />
//             <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-500" />
//           </div>

//           <Filter
//             sortBy={sortBy}
//             setSortBy={setSortBy}
//             sortingOptions={reviewSortOptions}
//           />
//         </div>
//       </div>

//       <div className="flex h-full max-h-full flex-col overflow-hidden">
//         <div className="flex h-full w-full flex-col overflow-auto rounded-lg">
//           <table className="w-full min-w-[1200px] table-fixed rounded-lg bg-white">
//             <thead>
//               <tr className="sticky top-0 border-b border-silver/30 bg-white">
//                 {tableHeaders.map((header, index) => (
//                   <th
//                     key={index}
//                     className={cn(
//                       header === "Review"
//                         ? "w-[30%]"
//                         : header === "Actions"
//                           ? "w-[200px] text-center"
//                           : "w-[20%]",
//                     )}
//                   >
//                     <div className="flex w-full items-center justify-between gap-3 px-5 py-4">
//                       <span className="text-sm font-medium text-darkBlue">
//                         {header}
//                       </span>
//                       {category == "buyer-reviews-sellers" &&
//                       header == "Buyer" ? (
//                         <span className="text-[10px] font-normal text-davyGray">
//                           Reviewed
//                         </span>
//                       ) : category == "seller-reviews-buyers" &&
//                         header == "Seller" ? (
//                         <span className="text-[10px] font-normal text-davyGray">
//                           Reviewed
//                         </span>
//                       ) : null}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {isReviewsLoading ? (
//                 Array(5)
//                   .fill(0)
//                   .map((_, idx) => <ShimmerRow key={idx} columns={5} />)
//               ) : sortedReviews.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="py-10 text-center text-sm text-gray-500"
//                   >
//                     No reviews found.
//                   </td>
//                 </tr>
//               ) : (
//                 sortedReviews.map((data, index) => (
//                   <tr key={index} className="border-b border-silver/30">
//                     <td>
//                       <div className="flex items-center gap-3 px-5 py-4">
//                         <Image
//                           src="/static/dummy-user/1.jpeg"
//                           width={34}
//                           height={34}
//                           alt="Buyer"
//                           loading="lazy"
//                           quality={100}
//                           className="rounded-full"
//                         />
//                         <span className="text-sm font-medium text-[#667085]">
//                           {data.user.name}
//                         </span>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="flex items-center gap-3 px-5 py-4">
//                         <Image
//                           src="/static/dummy-user/2.jpeg"
//                           width={34}
//                           height={34}
//                           alt="Buyer"
//                           loading="lazy"
//                           quality={100}
//                           className="rounded-full"
//                         />
//                         <span className="text-sm font-medium text-[#667085]">
//                           {data.seller.name}
//                         </span>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="flex items-center gap-1 px-5 py-4">
//                         <div className="flex items-center gap-1 text-[#F3B95A]">
//                           {/* render amount of rating in stars */}
//                           {Array.from({ length: data.rating }, (_, index) => (
//                             <span key={index}>{starIcon}</span>
//                           ))}
//                         </div>
//                         <div className="flex items-center gap-1 text-silver">
//                           {/* render remaining stars out of 5 here */}
//                           {Array.from(
//                             { length: 5 - data.rating },
//                             (_, index) => (
//                               <span key={index}>{starIcon}</span>
//                             ),
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="flex items-center gap-1 px-5 py-4 text-sm text-davyGray/50">
//                         {data.comment}
//                       </div>
//                     </td>
//                     <td className="flex min-h-20 w-full items-center justify-center">
//                       <div className="flex items-center gap-2">
//                         {actions.map((action, index) => (
//                           <button
//                             key={index}
//                             onClick={() =>
//                               handleStatusChange(
//                                 data.id,
//                                 action.title.toUpperCase(),
//                               )
//                             }
//                             disabled={data.status !== "PENDING"}
//                             className={cn(
//                               "rounded-lg border px-2 py-2 text-xs sm:px-4",
//                               data.status === "PENDING" &&
//                                 action.title === "Approve"
//                                 ? "bg-customGreen text-white hover:bg-customGreen/70"
//                                 : data.status === "PENDING" &&
//                                     action.title === "Reject"
//                                   ? "bg-faluRed/10 text-faluRed hover:bg-faluRed/30"
//                                   : "bg-davyGray/10 text-davyGray",
//                               "w-fit transition-all duration-100 ease-linear",
//                             )}
//                           >
//                             {action.title}
//                           </button>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         <TablePagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           rowsPerPage={rowsPerPage}
//           totalItems={totalReviews}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default ReviewsTable;
