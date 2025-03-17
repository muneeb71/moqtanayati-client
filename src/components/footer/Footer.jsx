import { appName } from "@/lib/app-name";
import {
  legalAndPoliciesLinks,
  platformInformationLinks,
  socialLinks,
  userFeatureLinks,
} from "@/lib/links";
import Link from "next/link";
import FooterLink from "../link/FooterLink";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center px-2 py-2 md:py-5">
      <div className="flex w-full max-w-[86rem] flex-col items-center justify-center rounded-[20px] bg-russianViolet py-20 text-[#F9FAFB] md:rounded-[32px]">
        <div className="grid w-full max-w-7xl gap-10 px-5 md:grid-cols-4">
          <div className="flex h-full flex-col justify-between gap-10">
            <h1 className="text-[22px] lowercase text-white">{appName}.com</h1>
            <div className="grid w-fit grid-cols-3 gap-4">
              {socialLinks.map((socialLink, index) => (
                <Link
                  key={index}
                  className="text-[#A3A3A3] transition-all duration-200 ease-in hover:text-white"
                  href={socialLink.href}
                >
                  {socialLink.icon}
                </Link>
              ))}
            </div>
          </div>
          <FooterCard title="User Features" links={userFeatureLinks} />
          <FooterCard
            title="Legal And Policies"
            links={legalAndPoliciesLinks}
          />
          <FooterCard
            title="Platform Information"
            links={platformInformationLinks}
          />
        </div>
      </div>
    </footer>
  );
};

const FooterCard = ({ title = "", links = [{ title: "", href: "" }] }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-1 md:text-lg font-semibold uppercase">
        {title}
      </h1>
      {links.map((link, index) => (
        <FooterLink
          href={link.href}
          key={index}
          className="text-sm md:text-base"
        >
          {link.title}
        </FooterLink>
      ))}
    </div>
  );
};

export default Footer;
