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

const ChatPageClient = () => {
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
        (c) =>
          String(c.userA.id) === String(userId) ||
          String(c.userB.id) === String(userId),
      );

      if (!chat) {
        // Create a temporary chat object for new conversations
        // This allows the user to start typing before the chat is actually created
        const tempChat = {
          id: `temp_${userId}`, // Temporary ID
          userA: { id: currentUserId },
          userB: {
            id: userId,
            // Name and avatar will be populated when chat is created via socket
          },
          isTemporary: true, // Flag to indicate this is a temporary chat
          chatMeta: { messages: [] },
        };
        setSelectedChat(tempChat);
        setMessages([]);
        setLoadingMessages(false);
        return;
      }

      setSelectedChat(chat);
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
  }, [userId, conversations, currentUserId]);

  const handleSidebarSelect = (user) => {
    if (!user) return;
    router.push(`/buyer/chats?id=${user.id}`);
  };

  const sidebarUsers = conversations?.map((c) => {
    const otherUser =
      String(c.userA.id) === String(currentUserId) ? c.userB : c.userA;

    // Get the latest message from chatMeta.messages or c.messages
    let lastMsg = null;
    if (
      c.chatMeta?.messages &&
      Array.isArray(c.chatMeta.messages) &&
      c.chatMeta.messages.length > 0
    ) {
      // Sort by timestamp to get the latest message
      console.log(
        "🔍 [page.jsx] Using chatMeta.messages:",
        c.chatMeta.messages,
      );
      const sortedMessages = c.chatMeta.messages.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA; // Descending order (newest first)
      });
      console.log(
        "🔍 [page.jsx] Sorted chatMeta messages:",
        sortedMessages.map((m) => ({
          content: m.content,
          createdAt: m.createdAt,
        })),
      );
      lastMsg = sortedMessages[0];
      console.log("🔍 [page.jsx] Selected lastMsg from chatMeta:", lastMsg);
    } else if (Array.isArray(c.messages) && c.messages.length > 0) {
      // Fallback to c.messages and sort to get latest
      console.log("🔍 [page.jsx] Using c.messages:", c.messages);
      const sortedMessages = c.messages.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA; // Descending order (newest first)
      });
      console.log(
        "🔍 [page.jsx] Sorted c.messages:",
        sortedMessages.map((m) => ({
          content: m.content,
          createdAt: m.createdAt,
        })),
      );
      lastMsg = sortedMessages[0];
      console.log("🔍 [page.jsx] Selected lastMsg from c.messages:", lastMsg);
    }

    const lastSender = lastMsg?.sender;
    return {
      id: otherUser?.id,
      name: otherUser?.name || lastSender?.name,
      avatar: otherUser?.avatar || lastSender?.avatar,
      lastMessage: lastMsg?.content || "",
      lastMessageTime: lastMsg?.createdAt || "",
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
    <div className="grid min-h-[90vh] w-full max-w-[1172px] gap-3 py-5 md:grid-cols-[2fr_3fr] md:py-12 lg:gap-7">
      {loading ? (
        <ChatSidebarSkeleton />
      ) : (
        <ChatSidebar
          users={sidebarUsers}
          selectedUser={selectedChat}
          setSelectedUser={handleSidebarSelect}
          loading={loading}
          selectedUserId={userId}
          setUsers={setConversations}
        />
      )}
      {selectedChat || loading ? (
        loading ? (
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
        <div className="flex min-h-[300px] w-full items-center justify-center text-lg text-gray-400">
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

export default ChatPageClient;
