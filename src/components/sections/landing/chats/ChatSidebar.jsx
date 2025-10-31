"use client";
import { searchIconSmall } from "@/assets/icons/common-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { socketManager } from "@/lib/socket-client";
import { useProfileStore } from "@/providers/profile-store-provider";
import useTranslation from "@/hooks/useTranslation";

const ChatSidebar = ({
  users,
  selectedUser,
  setSelectedUser,
  loading,
  selectedUserId,
  setUsers, // Add this prop to update conversations
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const currentUserId = useProfileStore((s) => s.id);
  const filteredUsers = users.filter((user) =>
    (user.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  // Listen for real-time message updates
  useEffect(() => {
    if (!currentUserId || !setUsers) return;

    console.log("🔍 [ChatSidebar] Setting up socket listeners");

    // Listen for new messages to update sidebar
    const offReceiveMessage = socketManager.on("receive_message", (msg) => {
      console.log("🔍 [ChatSidebar] Received message via socket:", msg);
      const convId = msg.conversationId || msg.chatId;
      console.log("🔍 [ChatSidebar] Message conversationId:", convId);
      console.log("🔍 [ChatSidebar] Message senderId:", msg.senderId);

      // Update the conversations to reflect the new message
      setUsers((prevConversations) => {
        const updated = prevConversations.map((conversation) => {
          console.log(
            "🔍 [ChatSidebar] Checking conversation:",
            conversation.id,
          );
          console.log(
            "🔍 [ChatSidebar] Conversation userA:",
            conversation.userA?.id,
          );
          console.log(
            "🔍 [ChatSidebar] Conversation userB:",
            conversation.userB?.id,
          );

          // Check if this message belongs to this conversation
          // Match by conversationId first, then by participants
          const hasConvId = convId !== undefined && convId !== null;
          const isMatchingConversation = hasConvId
            ? String(conversation.id) === String(convId)
            : (String(conversation.userA?.id) === String(msg.senderId) &&
                String(conversation.userB?.id) === String(currentUserId)) ||
              (String(conversation.userB?.id) === String(msg.senderId) &&
                String(conversation.userA?.id) === String(currentUserId));

          if (isMatchingConversation) {
            console.log(
              "🔍 [ChatSidebar] Found matching conversation, updating last message",
            );

            // Get existing messages and add the new one
            const existingMessages = conversation.chatMeta?.messages || [];
            const updatedMessages = [...existingMessages, msg];

            // Sort messages by timestamp to get the latest
            const sortedMessages = updatedMessages.sort((a, b) => {
              const dateA = new Date(a.createdAt || 0);
              const dateB = new Date(b.createdAt || 0);
              return dateB - dateA; // Descending order (newest first)
            });

            console.log(
              "🔍 [ChatSidebar] All messages after sorting:",
              sortedMessages,
            );
            console.log(
              "🔍 [ChatSidebar] Message timestamps:",
              sortedMessages.map((m) => ({
                content: m.content,
                createdAt: m.createdAt,
              })),
            );

            // Get the latest message (first after sorting in descending order)
            const latestMessage = sortedMessages[0];
            console.log(
              "🔍 [ChatSidebar] Latest message selected:",
              latestMessage,
            );

            const isFromOtherUser =
              String(msg.senderId) !== String(currentUserId);
            // Simple: bump count on any incoming message from other user
            const nextUnread = isFromOtherUser
              ? (conversation.unreadCount || 0) + 1
              : conversation.unreadCount || 0;

            return {
              ...conversation,
              lastMessage: latestMessage.content,
              lastMessageTime: latestMessage.createdAt,
              // Update chatMeta with all messages
              chatMeta: {
                ...conversation.chatMeta,
                messages: updatedMessages,
              },
              unreadCount: nextUnread,
            };
          }
          return conversation;
        });

        console.log("🔍 [ChatSidebar] Updated conversations:", updated);
        return updated;
      });
    });

    // Listen for messages marked read to clear unread badge
    const offMarkedRead = socketManager.on(
      "messages_marked_read",
      ({ conversationId, userId }) => {
        // When this conversation gets read by either party, clear unread for this convo
        setUsers((prev) =>
          (prev || []).map((c) =>
            String(c.id) === String(conversationId)
              ? { ...c, unreadCount: 0 }
              : c,
          ),
        );
      },
    );

    // Periodic refresh as fallback (server doesn't broadcast to user room on new messages)
    const refresh = () => {
      try {
        socketManager.socket?.emit("get_conversations", {
          userId: currentUserId,
        });
      } catch (_) {}
    };
    const offConvoList = socketManager.on(
      "conversations_list",
      (convos = []) => {
        setUsers((prev) => {
          const prevById = new Map((prev || []).map((p) => [String(p.id), p]));
          // Preserve any live-unread bumps; don't overwrite with computed 0
          const mapped = (convos || []).map((c) => {
            const msgs = c.chatMeta?.messages || [];
            const computedUnread = msgs.filter(
              (m) => String(m.senderId) !== String(currentUserId) && !m.read,
            ).length;
            const existing = prevById.get(String(c.id));
            const preserved =
              existing && typeof existing.unreadCount === "number"
                ? existing.unreadCount
                : 0;
            const unreadCount = Math.max(preserved, computedUnread);
            return { ...c, unreadCount };
          });
          return mapped;
        });
      },
    );
    const intervalId = setInterval(refresh, 5000);
    refresh();

    // Cleanup on unmount
    return () => {
      console.log("🔍 [ChatSidebar] Cleaning up socket listeners");
      offReceiveMessage();
      offMarkedRead && offMarkedRead();
      offConvoList && offConvoList();
      clearInterval(intervalId);
    };
  }, [currentUserId, setUsers, selectedUserId]);
  return (
    <div className="hidden w-full flex-col rounded-[30px] border border-black/10 bg-[#F9F9F9] px-[20px] py-[30px] md:flex">
      <h1 className="border-b-[1.3px] border-[#F0F1F4] pb-[32px] text-center text-[23px] leading-[31px] text-delftBlue">
        {t("chat.conversations")}
      </h1>
      <div className="flex w-full flex-col gap-6 py-6">
        <div className="flex h-[61px] items-center gap-3 rounded-[8px] bg-white px-4">
          {searchIconSmall}
          <input
            type="text"
            name="searchChat"
            id="searchChat"
            className="w-full text-sm outline-none placeholder:text-[#858699]"
            placeholder={t("chat.search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col">
          {filteredUsers.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              {t("chat.no_chats")}
            </div>
          ) : (
            filteredUsers.map((user, index) => {
              const isSelected =
                String(user.chatMeta?.id || "") ===
                  String(selectedUserId || "") ||
                String(user.id || "") === String(selectedUserId || "");
              // Get the last message from the user object
              // The page.jsx already extracts lastMessage as a string
              const lastMessage = user.lastMessage;

              // Also try to get messages from chatMeta for debugging
              const messages = user.chatMeta?.messages || [];

              console.log(
                "🔍 [ChatSidebar] Full user object:",
                user,
                "Messages:",
                messages,
                "Last message:",
                lastMessage,
              );

              return (
                <div
                  key={user.id || index}
                  onClick={() => {
                    setSelectedUser(user);
                    // Clear unread badge when opening
                    if (setUsers && (user.id || user.chatMeta?.id)) {
                      setUsers((prev) =>
                        (prev || []).map((c) =>
                          String(c.id) === String(user.chatMeta?.id)
                            ? { ...c, unreadCount: 0 }
                            : c,
                        ),
                      );
                    }
                  }}
                  className={`flex w-full cursor-pointer items-start justify-between py-2 transition-all duration-200 ease-in hover:bg-black/10 ${isSelected ? "border-l-4 border-moonstone bg-moonstone/10" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-[60px] place-items-center overflow-hidden rounded-full bg-gray-100">
                      {user.image ||
                      user.userB?.avatar ||
                      user.userA?.avatar ? (
                        <Image
                          src={
                            user.image ||
                            user.userB?.avatar ||
                            user.userA?.avatar
                          }
                          width={100}
                          height={100}
                          alt={
                            user.name ||
                            user.userB?.name ||
                            user.userA?.name ||
                            "User"
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-[15px] font-medium leading-[26px] text-russianViolet">
                        {user.name ||
                          user.userB?.name ||
                          user.userA?.name ||
                          t("chat.user")}
                      </h1>
                      <p className="max-w-[200px] truncate pr-1 text-[13.17px] leading-[17.5px] text-[#595C75]">
                        {lastMessage ? (
                          <span className="font-medium text-moonstone">
                            {lastMessage}
                          </span>
                        ) : (
                          <span className="italic text-gray-400">
                            {t("chat.no_messages")}
                          </span>
                        )}
                      </p>
                      {user.unreadCount > 0 && (
                        <span className="grid min-w-5 place-items-center rounded-full bg-moonstone px-1.5 text-[11px] leading-[17.5px] text-white">
                          {user.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-nowrap text-[11px] leading-[17.5px] text-[#9799A8]">
                      {user.lastMessageTime
                        ? new Date(user.lastMessageTime).toLocaleString()
                        : ""}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
