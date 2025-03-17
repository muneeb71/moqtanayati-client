"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { sendIcon } from "@/assets/icons/common-icons";

const QaSectionSheet = () => {
  const sortOptions = ["Newest", "Oldest"];
  const [selectedSortOption, setSelectedSortOption] = useState("Newest");

  const dummyComments = [
    {
      name: "Ralph Edwards",
      image: "/dummy-user/5.jpeg",
      comment: "Is the battery health above 90%?",
      time: "3 hrs ago",
      replies: [
        {
          name: "Alex Johns",
          image: "/dummy-user/1.jpeg",
          reply: "Yes, the battery health is at 92%",
          time: "2 hrs ago",
        },
      ],
    },
    {
      name: "Ralph Edwards",
      image: "/dummy-user/5.jpeg",
      comment: "Is the battery health above 90%?",
      time: "3 hrs ago",
      replies: [
        {
          name: "Alex Johns",
          image: "/dummy-user/1.jpeg",
          reply: "Yes, the battery health is at 92%",
          time: "2 hrs ago",
        },
      ],
    },
    {
      name: "Ralph Edwards",
      image: "/dummy-user/5.jpeg",
      comment: "Is the battery health above 90%?",
      time: "3 hrs ago",
      replies: [
        {
          name: "Alex Johns",
          image: "/dummy-user/1.jpeg",
          reply: "Yes, the battery health is at 92%",
          time: "2 hrs ago",
        },
      ],
    },
    {
      name: "Ralph Edwards",
      image: "/dummy-user/5.jpeg",
      comment: "Is the battery health above 90%?",
      time: "3 hrs ago",
      replies: [
        {
          name: "Alex Johns",
          image: "/dummy-user/1.jpeg",
          reply: "Yes, the battery health is at 92%",
          time: "2 hrs ago",
        },
      ],
    },
    {
      name: "Ralph Edwards",
      image: "/dummy-user/2.jpeg",
      comment: "Are there any scratches on the screen?",
      time: "4 hrs ago",
      replies: [
        {
          name: "Alex Johns",
          image: "/dummy-user/1.jpeg",
          reply: "No, the screen is scratch-free.",
          time: "5 mins ago",
        },
      ],
    },
    {
      name: "Leslie Alexander",
      image: "/dummy-user/3.jpeg",
      comment: "What’s the storage capacity?",
      time: "5 hrs ago",
      replies: [],
    },
  ];
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "h-[34.8px] text-nowrap rounded-[5.6px] bg-[#3F175F1A] px-3 text-xs text-[#3F175F] md:text-sm",
        )}
      >
        Q&A Section
      </SheetTrigger>
      <SheetContent className="mt-40 w-full rounded-tl-[30px] border-none p-0 py-5 md:min-w-[483px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between border-b border-[#F0F1F4] pb-5 text-center text-[21px] font-medium text-darkBlue">
            <span className="w-full text-center">Q&A Section</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full w-full flex-col">
          <div className="flex w-full items-center justify-between px-5 py-5">
            <p className="flex items-center gap-1 text-[14.4px]">
              <span className="font-medium">22</span>
              <span className="text-davyGray">Comments</span>
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-medium">
                {selectedSortOption} <ChevronDown className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedSortOption(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex h-[calc(100%-254px)] w-full flex-col justify-between">
            <div className="no-scrollbar flex h-full max-h-full w-full flex-col overflow-auto">
              {dummyComments.map((comment, index) => (
                <div
                  className="flex items-start gap-2 border-t border-[#F0F1F4] px-5 py-3"
                  key={index}
                >
                  <div className="grid size-[57px] min-w-[57px] place-items-center overflow-hidden rounded-full">
                    <Image
                      src={comment.image}
                      width={100}
                      height={100}
                      alt="notification"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col py-2">
                      <div className="flex items-center justify-between">
                        <h1 className="text-[14.4px] text-davyGray">
                          {comment.name}
                        </h1>
                        <h1 className="text-xs text-davyGray">
                          {comment.time}
                        </h1>
                      </div>
                      <span className="text-[14.4px] text-eerieBlack">
                        {comment.comment}
                      </span>
                    </div>
                    {comment.replies?.length > 0 &&
                      comment.replies.map((reply, index) => (
                        <div
                          className="flex w-full gap-2 border-l-2 border-dashed border-black/10 pl-3"
                          key={index}
                        >
                          <div className="grid size-[57px] min-w-[57px] place-items-center overflow-hidden rounded-full">
                            <Image
                              src={reply.image}
                              width={100}
                              height={100}
                              alt="notification"
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full flex-col py-2">
                              <div className="flex items-center justify-between">
                                <h1 className="text-[14.4px] text-davyGray">
                                  {reply.name}{" "}
                                  <span className="text-moonstone">
                                    (Seller)
                                  </span>
                                </h1>
                                <h1 className="text-xs text-davyGray">
                                  {reply.time}
                                </h1>
                              </div>
                              <span className="text-[14.4px] text-eerieBlack">
                                {reply.reply}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full items-center gap-2 pb-5 pl-5 pr-3 pt-2">
              <input
                type="text"
                name="msg"
                id="msg"
                className="h-[60px] w-full rounded-[10px] bg-[#F8F7FB] px-4 focus:outline-moonstone"
                placeholder="Enter your message"
              />
              <button className="rounded-lg p-2">{sendIcon}</button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QaSectionSheet;
