import Image from "next/image";

const SellerTypeCard = ({
  title,
  description,
  image,
  className,
  onClick,
  imageClassName,
  isSelected,
}) => {
  return (
    <div
      className={`relative flex cursor-pointer flex-row gap-5 rounded-2xl px-6 py-6 ${className}`}
      onClick={onClick}
    >
      {isSelected && <div className="absolute right-2 top-2">{tickGreen}</div>}
      <div
        className={`flex items-center justify-center rounded-full ${imageClassName} bg-white`}
      >
        <Image src={image} width={30} height={30} alt="User profile image" />
      </div>
      <div className="flex flex-col">
        <p className="text-[18px] font-medium">{title}</p>
        <p className="text-[15px] font-normal text-davyGray/80">
          {description}
        </p>
      </div>
    </div>
  );
};

const tickGreen = (
  <svg
    width="29"
    height="29"
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5001 2.41699C7.84216 2.41699 2.41675 7.84241 2.41675 14.5003C2.41675 21.1582 7.84216 26.5837 14.5001 26.5837C21.158 26.5837 26.5834 21.1582 26.5834 14.5003C26.5834 7.84241 21.158 2.41699 14.5001 2.41699ZM20.2759 11.7212L13.4247 18.5724C13.2555 18.7416 13.0259 18.8382 12.7842 18.8382C12.5426 18.8382 12.313 18.7416 12.1438 18.5724L8.72425 15.1528C8.37383 14.8024 8.37383 14.2224 8.72425 13.872C9.07466 13.5216 9.65466 13.5216 10.0051 13.872L12.7842 16.6512L18.9951 10.4403C19.3455 10.0899 19.9255 10.0899 20.2759 10.4403C20.6263 10.7907 20.6263 11.3587 20.2759 11.7212Z"
      fill="#25A5B4"
    />
  </svg>
);

export default SellerTypeCard;
