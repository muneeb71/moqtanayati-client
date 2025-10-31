import {
  sendIcon,
  deliverIcon,
  pinIcon,
  micIcon,
} from "@/assets/icons/chat-icons";
import { threeDotsIcon } from "@/assets/icons/common-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";
import ChatUsersSheet from "./ChatUsersSheet";
import { useState, useEffect, useRef } from "react";
import { useProfileStore } from "@/providers/profile-store-provider";
import { socketManager } from "@/lib/socket-client";

const ChatWindow = ({
  selectedUser,
  setSelectedUser,
  users,
  setUsers,
  newMessage,
  setNewMessage,
  messages = [],
  loading = false,
  userBId,
  setMessages,
}) => {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [sendingMessageId, setSendingMessageId] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [otherTyping, setOtherTyping] = useState({
    isTyping: false,
    userName: "",
  });
  const currentUserId = useProfileStore((s) => s.id);
  const currentUserAvatar = useProfileStore((s) => s.avatar);
  const messagesContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const lastAttemptedMessageRef = useRef("");

  // Determine the other user (the one being chatted with)
  let otherUser = null;
  if (selectedUser) {
    if (selectedUser.userA && selectedUser.userB) {
      otherUser =
        String(selectedUser.userA.id) === String(currentUserId)
          ? selectedUser.userB
          : selectedUser.userA;
    } else {
      // fallback for mapped sidebar user object
      otherUser = selectedUser;
    }
  }
  // Fallback: derive other user's display info from messages if missing
  if (messages && messages.length) {
    const firstOtherMsg = messages.find(
      (m) => String(m.senderId) !== String(currentUserId) && m.sender,
    );
    if (firstOtherMsg?.sender) {
      otherUser = {
        ...(otherUser || {}),
        name: otherUser?.name || firstOtherMsg.sender.name,
        avatar: otherUser?.avatar || firstOtherMsg.sender.avatar,
      };
    }
  }

  console.log("🔍 [ChatWindow] otherUser:", otherUser);
  console.log("🔍 [ChatWindow] selectedUser:", selectedUser);

  const firstNonEmpty = (...values) => {
    for (const v of values) {
      if (typeof v === "string" && v.trim().length > 0) return v;
    }
    return null;
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log("🔍 [ChatWindow] Socket useEffect triggered");
    console.log("🔍 [ChatWindow] currentUserId:", currentUserId);
    console.log("🔍 [ChatWindow] selectedUser:", selectedUser);

    if (!currentUserId || !selectedUser?.id) {
      console.log("🔍 [ChatWindow] Missing currentUserId or selectedUser.id");
      return;
    }

    let unsubscribe = () => {};

    const initializeSocket = async () => {
      try {
        console.log("🔍 [ChatWindow] Connecting to socket...");
        await socketManager.connect();
        setSocketConnected(true);
        setConnectionError(null);

        // Join conversation (only for real chats, not temporary ones)
        if (!selectedUser.isTemporary) {
          console.log("🔍 [ChatWindow] Joining conversation:", selectedUser.id);
          socketManager.socket?.emit("join_conversation", {
            conversationId: selectedUser.id,
          });

          // Mark messages as read when opening the conversation
          try {
            socketManager.socket?.emit("mark_messages_read", {
              conversationId: selectedUser.id,
              userId: currentUserId,
            });
            // Optimistically mark as read locally for messages from other user
            setMessages((prev) =>
              (prev || []).map((m) =>
                String(m.senderId) !== String(currentUserId)
                  ? { ...m, read: true }
                  : m,
              ),
            );
          } catch (_) {}
        } else {
          console.log(
            "🔍 [ChatWindow] Skipping join_conversation for temporary chat",
          );
        }

        // Listen for messages
        const offReceiveMessage = socketManager.on("receive_message", (msg) => {
          console.log("🔍 [ChatWindow] Received message via socket:", msg);
          console.log("🔍 [ChatWindow] Incoming msg read:", msg?.read);
          console.log("🔍 [ChatWindow] Current sending state:", sending);
          console.log("🔍 [ChatWindow] Message senderId:", msg.senderId);
          console.log("🔍 [ChatWindow] Current userId:", currentUserId);

          // Enrich sender object to ensure correct avatar/name
          try {
            if (!msg.sender || !msg.sender.avatar || !msg.sender.name) {
              const a = selectedUser?.userA;
              const b = selectedUser?.userB;
              if (a && String(msg.senderId) === String(a.id)) {
                msg.sender = {
                  id: a.id,
                  name: a.name || msg.sender?.name,
                  avatar: a.avatar || msg.sender?.avatar,
                };
              } else if (b && String(msg.senderId) === String(b.id)) {
                msg.sender = {
                  id: b.id,
                  name: b.name || msg.sender?.name,
                  avatar: b.avatar || msg.sender?.avatar,
                };
              }
            }
          } catch (_) {}

          setMessages((prev) => {
            // Check if message already exists (avoid duplicates)
            if (prev.find((m) => m.id === msg.id)) {
              console.log("🔍 [ChatWindow] Message already exists, skipping");
              return prev;
            }

            // Remove optimistic temp message for the same content/sender (if any)
            const withoutTemp = prev.filter((m) => {
              const isTemp =
                typeof m.id === "string" && m.id.startsWith("temp_");
              if (!isTemp) return true;
              const sameSender = String(m.senderId) === String(msg.senderId);
              const sameContent = m.content === msg.content;
              return !(sameSender && sameContent);
            });

            console.log("🔍 [ChatWindow] Adding new message to chat");
            const newMessages = [...withoutTemp, { ...msg, read: !!msg.read }];
            // Sort messages by timestamp to maintain chronological order
            return newMessages.sort((a, b) => {
              const dateA = new Date(a.createdAt || 0);
              const dateB = new Date(b.createdAt || 0);
              return dateA - dateB; // Ascending order (oldest to newest)
            });
          });

          // If the message is from the other user and this conversation is open, mark read
          try {
            if (
              String(msg.senderId) !== String(currentUserId) &&
              selectedUser &&
              !selectedUser.isTemporary
            ) {
              socketManager.socket?.emit("mark_messages_read", {
                conversationId: selectedUser.id,
                userId: currentUserId,
              });
              // Optimistically flag the incoming message as read
              setMessages((prev) =>
                (prev || []).map((m) =>
                  m.id === msg.id ? { ...m, read: true } : m,
                ),
              );
            }
          } catch (_) {}

          // Update conversations array to reflect the new message in sidebar
          if (setUsers && selectedUser) {
            console.log(
              "🔍 [ChatWindow] Updating conversations for message:",
              msg,
            );
            console.log("🔍 [ChatWindow] selectedUser.id:", selectedUser.id);
            console.log("🔍 [ChatWindow] setUsers function:", typeof setUsers);

            setUsers((prevConversations) => {
              console.log(
                "🔍 [ChatWindow] Previous conversations:",
                prevConversations,
              );
              const updated = prevConversations.map((conversation) => {
                console.log(
                  "🔍 [ChatWindow] Checking conversation:",
                  conversation.id,
                  "vs",
                  selectedUser.id,
                );
                console.log(
                  "🔍 [ChatWindow] Conversation structure:",
                  conversation,
                );
                if (conversation.id === selectedUser.id) {
                  console.log(
                    "🔍 [ChatWindow] Found matching conversation, updating messages",
                  );
                  console.log(
                    "🔍 [ChatWindow] Current chatMeta:",
                    conversation.chatMeta,
                  );
                  // Update the chatMeta.messages array for this conversation
                  const currentMessages = conversation.chatMeta?.messages || [];
                  console.log(
                    "🔍 [ChatWindow] Current messages:",
                    currentMessages,
                  );
                  const updatedMessages = [...currentMessages, msg];
                  console.log(
                    "🔍 [ChatWindow] Updated messages:",
                    updatedMessages,
                  );
                  const updatedConversation = {
                    ...conversation,
                    chatMeta: {
                      ...conversation.chatMeta,
                      messages: updatedMessages,
                    },
                  };
                  console.log(
                    "🔍 [ChatWindow] Updated conversation:",
                    updatedConversation,
                  );
                  return updatedConversation;
                }
                return conversation;
              });
              console.log("🔍 [ChatWindow] Updated conversations:", updated);
              return updated;
            });
          } else {
            console.log(
              "🔍 [ChatWindow] Cannot update conversations - setUsers:",
              !!setUsers,
              "selectedUser:",
              !!selectedUser,
            );
          }

          // Stop loading if this is a message from the current user
          if (msg.senderId === currentUserId) {
            console.log(
              "🔍 [ChatWindow] Stopping loading - message from current user",
            );
            setSending(false);
            setSendingMessageId(null);
          }
        });

        // Listen for chat errors
        const offChatError = socketManager.on("chat_error", (error) => {
          let details = "Unknown error";
          try {
            if (error) {
              if (typeof error === "string") {
                details = error;
              } else if (error?.message) {
                details = error.message;
              } else {
                const seen = new WeakSet();
                details = JSON.stringify(error, (key, value) => {
                  if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) return "[circular]";
                    seen.add(value);
                  }
                  if (typeof value === "bigint") return value.toString();
                  return value;
                });
              }
            }
          } catch (_) {
            try {
              details = String(error);
            } catch {
              details = "[unserializable error]";
            }
          }
          console.error("Chat error:", details);
          // Fallback: if server says chat does not exist, attempt to create then resend last message
          if (
            typeof details === "string" &&
            details.toLowerCase().includes("does not exist") &&
            selectedUser &&
            !selectedUser.isTemporary &&
            socketManager.socket
          ) {
            try {
              const userBIdGuess = selectedUser?.userB?.id || userBId || null;
              if (currentUserId && userBIdGuess) {
                const handleCreatedAndResend = (newChat) => {
                  try {
                    const realId = newChat?.id;
                    if (realId) {
                      setSelectedUser({ ...(selectedUser || {}), id: realId });
                      const msg = lastAttemptedMessageRef.current;
                      if (msg && socketManager.socket?.connected) {
                        socketManager.socket.emit("send_message", {
                          senderId: currentUserId,
                          conversationId: realId,
                          content: msg,
                        });
                      }
                    }
                  } finally {
                    socketManager.socket?.off(
                      "chat_created",
                      handleCreatedAndResend,
                    );
                  }
                };
                socketManager.socket.on("chat_created", handleCreatedAndResend);
                socketManager.socket.emit("create_chat", {
                  userAId: currentUserId,
                  userBId: userBIdGuess,
                });
              }
            } catch (_) {}
          }
          setSending(false);
          setSendingMessageId(null);
        });

        // Listen for typing indicator from other user
        const offUserTyping = socketManager.on(
          "user_typing",
          ({ userId, isTyping, userName }) => {
            // Update indicator only for messages coming from the other user (ignore our own echo if any)
            if (String(userId) !== String(socketManager.socket?.id)) {
              setOtherTyping({
                isTyping: !!isTyping,
                userName: userName || "",
              });
            }
          },
        );

        // Listen for read receipts from server
        const offMessagesMarkedRead = socketManager.on(
          "messages_marked_read",
          ({ conversationId, chatId, userId }) => {
            try {
              // Only process for this open conversation
              const convId = conversationId || chatId;
              if (
                selectedUser &&
                !selectedUser.isTemporary &&
                String(convId) === String(selectedUser.id)
              ) {
                // Update local messages: mark OUR sent messages as read
                setMessages((prev) =>
                  (prev || []).map((m) =>
                    String(m.senderId) === String(currentUserId)
                      ? { ...m, read: true }
                      : m,
                  ),
                );

                // Also update conversations list (sidebar preview)
                if (setUsers) {
                  setUsers((prevConversations) =>
                    (prevConversations || []).map((c) => {
                      if (String(c.id) !== String(selectedUser.id)) return c;
                      const updatedMsgs = (c.chatMeta?.messages || []).map(
                        (m) =>
                          String(m.senderId) === String(currentUserId)
                            ? { ...m, read: true }
                            : m,
                      );
                      return {
                        ...c,
                        chatMeta: {
                          ...(c.chatMeta || {}),
                          messages: updatedMsgs,
                        },
                      };
                    }),
                  );
                }
              }
            } catch (_) {}
          },
        );

        // Combine cleanup functions
        unsubscribe = () => {
          try {
            offReceiveMessage();
            offChatError();
            offUserTyping && offUserTyping();
            offMessagesMarkedRead && offMessagesMarkedRead();
            if (!selectedUser.isTemporary) {
              socketManager.socket?.emit("leave_conversation", {
                conversationId: selectedUser.id,
              });
            }
          } catch (_) {}
        };
      } catch (error) {
        console.error("🔍 [ChatWindow] Socket connection failed:", error);
        setSocketConnected(false);
        setConnectionError("Failed to connect to chat server");
      }
    };

    initializeSocket();

    return () => {
      try {
        unsubscribe();
      } catch (_) {}
    };
  }, [currentUserId, selectedUser?.id, setMessages]);

  const retryConnection = async () => {
    console.log("🔍 [ChatWindow] Retrying socket connection...");
    setConnectionError(null);
    setSocketConnected(false);

    try {
      await socketManager.connect();
      setSocketConnected(true);
      setConnectionError(null);
    } catch (error) {
      console.error("🔍 [ChatWindow] Retry failed:", error);
      setConnectionError("Failed to connect to chat server");
    }
  };

  const handleSendMessage = async () => {
    console.log("🔍 [ChatWindow] handleSendMessage called");
    console.log("🔍 [ChatWindow] selectedUser:", selectedUser);
    console.log("🔍 [ChatWindow] newMessage:", newMessage);
    console.log(
      "🔍 [ChatWindow] Socket connected:",
      socketManager.socket?.connected,
    );

    if (
      !selectedUser ||
      !selectedUser.id ||
      !newMessage.trim() ||
      !socketManager.socket
    ) {
      console.log("🔍 [ChatWindow] Early return - conditions not met");
      return;
    }

    if (!socketManager.socket.connected) {
      console.log(
        "🔍 [ChatWindow] Socket not connected, waiting for connection...",
      );
      // Wait for socket to connect
      socketManager.socket.on("connect", () => {
        console.log("🔍 [ChatWindow] Socket connected, retrying send message");
        handleSendMessage();
      });
      return;
    }

    // Check if this is a temporary chat (new conversation)
    if (selectedUser.isTemporary) {
      console.log(
        "🔍 [ChatWindow] Creating new chat for temporary conversation",
      );
      setSending(true);
      const messageToSend = newMessage;
      lastAttemptedMessageRef.current = messageToSend;
      setNewMessage("");

      // Store the message to send after chat creation
      const pendingMessage = {
        content: messageToSend,
        senderId: currentUserId,
        createdAt: new Date().toISOString(),
        read: false,
      };

      // Listen for chat creation response
      const handleChatCreated = (newChat) => {
        console.log("🔍 [ChatWindow] Chat created via socket:", newChat);

        // Update the selectedUser with the real chat data
        const realChat = {
          ...newChat,
          userA: newChat.userA || selectedUser.userA,
          userB: newChat.userB || selectedUser.userB,
          isTemporary: false,
        };

        // Update conversations list
        if (setUsers) {
          setUsers((prevConversations) => {
            const updated = [...prevConversations, realChat];
            console.log(
              "🔍 [ChatWindow] Updated conversations with new chat:",
              updated,
            );
            return updated;
          });
        }

        // Update selectedUser to use real chat ID
        setSelectedUser(realChat);

        // Now send the message with the real chat ID
        console.log(
          "🔍 [ChatWindow] Emitting send_message with real chat ID:",
          realChat.id,
        );
        socketManager.socket.emit("send_message", {
          senderId: currentUserId,
          conversationId: realChat.id,
          content: messageToSend,
        });

        // Keep loader until we receive our own echo or error

        // Remove the event listeners
        socketManager.socket.off("chat_created", handleChatCreated);
        socketManager.socket.off("chat_error", handleChatError);
      };

      const handleChatError = (error) => {
        console.error(
          "🔍 [ChatWindow] Failed to create chat via socket:",
          error,
        );
        setSending(false);
        setNewMessage(messageToSend); // Restore the message
        // Remove the event listeners
        socketManager.socket.off("chat_created", handleChatCreated);
        socketManager.socket.off("chat_error", handleChatError);
      };

      // Set up event listeners
      socketManager.socket.on("chat_created", handleChatCreated);
      socketManager.socket.on("chat_error", handleChatError);

      // Emit create_chat event
      console.log("🔍 [ChatWindow] Emitting create_chat event:", {
        userAId: currentUserId,
        userBId: selectedUser.userB.id,
      });
      socketManager.socket.emit("create_chat", {
        userAId: currentUserId,
        userBId: selectedUser.userB.id,
      });

      return;
    }

    console.log("🔍 [ChatWindow] Setting sending to true");
    setSending(true);
    const messageToSend = newMessage;
    lastAttemptedMessageRef.current = messageToSend;
    const tempId = `temp_${Date.now()}`;
    setSendingMessageId(tempId);
    setNewMessage("");

    console.log("🔍 [ChatWindow] Emitting send_message with:", {
      senderId: currentUserId,
      conversationId: selectedUser.id,
      content: messageToSend,
    });

    // Send message through socket
    socketManager.socket.emit("send_message", {
      senderId: currentUserId,
      conversationId: selectedUser.id,
      content: messageToSend,
    });

    // Update conversations array immediately for optimistic UI
    if (setUsers && selectedUser) {
      console.log("🔍 [ChatWindow] Adding optimistic message to conversations");
      const tempMessage = {
        id: tempId,
        senderId: currentUserId,
        content: messageToSend,
        createdAt: new Date().toISOString(),
        sender: { name: "You", avatar: null },
        read: false,
      };

      setUsers((prevConversations) => {
        console.log(
          "🔍 [ChatWindow] Previous conversations for optimistic update:",
          prevConversations,
        );
        const updated = prevConversations.map((conversation) => {
          if (conversation.id === selectedUser.id) {
            console.log(
              "🔍 [ChatWindow] Found matching conversation for optimistic update",
            );
            // Add the temporary message to the conversation
            const updatedMessages = [
              ...(conversation.chatMeta?.messages || []),
              tempMessage,
            ];
            const updatedConversation = {
              ...conversation,
              chatMeta: {
                ...conversation.chatMeta,
                messages: updatedMessages,
              },
            };
            console.log(
              "🔍 [ChatWindow] Updated conversation for optimistic UI:",
              updatedConversation,
            );
            return updatedConversation;
          }
          return conversation;
        });
        console.log(
          "🔍 [ChatWindow] Updated conversations for optimistic UI:",
          updated,
        );
        return updated;
      });
    } else {
      console.log(
        "🔍 [ChatWindow] Cannot add optimistic message - setUsers:",
        !!setUsers,
        "selectedUser:",
        !!selectedUser,
      );
    }

    // Keep loader until our send is echoed back or an error occurs
  };

  if (!selectedUser) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center text-lg text-gray-400">
        No chat selected
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[24px] border border-black/10 bg-[#F9F9F9] md:rounded-[30px]">
      <div className="flex w-full items-center justify-between px-3 pb-2 pt-4 md:px-5 md:pb-3 md:pt-5">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="md:hidden">
            <ChatUsersSheet
              users={users}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
            />
          </div>
          <div className="grid size-[36px] place-items-center overflow-hidden rounded-full bg-gray-100 md:size-[48px]">
            {otherUser?.avatar ? (
              <Image
                src={otherUser.avatar}
                width={100}
                height={100}
                alt={otherUser?.name || "Chat user"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium text-[#282828] md:text-[17px] md:leading-[24px]">
              {otherUser?.name ||
                (selectedUser?.isTemporary
                  ? t("chat.connecting")
                  : t("chat.user"))}
            </h1>
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#7F7F7F] md:text-[14.4px] md:leading-[19.2px]">
                {t("chat.available_now")}
              </span>
              <div className="size-[10px] rounded-full bg-[#7DDE86]"></div>
            </div>
          </div>
        </div>
        {/* <button className="px-3 py-1">{threeDotsIcon}</button> */}
      </div>

      {/* Chat Messages */}
      <div className="flex h-full w-full flex-col px-4 md:px-6">
        <div
          ref={messagesContainerRef}
          className="no-scrollbar flex h-full max-h-[63vh] flex-col gap-3 overflow-y-auto border-t-[1.3px] border-[#F0F1F4] py-4"
        >
          {console.log("🔍 [ChatWindow] Rendering messages:", {
            loading,
            messagesLength: messages?.length,
            messages,
          })}

          {loading && (!messages || messages.length === 0) ? (
            <div className="py-8 text-center text-gray-400">
              {t("common.loading")}
            </div>
          ) : !messages || messages.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              {t("chat.no_messages")}
            </div>
          ) : (
            (console.log(
              "🔍 [ChatWindow] Message read flags:",
              messages.map((m) => ({
                id: m.id,
                read: m.read,
                senderId: m.senderId,
              })),
            ),
            messages.map((msg, index) => {
              const isMine = msg.senderId === currentUserId;
              return (
                <div
                  key={index}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={cn(
                      "flex max-w-[60%] flex-col gap-1",
                      isMine ? "items-end" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "flex w-full items-center gap-1",
                        isMine ? "flex-row-reverse" : "",
                      )}
                    >
                      <div className="grid size-[24px] place-items-center overflow-hidden rounded-full">
                        {(() => {
                          // Resolve sender avatar deterministically using senderId mapping
                          const mappedSenderAvatar = (() => {
                            if (!selectedUser) return null;
                            const aId = selectedUser.userA?.id;
                            const bId = selectedUser.userB?.id;
                            if (String(msg.senderId) === String(aId)) {
                              return (
                                selectedUser.userA?.avatar ||
                                selectedUser.userA?.image ||
                                null
                              );
                            }
                            if (String(msg.senderId) === String(bId)) {
                              return (
                                selectedUser.userB?.avatar ||
                                selectedUser.userB?.image ||
                                null
                              );
                            }
                            return null;
                          })();

                          // Strict fallbacks to avoid showing the other user's avatar incorrectly
                          const avatarUrl = isMine
                            ? firstNonEmpty(
                                msg.sender?.avatar,
                                currentUserAvatar,
                              )
                            : firstNonEmpty(
                                msg.sender?.avatar,
                                mappedSenderAvatar,
                              );
                          return avatarUrl ? (
                            <Image
                              src={avatarUrl}
                              width={100}
                              height={100}
                              alt="message user"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-gray-400"
                            >
                              <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                fill="currentColor"
                              />
                              <path
                                d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                                fill="currentColor"
                              />
                            </svg>
                          );
                        })()}
                      </div>
                      <span className="hidden text-xs md:inline">
                        {isMine
                          ? msg.sender?.name || "You"
                          : msg.sender?.name ||
                            selectedUser.name ||
                            selectedUser.userB?.name ||
                            selectedUser.userA?.name ||
                            "User"}
                      </span>
                      <span className="px-2 text-[8px] text-battleShipGray">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "w-fit px-2 pb-1.5 pt-2 md:pb-2 md:pl-3 md:pr-2.5 md:pt-3",
                        isMine
                          ? "rounded-l-[10px] rounded-br-[10px] bg-moonstone text-white"
                          : "rounded-r-[10px] rounded-bl-[10px] bg-[#DCE2FF] text-black",
                      )}
                    >
                      <p className="text-xs md:text-sm">{msg.content}</p>
                      <div
                        className={cn(
                          "mt-1 flex justify-end text-xs",
                          isMine ? "text-white" : "text-[#4D4D4D]",
                        )}
                      >
                        {isMine ? (
                          !!msg.read ? (
                            // Double tick (delivered/read)
                            <span className="inline-flex -space-x-1">
                              {deliverIcon}
                              <span className="-ml-1 inline-block">
                                {deliverIcon}
                              </span>
                            </span>
                          ) : (
                            // Single tick (sent/unread)
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              fill="currentColor"
                            >
                              <path d="M9 16.17l-3.88-3.88a1 1 0 10-1.41 1.41l4.59 4.59a1 1 0 001.41 0l10-10a1 1 0 10-1.41-1.41L9 16.17z" />
                            </svg>
                          )
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }))
          )}
          {sending && (
            <div className="flex justify-end">
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                <span className="text-sm text-gray-500">Sending...</span>
              </div>
            </div>
          )}
          {!socketConnected && (
            <div className="flex justify-center">
              <div className="bg-yellow-100 flex items-center gap-2 rounded-lg px-3 py-2">
                <div className="bg-yellow-400 h-4 w-4 rounded-full" />
                <span className="text-yellow-700 text-sm">
                  {connectionError
                    ? `Connection failed: ${connectionError}`
                    : "Connecting to chat..."}
                </span>
                {connectionError && (
                  <button
                    onClick={retryConnection}
                    className="bg-yellow-500 hover:bg-yellow-600 ml-2 rounded px-2 py-1 text-xs text-white"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-3 bg-white px-5 py-3">
        <div className="flex items-center gap-2">
          <button className="text-[#C1C2CB] hover:text-moonstone">
            {micIcon}
          </button>
          <button className="text-[#C1C2CB] hover:text-moonstone">
            {pinIcon}
          </button>
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="h-[50px] flex-1 rounded-[8px] border border-transparent bg-[#F8F7FB] px-4 text-sm outline-none placeholder:text-[#858699] focus:border-moonstone"
          disabled={sending || !selectedUser}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !sending &&
              selectedUser &&
              newMessage.trim()
            ) {
              handleSendMessage();
            }
          }}
          onInput={() => {
            // Emit typing event while user types
            if (
              socketManager.socket?.connected &&
              selectedUser &&
              !selectedUser.isTemporary
            ) {
              socketManager.socket.emit("typing", {
                conversationId: selectedUser.id,
                isTyping: true,
                userName: otherUser?.name || "",
              });
              // Debounce stop-typing indicator
              if (typingTimeoutRef.current)
                clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => {
                socketManager.socket?.emit("typing", {
                  conversationId: selectedUser.id,
                  isTyping: false,
                  userName: otherUser?.name || "",
                });
              }, 1200);
            }
          }}
        />
        {otherTyping.isTyping && (
          <span className="ml-2 text-xs text-battleShipGray">
            {otherTyping.userName || "User"} is typing...
          </span>
        )}
        <button
          onClick={handleSendMessage}
          className="grid size-[50px] place-items-center rounded-full text-moonstone"
          disabled={sending || !selectedUser || !socketConnected}
        >
          {sending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            sendIcon
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
