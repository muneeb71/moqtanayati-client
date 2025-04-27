"use client";

import { chevronRightIcon } from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import TextareaField from "@/components/form-fields/CustomTextArea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

const LeaveFeedbackDialog = ({ item }) => {
  const [rating, setRating] = useState(4);
  const totalRating = 5;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-baseline text-xs font-medium text-russianViolet sm:gap-1 sm:text-sm">
          Rate{" "}
          <span className="hidden sm:flex">Product {chevronRightIcon}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
            Leave Feedback
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-10 py-3">
          <div className="flex w-full gap-2">
            <div className="aspect-square h-full max-h-[96px] w-[96px] overflow-hidden rounded-2xl border border-black/5">
              <Image
                src={item.image}
                width={200}
                height={200}
                className="h-full w-full object-cover"
                alt="Image"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="max-w-[200px] truncate text-sm text-black/70">
                {item.title}
              </span>
              <p className="flex gap-1 font-medium">
                <span className="text-moonstone">Total Paid:</span>
                <span>${item.price.toFixed(2)}</span>
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <h1 className="text-darkBlue font-medium">Rate Your Experience</h1>
            <div className="flex items-center gap-2 text-[#F3B95A]">
              {[...Array(totalRating)].map((_, index) => (
                <button key={index} onClick={() => setRating(index + 1)}>
                  <span
                    className={
                      index < rating ? "text-[#F3B95A]" : "text-silver"
                    }
                  >
                    {starIcon}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            {/* <Label text="Write a Review" /> */}
            <TextareaField
              placeholder="Share your thoughts about the product or seller…"
              className="h-44"
            />
          </div>
          <RoundedButton title="Submit Feedback" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const starIcon = (
  <svg
    width="47"
    height="47"
    viewBox="0 0 49 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M47.9132 18.4838C47.5591 17.4299 46.6468 16.6614 45.5484 16.4934L32.7648 14.54L27.0228 2.3079C26.5331 1.26526 25.4867 0.601562 24.3371 0.601562C23.1868 0.601562 22.1411 1.26526 21.6514 2.3079L15.9087 14.5408L3.12508 16.4942C2.0267 16.6622 1.1144 17.4299 0.761077 18.4845C0.407757 19.5392 0.674442 20.7009 1.45114 21.4979L10.7866 31.0707L8.57556 44.6137C8.39325 45.7347 8.86861 46.8617 9.79598 47.5171C10.7226 48.1725 11.946 48.2388 12.9427 47.6889L24.3379 41.3871L35.733 47.6889C36.1828 47.9375 36.6777 48.0595 37.1704 48.0595C37.7701 48.0595 38.3697 47.8772 38.8797 47.5171C39.8071 46.8624 40.2817 45.7354 40.0994 44.6137L37.8883 31.0707L47.2246 21.4979C47.9998 20.7009 48.2665 19.5392 47.9132 18.4838Z"
      fill="currentColor"
    />
  </svg>
);

export default LeaveFeedbackDialog;
