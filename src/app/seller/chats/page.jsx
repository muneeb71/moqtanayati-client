"use client";

import { useEffect, useState, Suspense } from "react";
import useTranslation from "@/hooks/useTranslation";
import { useRouter, useSearchParams } from "next/navigation";
import ChatSidebar from "@/components/sections/landing/chats/ChatSidebar";
import ChatWindow from "@/components/sections/landing/chats/ChatWindow";
import ChatUsersSheet from "@/components/sections/landing/chats/ChatUsersSheet";
import { getConversations } from "@/lib/api/chat/getConversations";
import { getMessages } from "@/lib/api/chat/getMessages";
import { createChat } from "@/lib/api/chat/createChat";
import { useProfileStore } from "@/providers/profile-store-provider";
import { socketManager } from "@/lib/socket-client";
import ChatSidebarSkeleton from "@/components/loaders/chats/ChatSidebarSkeleton";
import ChatWindowSkeleton from "@/components/loaders/chats/ChatWindowSkeleton";


const ChatPageContent = () => {
  const { t } = useTranslation();
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
          String(c.userB.id) === String(selectedUserId),
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
              String(c.userB.id) === String(selectedUserId),
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

  // SOCKET.IO LOGIC using socketManager
  useEffect(() => {
    if (!currentUserId) return;

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

    const offReceiveMessage = socketManager.on(
      "receive_message",
      handleNewMessage,
    );

    return () => {
      offReceiveMessage();
    };
  }, [currentUserId, selectedChat?.id]);

  // Join/Leave rooms when chat selection changes
  useEffect(() => {
    if (!selectedChat?.id) return;

    socketManager.socket?.emit("join_conversation", {
      conversationId: selectedChat.id,
    });

    return () => {
      socketManager.socket?.emit("leave_conversation", {
        conversationId: selectedChat.id,
      });
    };
  }, [selectedChat?.id]);

  const handleSidebarSelect = (user) => {
    if (!user) return;
    setSelectedUserId(user.id);
    // Find the chat object for this user
    const chat = conversations.find(
      (c) =>
        String(c.userA.id) === String(user.id) ||
        String(c.userB.id) === String(user.id),
    );
    if (chat) {
      setSelectedChat(chat);
    }
    router.push(`/seller/chats?id=${user.id}`);
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
      const sortedMessages = c.chatMeta.messages.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA; // Descending order (newest first)
      });
      lastMsg = sortedMessages[0];
    } else if (Array.isArray(c.messages) && c.messages.length > 0) {
      // Fallback to c.messages and sort to get latest
      const sortedMessages = c.messages.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA; // Descending order (newest first)
      });
      lastMsg = sortedMessages[0];
    }

    return {
      id: otherUser.id,
      name: otherUser.name,
      avatar: otherUser.avatar,
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
          selectedUserId={selectedUserId}
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
            userBId={selectedUserId}
            setMessages={setMessages}
          />
        )
      ) : (
        <div className="flex min-h-[300px] w-full items-center justify-center text-lg text-gray-400">
          {t("chat.no_chat_selected")}
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

const ChatPage = () => {
  return (
    <Suspense fallback={
      <div className="grid min-h-[90vh] w-full max-w-[1172px] gap-3 py-5 md:grid-cols-[2fr_3fr] md:py-12 lg:gap-7">
        <ChatSidebarSkeleton />
        <ChatWindowSkeleton />
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  );
};

export default ChatPage;