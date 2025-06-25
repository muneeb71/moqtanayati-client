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

const SOCKET_URL = "http://localhost:8000";

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
  const socketRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    getConversations()
      .then(setConversations)
      .catch(() => setConversations([]))
      .finally(() => setLoading(false));
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
          const updated = await getConversations();
          setConversations(updated);
          chat = updated.find(
            (c) => String(c.userA.id) === String(userId) || String(c.userB.id) === String(userId)
          );
        } catch (e) {
          chat = null;
        }
      }
      setSelectedChat(chat || null);
      if (chat && chat.id) {
        getMessages(userId)
          .then((msgs) => setMessages(msgs))
          .catch(() => setMessages([]))
          .finally(() => setLoadingMessages(false));
      } else {
        setMessages([]);
        setLoadingMessages(false);
      }
    };
    fetchChatAndMessages();
    // eslint-disable-next-line
  }, [userId]);

  // SOCKET.IO LOGIC
  useEffect(() => {
    if (!currentUserId) return;
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, { query: { userId: currentUserId } });
    }
    const socket = socketRef.current;
    
    const handleNewMessage = (msg) => {
      // Only add message if it belongs to the currently selected chat
      if (msg.chatId === selectedChat?.id) {
        setMessages((prev) => {
          if (prev.find((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }
      // Also update latest message in sidebar
      setConversations(prevConvos => {
        return prevConvos.map(convo => {
          if (convo.id === msg.chatId) {
            return {
              ...convo,
              messages: [msg]
            }
          }
          return convo;
        })
      })
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
    console.log("Joined room:", selectedChat.id);

    return () => {
      socket.emit("leave_conversation", { conversationId: selectedChat.id });
      console.log("Left room:", selectedChat.id);
    }
  }, [selectedChat?.id])

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
    router.push(`/seller/chats?id=${user.id}`);
  };

  const sidebarUsers = conversations.map((c) => {
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
      <ChatSidebar
        users={sidebarUsers}
        selectedUser={selectedChat}
        setSelectedUser={handleSidebarSelect}
        loading={loading}
        selectedUserId={userId}
      />
      {selectedChat ? (
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
