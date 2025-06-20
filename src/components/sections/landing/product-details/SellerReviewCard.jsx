import { sellerChatIcon, starIcon } from "@/assets/icons/common-icons";
import Image from "next/image";

const SellerReviewCard = ({seller}) => {
  const calculateAverageRating = () => {
    if (!seller?.reviews || !Array.isArray(seller.reviews) || seller.reviews.length === 0) {
      return { average: 0, count: 0 };
    }
    
    const totalRating = seller.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const average = totalRating / seller.reviews.length;
    return { average: Math.round(average * 10) / 10, count: seller.reviews.length };
  };

  const { average, count } = calculateAverageRating();
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-[#F3B95A]">{starIcon}</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-[#F3B95A]">{starIcon}</span>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-silver">{starIcon}</span>);
    }
    
    return stars;
  };
  
  return (
    <div className="flex w-full max-w-[404px] flex-col gap-3.5 rounded-[14px] bg-[#F8F7FB] p-3">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="grid size-[57.6px] place-items-center overflow-hidden rounded-full">
            <Image
              src="/static/dummy-user/1.jpeg"
              width={100}
              height={100}
              alt="notification"
              loading="lazy"
              className="h-full w-full object-cover"
            />
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
        <button className="flex items-center gap-1 rounded-[5.6px] border border-moonstone/10 bg-moonstone/10 px-2 py-1 text-moonstone hover:border-moonstone hover:bg-moonstone/20">
          {sellerChatIcon} <span className="text-sm">Chat with seller</span>
        </button>
        <button className="flex items-center gap-1 rounded-[5.6px] border border-moonstone/10 bg-moonstone/10 px-3 py-1 text-moonstone hover:border-moonstone hover:bg-moonstone/20">
          <span className="text-sm">View Profile</span>
        </button>
      </div>
    </div>
  );
};

export default SellerReviewCard;
