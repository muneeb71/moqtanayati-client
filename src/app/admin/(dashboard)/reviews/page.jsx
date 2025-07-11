import ReviewsPageClient from "./[category]/page";

export default function ReviewsPage({ params }) {
  const { category } = params;

  return <ReviewsPageClient category={category} />;
}
