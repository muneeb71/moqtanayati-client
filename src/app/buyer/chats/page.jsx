"use client";

import { useState } from "react";
import ChatSidebar from "@/components/sections/landing/chats/ChatSidebar";
import ChatWindow from "@/components/sections/landing/chats/ChatWindow";
import { dummyChats } from "@/lib/chats";

const ChatPage = () => {
  const [users, setUsers] = useState(dummyChats);
  const [selectedChat, setSelectedChat] = useState(users[0]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="grid min-h-[90vh] w-full max-w-[1172px] md:grid-cols-[2fr_3fr] gap-3 lg:gap-7 py-5 md:py-12">
      <ChatSidebar
        users={users}
        selectedUser={selectedChat}
        setSelectedUser={setSelectedChat}
      />
      <ChatWindow
        selectedUser={selectedChat}
        setSelectedUser={setSelectedChat}
        users={users}
        setUsers={setUsers}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
};

export default ChatPage;
