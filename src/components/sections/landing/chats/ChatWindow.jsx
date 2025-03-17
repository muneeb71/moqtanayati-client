import {
  sendIcon,
  deliverIcon,
  pinIcon,
  micIcon,
} from "@/assets/icons/chat-icons";
import { threeDotsIcon } from "@/assets/icons/common-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ChatUsersSheet from "./ChatUsersSheet";

const ChatWindow = ({
  selectedUser,
  setSelectedUser,
  users,
  setUsers,
  newMessage,
  setNewMessage,
}) => {
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedChats = users.map((chat) => {
        if (chat.name === selectedUser.name) {
          return {
            ...chat,
            chats: [
              ...chat.chats,
              {
                message: newMessage,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                isSender: true,
              },
            ],
          };
        }
        return chat;
      });

      setUsers(updatedChats);
      setSelectedUser((prev) => ({
        ...prev,
        chats: [
          ...prev.chats,
          {
            message: newMessage,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isSender: true,
          },
        ],
      }));
      setNewMessage("");
    }
  };

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
          <div className="grid size-[36px] place-items-center overflow-hidden rounded-full md:size-[48px]">
            <Image
              src={selectedUser.image}
              width={100}
              height={100}
              alt="notification"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium text-[#282828] md:text-[17px] md:leading-[24px]">
              {selectedUser.name}
            </h1>
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#7F7F7F] md:text-[14.4px] md:leading-[19.2px]">
                Available Now
              </span>
              <div className="size-[10px] rounded-full bg-[#7DDE86]"></div>
            </div>
          </div>
        </div>
        <button className="px-3 py-1">{threeDotsIcon}</button>
      </div>

      {/* Chat Messages */}
      <div className="flex h-full w-full flex-col px-4 md:px-6">
        <div className="no-scrollbar flex h-full max-h-[63vh] flex-col gap-3 overflow-y-auto border-t-[1.3px] border-[#F0F1F4] py-4">
          {selectedUser.chats.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={cn(
                  "flex max-w-[60%] flex-col gap-1",
                  chat.isSender ? "items-end" : "",
                )}
              >
                <div
                  className={cn(
                    "flex w-full items-center gap-1",
                    chat.isSender ? "flex-row-reverse" : "",
                  )}
                >
                  <div className="grid size-[24px] place-items-center overflow-hidden rounded-full">
                    <Image
                      src={
                        chat.isSender
                          ? "/dummy-user/1.jpeg"
                          : selectedUser.image
                      }
                      width={100}
                      height={100}
                      alt="notification"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="hidden text-xs md:inline">
                    {selectedUser.name}
                  </span>
                  <span className="px-2 text-[8px] text-battleShipGray">
                    {chat.time}
                  </span>
                </div>
                <div
                  className={cn(
                    "w-fit px-2 pb-1.5 pt-2 md:pb-2 md:pl-3 md:pr-2.5 md:pt-3",
                    chat.isSender
                      ? "rounded-l-[10px] rounded-br-[10px] bg-moonstone text-white"
                      : "rounded-r-[10px] rounded-bl-[10px] bg-[#DCE2FF] text-black",
                  )}
                >
                  <p className="text-xs md:text-sm">{chat.message}</p>
                  <div
                    className={cn(
                      "mt-1 flex justify-end text-xs",
                      chat.isSender ? "text-white" : "text-[#4D4D4D]",
                    )}
                  >
                    {deliverIcon}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
        />
        <button
          onClick={handleSendMessage}
          className="grid size-[50px] place-items-center rounded-full text-moonstone"
        >
          {sendIcon}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
