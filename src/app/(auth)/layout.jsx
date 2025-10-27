"use client";

import { RegisterStoreProvider } from "@/providers/register-provider";
import Image from "next/image";
import SafeImage from "@/components/ui/SafeImage";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex h-full w-full justify-center bg-[#FFFFFE]">
      <div className="absolute top-0 z-10 flex w-full flex-col items-start justify-between px-10 py-10">
        <Image
          src="/static/logo.png"
          width={161}
          height={81}
          loading="eager"
          alt="Logo"
          quality={100}
          className="rounded-[10px]"
          style={{ width: "auto", height: "auto" }}
          onError={(e) => {
            console.error("Logo image failed to load:", e);
            e.target.style.display = "none";
          }}
          priority
        />
      </div>
      <div className="no-scrollbar z-20 flex h-full min-h-screen w-full max-w-[450px] flex-col justify-center overflow-auto px-5 py-10">
        <RegisterStoreProvider>{children}</RegisterStoreProvider>
      </div>

      <div className="absolute left-0 top-0 z-[1]">
        <Image
          src="/static/bg/blob.svg"
          width={500}
          height={500}
          alt="blob"
          loading="eager"
          style={{ width: "auto", height: "auto" }}
          onError={(e) => {
            console.error("Blob background image failed to load:", e);
            e.target.style.display = "none";
          }}
        />
      </div>

      <div className="absolute right-0 z-[1] hidden h-screen w-full max-w-[457px] items-end justify-end bg-[#D3EDF0] xl:flex">
        <Image
          src="/static/bg/login.svg"
          width={712}
          height={712}
          loading="lazy"
          alt="Login background"
          quality={100}
          onError={(e) => {
            console.error("Login background image failed to load:", e);
            e.target.style.display = "none";
          }}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
