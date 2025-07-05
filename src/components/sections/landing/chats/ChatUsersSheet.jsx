import { searchIconSmall } from "@/assets/icons/common-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

const ChatUsersSheet = ({ users, setSelectedUser, selectedUser }) => {  
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="text-delftBlue" />
      </SheetTrigger>
      <SheetContent className="px-3 py-6">
        <SheetHeader>
          <SheetTitle className="text-delftBlue">Conversations</SheetTitle>
        </SheetHeader>
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
            {users.map((user, index) => (
              <SheetClose asChild key={index}>
                <div
                  onClick={() => setSelectedUser(user)}
                  className="flex w-full cursor-pointer items-start justify-between py-2 transition-all duration-200 ease-in hover:bg-black/10"
                >
                  <div className="flex w-full items-center gap-3">
                    <div className="grid size-[36px] min-w-[36px] place-items-center overflow-hidden rounded-full">
                      <Image
                        src={user.avatar || "/static/dummy-user/1.jpeg"}
                        width={100}
                        height={100}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <h1 className="text-sm font-medium text-russianViolet">
                        {user.name}
                      </h1>
                      <p className="max-w-[190px] truncate text-xs leading-[17.5px] text-[#595C75]">
                        {user.lastMessage ? <span>{user.lastMessage}</span> : <span className="italic text-gray-400">No messages</span>}
                      </p>
                      <span className="text-end text-[10px] text-[#9799A8]">
                        {user.lastMessageTime ? user.lastMessageTime : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </SheetClose>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatUsersSheet;
