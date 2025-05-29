"use client";

import { useState } from "react";
import { envelopeIcon } from "@/assets/icons/input-icons";
import { profilePhoneIcon } from "@/assets/icons/profile-icons";
import {
  creditCardIcon,
  sellerLocationIcon,
  sellerProfileHouseIcon,
} from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import PageHeading from "@/components/headings/PageHeading";
import { PenLine } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const SellerProfileEditPage = () => {
  const [house, setHouse] = useState("Lorem");
  const [phone, setPhone] = useState("+92 3334412433");
  const [email, setEmail] = useState("tarragon@moqtanayati.com");
  const [creditCard, setCreditCard] = useState("11334455667788");
  const [location, setLocation] = useState("Islamabad");
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 py-10">
      <PageHeading>Profile {">"} Edit Profile</PageHeading>
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-black/10 p-5 pt-10">
        <div className="relative flex w-fit items-center justify-center">
          <Image
            className="size-32 min-w-32 rounded-full"
            src="/static/dummy-user/3.jpeg"
            width={150}
            height={150}
            alt="user"
            quality={100}
            loading="lazy"
          />
          <div className="absolute bottom-1 right-2 grid size-7 place-items-center rounded-full border border-white bg-russianViolet">
            <PenLine className="size-4 text-white" />
          </div>
        </div>
        <span className="mt-2 text-2xl font-medium">Lorem</span>
        <span className="font-medium text-battleShipGray">
          Joined Jan, 2024
        </span>
        <div className="flex w-full flex-col gap-3 pt-14">
          <InputField
            icon={sellerProfileHouseIcon}
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />
          <InputField
            icon={profilePhoneIcon}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputField
            icon={envelopeIcon}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon={creditCardIcon}
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          />
          <InputField
            icon={sellerLocationIcon}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <RoundedButton
        title="Save"
        className="w-72"
        onClick={() => router.push("/seller/profile")}
      />
    </div>
  );
};

export default SellerProfileEditPage;
