import { searchIconSmall } from "@/assets/icons/common-icons";
import Image from "next/image";

const ChatSidebar = ({ users, selectedUser, setSelectedUser, loading, selectedUserId }) => {
  console.log(users);
  
  return (
    <div className="hidden w-full flex-col rounded-[30px] border border-black/10 bg-[#F9F9F9] px-[20px] py-[30px] md:flex">
      <h1 className="border-b-[1.3px] border-[#F0F1F4] pb-[32px] text-center text-[23px] leading-[31px] text-delftBlue">
        Conversations
      </h1>
      <div className="flex w-full flex-col gap-6 py-6">
        <div className="flex h-[61px] items-center gap-3 rounded-[8px] bg-white px-4">
          {searchIconSmall}
          <input
            type="text"
            name="searchChat"
            id="searchChat"
            className="w-full text-sm outline-none placeholder:text-[#858699]"
            placeholder="Search..."
          />
        </div>
        <div className="flex w-full flex-col">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No chats</div>
          ) : (
            users.map((user, index) => {
              const messages = user.chatMeta.messages || [];
              const lastMessage = messages[messages.length - 1];
              return (
                <div
                  key={user.id || index}
                  onClick={() => setSelectedUser(user)}
                  className={`flex w-full cursor-pointer items-start justify-between py-2 transition-all duration-200 ease-in hover:bg-black/10 ${user.id === selectedUserId ? 'bg-moonstone/10 border-l-4 border-moonstone' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-[60px] place-items-center overflow-hidden rounded-full">
                      <Image
                        src={user.image || user.userB?.avatar || user.userA?.avatar || "/static/dummy-user/1.jpeg"}
                        width={100}
                        height={100}
                        alt={user.name || user.userB?.name || user.userA?.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-[15px] font-medium leading-[26px] text-russianViolet">
                        {user.name || user.userB?.name || user.userA?.name || "User"}
                      </h1>
                      <p className="max-w-[200px] truncate text-[13.17px] leading-[17.5px] text-[#595C75]">
                        {lastMessage && (
                          <>
                            {lastMessage.senderId === user.userAId && <span className="font-medium">You: </span>}
                            <span className={lastMessage.senderId !== user.userAId ? "font-medium text-moonstone" : ""}>
                              {lastMessage.content}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className="mt-2 text-[11px] leading-[17.5px] text-nowrap text-[#9799A8]">
                    {lastMessage && lastMessage.createdAt ? new Date(lastMessage.createdAt).toLocaleString() : ""}
                  </span>
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
