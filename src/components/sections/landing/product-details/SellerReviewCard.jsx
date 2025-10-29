import { sellerChatIcon, starIcon } from "@/assets/icons/common-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/providers/chat-store-provider";

const SellerReviewCard = ({ seller }) => {
  const calculateAverageRating = () => {
    if (
      !seller?.reviews ||
      !Array.isArray(seller.reviews) ||
      seller.reviews.length === 0
    ) {
      return { average: 0, count: 0 };
    }

    const totalRating = seller.reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0,
    );
    const average = totalRating / seller.reviews.length;
    return {
      average: Math.round(average * 10) / 10,
      count: seller.reviews.length,
    };
  };

  const { average, count } = calculateAverageRating();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-[#F3B95A]">
          {starIcon}
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-[#F3B95A]">
          {starIcon}
        </span>,
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-silver">
          {starIcon}
        </span>,
      );
    }

    return stars;
  };

  const router = useRouter();
  const conversations = useChatStore((s) => s.conversations);
  const setSelectedChat = useChatStore((s) => s.setSelectedChat);

  const handleChatWithSeller = () => {
    if (seller?.id) {
      const qp = new URLSearchParams({
        id: String(seller.id),
        name: seller?.name || "",
        avatar: seller?.avatar || "",
      });
      router.push(`/buyer/chats?${qp.toString()}`);
    }
  };

  return (
    <div className="flex w-full max-w-[404px] flex-col gap-3.5 rounded-[14px] bg-[#F8F7FB] p-3">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="grid size-[57.6px] place-items-center overflow-hidden rounded-full">
            {seller?.avatar ? (
              <Image
                src={seller.avatar}
                width={100}
                height={100}
                alt="seller"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[14.4px] text-black/50">Seller</span>
            <span className="text-[17px] font-medium leading-[25px] text-black/70">
              {seller?.name}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-0.5">
            {renderStars(average)}
          </div>
          <p className="text-sm text-davyGray">
            {average > 0 ? `${average} (${count} reviews)` : "No reviews yet"}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleChatWithSeller}
          className="flex items-center gap-1 rounded-[5.6px] border border-moonstone/10 bg-moonstone/10 px-2 py-1 text-moonstone hover:border-moonstone hover:bg-moonstone/20"
        >
          {sellerChatIcon} <span className="text-sm">Chat with seller</span>
        </button>
        {/* <button className="flex items-center gap-1 rounded-[5.6px] border border-moonstone/10 bg-moonstone/10 px-3 py-1 text-moonstone hover:border-moonstone hover:bg-moonstone/20">
          <span className="text-sm">View Profile</span>
        </button> */}
      </div>
    </div>
  );
};

export default SellerReviewCard;
