"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatSidebar from "@/components/sections/landing/chats/ChatSidebar";
import ChatWindow from "@/components/sections/landing/chats/ChatWindow";
import ChatUsersSheet from "@/components/sections/landing/chats/ChatUsersSheet";
import { getConversations } from "@/lib/api/chat/getConversations";
import { getMessages } from "@/lib/api/chat/getMessages";
import { createChat } from "@/lib/api/chat/createChat";
import { useProfileStore } from "@/providers/profile-store-provider";
import { io } from "socket.io-client";
import ChatSidebarSkeleton from "@/components/loaders/chats/ChatSidebarSkeleton";
import ChatWindowSkeleton from "@/components/loaders/chats/ChatWindowSkeleton";

const SOCKET_URL = "http://localhost:5000";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const userIdFromParams = searchParams.get("id");
  const currentUserId = useProfileStore((s) => s.id);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();
  const socketRef = useRef(null);
  const [selectedUserId, setSelectedUserId] = useState(userIdFromParams);

  useEffect(() => {
    setLoading(true);
    getConversations()
      .then((res) => {
        setConversations(res?.data || []);
      })
      .catch(() => setConversations([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSelectedUserId(userIdFromParams);
  }, [userIdFromParams]);

  useEffect(() => {
    const fetchChatAndMessages = async () => {
      if (!selectedUserId) {
        setSelectedChat(null);
        setMessages([]);
        return;
      }
      setLoadingMessages(true);
      let chat = conversations.find(
        (c) =>
          String(c.userA.id) === String(selectedUserId) ||
          String(c.userB.id) === String(selectedUserId)
      );
      if (!chat) {
        try {
          await createChat(selectedUserId);
          const updatedRes = await getConversations();
          const updatedConversations = updatedRes?.data || [];
          setConversations(updatedConversations);
          chat = updatedConversations.find(
            (c) =>
              String(c.userA.id) === String(selectedUserId) ||
              String(c.userB.id) === String(selectedUserId)
          );
        } catch (e) {
          chat = null;
        }
      }
      setSelectedChat(chat || null);
      if (chat && chat.id) {
        getMessages(selectedUserId)
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
  }, [selectedUserId, conversations]);

  // SOCKET.IO LOGIC
  useEffect(() => {
    if (!currentUserId) return;
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, { query: { userId: currentUserId } });
    }
    const socket = socketRef.current;
    
    const handleNewMessage = (msg) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
      setConversations((prevConvos) => {
        return prevConvos.map((convo) => {
          if (convo.id === msg.chatId) {
            return {
              ...convo,
              messages: [msg],
            };
          }
          return convo;
        });
      });
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [currentUserId, selectedChat?.id]);

  // Join/Leave rooms when chat selection changes
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !selectedChat?.id) return;

    socket.emit("join_conversation", { conversationId: selectedChat.id });

    return () => {
      socket.emit("leave_conversation", { conversationId: selectedChat.id });
    };
  }, [selectedChat?.id]);

  // Disconnect socket on unmount
  useEffect(() => {
    const socket = socketRef.current;
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleSidebarSelect = (user) => {
    if (!user) return;
    setSelectedUserId(user.id);
    router.push(`/seller/chats?id=${user.id}`);
  };

  const sidebarUsers = conversations?.map((c) => {
    const otherUser =
      String(c.userA.id) === String(currentUserId) ? c.userB : c.userA;
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
    <div className="grid min-h-[90vh] w-full max-w-[1172px] gap-3 py-5 md:grid-cols-[2fr_3fr] md:py-12 lg:gap-7">
      {loading ? (
        <ChatSidebarSkeleton />
      ) : (
        <ChatSidebar
          users={sidebarUsers}
          selectedUser={selectedChat}
          setSelectedUser={handleSidebarSelect}
          loading={loading}
          selectedUserId={selectedUserId}
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
            userBId={selectedUserId}
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

export default ChatPage;
