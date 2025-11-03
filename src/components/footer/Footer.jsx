"use client";
import { appName } from "@/lib/app-name";
import {
  legalAndPoliciesLinks,
  platformInformationLinks,
  socialLinks,
  userFeatureLinks,
} from "@/lib/links";
import Link from "next/link";
import FooterLink from "../link/FooterLink";
import useTranslation from "@/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();
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
          <FooterCard
            title={t("footer.user_features")}
            links={userFeatureLinks}
          />
          <FooterCard
            title={t("footer.legal_policies")}
            links={legalAndPoliciesLinks}
          />
          <FooterCard
            title={t("footer.platform_info")}
            links={platformInformationLinks}
          />
        </div>
      </div>
    </footer>
  );
};

const FooterCard = ({
  title = "",
  links = [{ title: "", href: "", i18nKey: undefined }],
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-1 font-semibold uppercase md:text-lg">{title}</h1>
      {links.map((link, index) => (
        <FooterLink
          href={link.href}
          key={index}
          className="text-sm md:text-base"
        >
          {link.i18nKey ? t(link.i18nKey) : link.title}
        </FooterLink>
      ))}
    </div>
  );
};

export default Footer;
