import { Suspense } from "react";
import ChatPageClient from "./ChatPageClient";

const ChatPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageClient />
    </Suspense>
  );
};

export default ChatPage;