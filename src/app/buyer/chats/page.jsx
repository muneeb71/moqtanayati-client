"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatSidebar from "@/components/sections/landing/chats/ChatSidebar";
import ChatWindow from "@/components/sections/landing/chats/ChatWindow";
import { getConversations } from "@/lib/api/chat/getConversations";
import { getMessages } from "@/lib/api/chat/getMessages";
import { createChat } from "@/lib/api/chat/createChat";
import ChatUsersSheet from "@/components/sections/landing/chats/ChatUsersSheet";
import { useProfileStore } from "@/providers/profile-store-provider";
import ChatSidebarSkeleton from "@/components/loaders/chats/ChatSidebarSkeleton";
import ChatWindowSkeleton from "@/components/loaders/chats/ChatWindowSkeleton";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const currentUserId = useProfileStore((s) => s.id);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchConvos = async () => {
      setLoading(true);
      try {
        const res = await getConversations();
        setConversations(res?.data || []);
      } catch (e) {
        setConversations([]);
      }
      setLoading(false);
    };
    fetchConvos();
  }, []);

  useEffect(() => {
    const fetchChatAndMessages = async () => {
      if (!userId) {
        setSelectedChat(null);
        setMessages([]);
        return;
      }
      setLoadingMessages(true);
      let chat = conversations.find(
        (c) => String(c.userA.id) === String(userId) || String(c.userB.id) === String(userId)
      );
      if (!chat) {
        try {
          await createChat(userId);
          const updatedRes = await getConversations();
          const updatedConversations = updatedRes?.data || [];
          setConversations(updatedConversations);
          chat = updatedConversations.find(
            (c) => String(c.userA.id) === String(userId) || String(c.userB.id) === String(userId)
          );
        } catch (e) {
          chat = null;
        }
      }
      setSelectedChat(chat || null);
      if (chat && chat.id) {
        getMessages(userId)
          .then((res) => setMessages(res?.data || []))
          .catch(() => setMessages([]))
          .finally(() => setLoadingMessages(false));
      } else {
        setMessages([]);
        setLoadingMessages(false);
      }
    };
    fetchChatAndMessages();
    // eslint-disable-next-line
  }, [userId, conversations]);

  const handleSidebarSelect = (user) => {
    if (!user) return;
    router.push(`/buyer/chats?id=${user.id}`);
  };

  const sidebarUsers = conversations?.map((c) => {
    const otherUser = String(c.userA.id) === String(currentUserId) ? c.userB : c.userA;
    return {
      id: otherUser.id,
      name: otherUser.name,
      avatar: otherUser.avatar,
      lastMessage: c.messages?.[0]?.content || "",
      lastMessageTime: c.messages?.[0]?.createdAt || "",
      chatMeta: c,
    };
  });

  const mappedMessages = messages.map((msg) => ({
    id: msg.id,
    content: msg.content,
    createdAt: msg.createdAt,
    sender: {
      id: msg.sender?.id,
      name: msg.sender?.name,
      avatar: msg.sender?.avatar,
    },
    senderId: msg.senderId,
  }));
    
  return (
    <div className="grid min-h-[90vh] w-full max-w-[1172px] md:grid-cols-[2fr_3fr] gap-3 lg:gap-7 py-5 md:py-12">
      {loading ? (
        <ChatSidebarSkeleton />
      ) : (
        <ChatSidebar
          users={sidebarUsers}
          selectedUser={selectedChat}
          setSelectedUser={handleSidebarSelect}
          loading={loading}
          selectedUserId={userId}
        />
      )}
      {selectedChat || loading ? (
        loadingMessages || loading ? (
          <ChatWindowSkeleton />
        ) : (
          <ChatWindow
            selectedUser={selectedChat}
            setSelectedUser={setSelectedChat}
            users={conversations}
            setUsers={setConversations}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            messages={mappedMessages}
            loading={loadingMessages}
            userBId={userId}
            setMessages={setMessages}
          />
        )
      ) : (
        <div className="flex w-full items-center justify-center text-gray-400 text-lg min-h-[300px]">
          No chat selected
        </div>
      )}
      {/* Mobile user sheet */}
      <div className="md:hidden">
        <ChatUsersSheet
          users={sidebarUsers}
          setSelectedUser={handleSidebarSelect}
          selectedUser={selectedChat}
        />
      </div>
    </div>
  );
};

export default ChatPage;
