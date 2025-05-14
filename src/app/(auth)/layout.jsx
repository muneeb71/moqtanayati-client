"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const socials = [
  {
    Icon: "/auth/insta.svg",
    alt: "Instagram",
    href: "https://instagram.com",
  },
  {
    Icon: "/auth/whatsapp.png",
    alt: "WhatsApp",
    href: "https://wa.me",
  },
  {
    Icon: "/auth/tiktok.png",
    alt: "TikTok",
    href: "https://tiktok.com",
  },
];

const AuthLayout = ({ children }) => {
  const pathname = usePathname();

  const showSocials =
    pathname?.startsWith("/survey") ||
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/completion");

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[#FFFFFE]">
      <div className="absolute top-0 z-10 flex h-screen w-full flex-col items-start justify-between px-10 py-10">
        <Image
          src="/logo.png"
          width={161}
          height={81}
          loading="eager"
          alt="Logo"
          quality={100}
          className="rounded-[10px]"
        />
        {showSocials && (
          <div>
            Connect with Socials<br />
            <div className="mt-4 flex gap-6">
              {socials.map(({ Icon, alt, href }) => (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={alt}
                  className="text-moonstone transition-transform hover:scale-110"
                >
                  <img src={Icon} width={20} height={20} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="z-20 mt-[115px] flex w-full max-w-[450px] flex-col px-5 py-10 md:mt-0">
        {children}
      </div>

      <div className="absolute left-0 top-0 z-[1]">
        <Image
          src="/bg/blob.svg"
          width={500}
          height={500}
          alt="blob"
          loading="eager"
        />
      </div>

      <div className="absolute right-0 z-[1] hidden h-screen w-full max-w-[457px] items-end justify-end bg-[#D3EDF0] xl:flex">
        <Image
          src="/newlogo.svg"
          width={712}
          height={712}
          loading="lazy"
          alt="Logo"
          quality={100}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
