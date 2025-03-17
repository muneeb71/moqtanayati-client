import { cn } from "@/lib/utils";
import React from "react";

const PlaceBidButton = ({ className = "", type = "primary", ...props }) => {
  return (
    <button
      className={cn(
        "flex h-[44px] w-full max-w-[168px] items-center justify-center gap-2.5 rounded-[7px] text-white",
        type == "primary" ? "bg-russianViolet" : "bg-moonstone",
        className,
      )}
      {...props}
    >
      {hammerIcon}
      <span
        className={cn(
          type == "primary"
            ? "text-[12px] leading-[18px]"
            : "text-[14.4px] leading-[21.6px]",
        )}
      >
        Place your Bid
      </span>
      {type == "primary" && chevronRightIcon}
    </button>
  );
};

const hammerIcon = (
  <svg
    width="19"
    height="17"
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.29733 1.6527L10.8438 4.2777C11.2031 4.4847 11.6613 4.3617 11.8676 4.0032C12.0753 3.6447 11.9523 3.1857 11.5938 2.97945L7.04733 0.354449C6.68808 0.147449 6.22983 0.270449 6.02283 0.628199C5.81583 0.985949 5.93883 1.44495 6.29733 1.6527ZM10.4696 4.9272L5.92308 2.3022L3.29808 6.8487L7.84458 9.4737L10.4696 4.9272ZM2.17233 8.7972L6.71883 11.4222C7.07733 11.6292 7.53633 11.5062 7.74258 11.1477C7.94883 10.7892 7.82658 10.3302 7.46883 10.1239L2.92233 7.49895C2.56308 7.29195 2.10483 7.41495 1.89783 7.7727C1.69008 8.1312 1.81383 8.5902 2.17233 8.7972ZM17.8391 10.9137L9.53208 6.55095L8.78208 7.84995L16.7141 12.8622C17.2518 13.1727 17.9403 12.9889 18.2508 12.4504C18.5613 11.9119 18.3768 11.2242 17.8391 10.9137ZM9.60483 14.7004C9.60483 14.2857 9.26883 13.9504 8.85483 13.9504H2.10483C1.69008 13.9504 1.35483 14.2857 1.35483 14.7004C1.35483 15.1144 1.35483 15.4504 1.35483 15.4504L0.580078 15.4347L0.604828 16.2004H10.3548L10.3901 15.4819L9.65208 15.4504C9.65208 15.4504 9.60483 15.1144 9.60483 14.7004Z"
      fill="currentColor"
    />
  </svg>
);

const chevronRightIcon = (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.58008 1.1084L6.42158 5.9499L1.58008 10.7914"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlaceBidButton;
