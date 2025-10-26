"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatSidebar from "@/components/sections/landing/chats/ChatSidebar";
import ChatWindow from "@/components/sections/landing/chats/ChatWindow";
import { getConversations } from "@/lib/api/chat/getConversations";
import { getMessages } from "@/lib/api/chat/getMessages";
import { createChat } from "@/lib/api/chat/createChat";
import { useChatStore } from "@/providers/chat-store-provider";

const ChatPage = () => {
  const params = useParams();
  const userId = params.id;
  const conversations = useChatStore((s) => s.conversations);
  const setConversations = useChatStore((s) => s.setConversations);
  const selectedChat = useChatStore((s) => s.selectedChat);
  const setSelectedChat = useChatStore((s) => s.setSelectedChat);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchConvos = async () => {
      setLoading(true);
      try {
        const data = await getConversations();
        setConversations(data);
        // Try to find the chat with userId
        let chat = data.find(
          (c) => c.userAId === userId || c.userBId === userId,
        );
        if (!chat && userId) {
          // If not found, create it
          try {
            chat = await createChat(userId);
            // Refetch conversations to include the new chat
            const updated = await getConversations();
            setConversations(updated);
            chat = updated.find(
              (c) => c.userAId === userId || c.userBId === userId,
            );
          } catch (e) {
            chat = null;
          }
        }
        setSelectedChat(chat || null);
      } catch (e) {
        setConversations([]);
        setSelectedChat(null);
      }
      setLoading(false);
    };
    fetchConvos();
    // eslint-disable-next-line
  }, [userId]);

  // Function to sort messages by timestamp
  const sortMessages = (messages) => {
    return messages.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateA - dateB; // Ascending order (oldest to newest)
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat && selectedChat.id) {
        setLoadingMessages(true);
        try {
          const msgs = await getMessages(selectedChat.id);
          // Sort messages by createdAt timestamp (oldest first, newest last)
          const sortedMessages = sortMessages(msgs);
          setMessages(sortedMessages);
        } catch (error) {
          setMessages([]);
        } finally {
          setLoadingMessages(false);
        }
      } else {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  return (
    <div className="grid min-h-[90vh] w-full max-w-[1172px] gap-3 py-5 md:grid-cols-[2fr_3fr] md:py-12 lg:gap-7">
      <ChatSidebar
        users={conversations}
        selectedUser={selectedChat}
        setSelectedUser={(user) => {
          setSelectedChat(user);
          if (user && (user.userAId || user.userBId)) {
            const otherId =
              user.userAId === userId ? user.userBId : user.userAId;
            router.push(`/buyer/chats/${otherId}`);
          }
        }}
        loading={loading}
      />
      <ChatWindow
        selectedUser={selectedChat}
        setSelectedUser={setSelectedChat}
        users={conversations}
        setUsers={setConversations}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        messages={messages}
        setMessages={setMessages}
        loading={loadingMessages}
      />
    </div>
  );
};

export default ChatPage;
