"use client";
import PageHeading from "@/components/headings/PageHeading";
import { ChatStoreProvider } from "@/providers/chat-store-provider";
import useTranslation from "@/hooks/useTranslation";

const ChatLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center px-3">
      <PageHeading>{t("nav.seller.chats")}</PageHeading>
      <ChatStoreProvider>{children}</ChatStoreProvider>
    </div>
  );
};

export default ChatLayout;
