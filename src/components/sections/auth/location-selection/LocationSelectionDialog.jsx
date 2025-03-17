"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LocationSelectionDialog = ({ trigger }) => {
  const router = useRouter();
  const role = localStorage.getItem("role");
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="px-4 md:pt-0">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <Label text="Location" />
            <input
              type="text"
              className="h-10 min-w-60 rounded-md border border-[#F8F7FB] bg-[#F8F7FB] px-3 text-sm outline-none focus:border-moonstone"
              placeholder="Islamabad, Pakistan"
            />
          </div>
          <div className="h-[400px] w-full overflow-hidden rounded-xl md:h-[539px]">
            <Image
              className="h-full w-full object-cover"
              src="/map.png"
              width={513}
              height={538}
              alt="map"
              loading="lazy"
              quality={100}
            />
          </div>
          <RoundedButton
            title="Confirm"
            showIcon
            className="h-12 w-[182px] self-center text-sm"
            onClick={() => (role === "seller" ? router.push("/seller-type") : router.push("/"))}
            icon={
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.42745 11.2197L6.10875 6.53843C6.35671 6.29046 6.4807 6.16648 6.4807 6.01241C6.4807 5.85834 6.35671 5.73436 6.10875 5.48639L1.42745 0.805093"
                  stroke="white"
                  strokeWidth="1.4878"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelectionDialog;
