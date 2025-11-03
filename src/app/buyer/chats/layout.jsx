"use client";

import PageHeading from "@/components/headings/PageHeading";
import useTranslation from "@/hooks/useTranslation";

const ChatLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center px-3">
      <PageHeading>{t("nav.buyer.chats")}</PageHeading>
      {children}
    </div>
  );
};

export default ChatLayout;
