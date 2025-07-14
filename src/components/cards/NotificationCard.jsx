import formatDateTime from "@/utils/dateFormatter";

const NotificationCard = ({ image, title, desc, time }) => {
  return (
    <div className="flex items-center justify-between gap-[50px] rounded-[15px] bg-[#F8F7FB] py-5 pl-5 pr-1.5">
      <div className="flex flex-col items-start gap-3 sm:flex-row">
        {/* <div className="grid size-[66px] place-items-center overflow-hidden rounded-full">
          <Image
            src={image}
            width={100}
            height={100}
            alt="notification"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div> */}
        <div className="flex min-h-[97px] flex-col justify-between">
          <span className="max-w-[337px] text-lg sm:text-[21px] sm:leading-[31px]">
            <span className="font-medium">{title}:</span> {desc}
          </span>
          <span className="font-medium text-battleShipGray sm:text-lg">
            {formatDateTime.formatDateTime(time)}
          </span>
        </div>
      </div>
      {/* <button className="text-[#8E8E93] hover:text-black/80">
        {barsIconSvg}
      </button> */}
    </div>
  );
};

const barsIconSvg = (
  <svg
    width="37"
    height="37"
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3445 19.9869C19.1658 19.9869 19.8316 19.3211 19.8316 18.4998C19.8316 17.6785 19.1658 17.0127 18.3445 17.0127C17.5232 17.0127 16.8574 17.6785 16.8574 18.4998C16.8574 19.3211 17.5232 19.9869 18.3445 19.9869Z"
      stroke="currentColor"
      strokeWidth="2.97421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3445 9.57773C19.1658 9.57773 19.8316 8.91193 19.8316 8.09062C19.8316 7.26932 19.1658 6.60352 18.3445 6.60352C17.5232 6.60352 16.8574 7.26932 16.8574 8.09062C16.8574 8.91193 17.5232 9.57773 18.3445 9.57773Z"
      stroke="currentColor"
      strokeWidth="2.97421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3445 30.3961C19.1658 30.3961 19.8316 29.7303 19.8316 28.909C19.8316 28.0877 19.1658 27.4219 18.3445 27.4219C17.5232 27.4219 16.8574 28.0877 16.8574 28.909C16.8574 29.7303 17.5232 30.3961 18.3445 30.3961Z"
      stroke="currentColor"
      strokeWidth="2.97421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NotificationCard;
