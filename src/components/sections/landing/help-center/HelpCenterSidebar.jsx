"use client";
import useTranslation from "@/hooks/useTranslation";

const HelpCenterSidebar = () => {
  const { t } = useTranslation();
  return <div>{t("seller.help_center.sidebar_title")}</div>;
};

export default HelpCenterSidebar;
