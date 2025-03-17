import ReviewsTable from "@/components/sections/admin/reviews/ReviewsTable";
import ReviewsTableHeader from "@/components/sections/admin/reviews/ReviewsTableHeader";

const ReviewsPage = async ({ params }) => {
  const reviewCategory = (await params).category;
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
          reviewCategory={reviewCategory}
          reviewCategories={reviewCategories}
        />
      </div>
      <ReviewsTable category={reviewCategory} />
    </div>
  );
};

export default ReviewsPage;
