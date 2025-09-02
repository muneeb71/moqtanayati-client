"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RoleSelectionLoginPage = () => {
  const roles = ["buyer", "seller"];
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();
  return (
    <div className="flex w-full flex-col justify-center gap-10 pb-10 pt-28 md:gap-[66px]">
      <div className="flex w-full flex-col gap-1">
        <h1 className="text-xl font-medium leading-[36px] md:text-2xl">
          Are you here to buy or sell?
        </h1>
        <span className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
          Choose your role to get the most tailored experience.
        </span>
      </div>
      <div className="grid w-full grid-cols-2 gap-5">
        {roles.map((role, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedRole(role);
              console.log("selected role : ", role);
            }}
            className={cn(
              "relative flex min-h-[280px] w-full flex-col items-center justify-between gap-3 rounded-[24px] border-[1.8px] bg-white pb-5 pt-10",
              "hover:border-moonstone",
              selectedRole === role ? "border-moonstone" : "border-white",
            )}
            style={{
              boxShadow: "0px 0px 30px 2.4px #0000001A",
            }}
          >
            {selectedRole === role && (
              <div className="absolute left-2.5 top-2.5">{selectSvg}</div>
            )}
            <Image
              src={
                role === "buyer"
                  ? "/static/auth/buyer.svg"
                  : "/static/auth/seller.svg"
              }
              quality={100}
              width={164}
              height={164}
              loading="lazy"
              alt="Buyer"
            />
            <span className="text-[24px]">
              {role === "buyer" ? "Buyer" : "Seller"}
            </span>
          </button>
        ))}
      </div>
      <RoundedButton
        title={selectedRole === "" ? "Continue" : "Continue as " + selectedRole}
        className="min-w-[294px] self-center"
        showIcon
        disabled={selectedRole === ""}
        onClick={() => router.push(selectedRole + "/login")}
      />
    </div>
  );
};

const selectSvg = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6016 0.899902C6.61206 0.899902 0.101562 7.4104 0.101562 15.3999C0.101562 23.3894 6.61206 29.8999 14.6016 29.8999C22.5911 29.8999 29.1016 23.3894 29.1016 15.3999C29.1016 7.4104 22.5911 0.899902 14.6016 0.899902ZM21.5326 12.0649L13.3111 20.2864C13.1081 20.4894 12.8326 20.6054 12.5426 20.6054C12.2526 20.6054 11.9771 20.4894 11.7741 20.2864L7.67056 16.1829C7.25006 15.7624 7.25006 15.0664 7.67056 14.6459C8.09106 14.2254 8.78706 14.2254 9.20756 14.6459L12.5426 17.9809L19.9956 10.5279C20.4161 10.1074 21.1121 10.1074 21.5326 10.5279C21.9531 10.9484 21.9531 11.6299 21.5326 12.0649Z"
      fill="#25A5B4"
    />
  </svg>
);

export default RoleSelectionLoginPage;
