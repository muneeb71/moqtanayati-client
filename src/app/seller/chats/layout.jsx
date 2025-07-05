import PageHeading from "@/components/headings/PageHeading";
import { ChatStoreProvider } from "@/providers/chat-store-provider";

const ChatLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center px-3">
      <PageHeading>Chats</PageHeading>
      <ChatStoreProvider>{children}</ChatStoreProvider>
    </div>
  );
};

export default ChatLayout;
