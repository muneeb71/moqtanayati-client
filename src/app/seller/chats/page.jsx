import { Suspense } from "react";
import SellerChatPageClient from "./SellerChatPageClient";

const ChatPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellerChatPageClient />
    </Suspense>
  );
};

export default ChatPage;