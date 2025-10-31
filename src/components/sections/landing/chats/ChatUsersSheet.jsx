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
import { MenuIcon, User } from "lucide-react";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";

const ChatUsersSheet = ({ users, setSelectedUser, selectedUser }) => {
  const { t } = useTranslation();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="text-delftBlue" />
      </SheetTrigger>
      <SheetContent className="px-3 py-6">
        <SheetHeader>
          <SheetTitle className="text-delftBlue">
            {t("chat.conversations")}
          </SheetTitle>
        </SheetHeader>
        <div className="flex w-full flex-col gap-6 py-6">
          <div className="flex h-[61px] items-center gap-3 rounded-[8px] bg-white px-4">
            {searchIconSmall}
            <input
              type="text"
              name="searchChat"
              id="searchChat"
              className="w-full text-sm outline-none placeholder:text-[#858699]"
              placeholder={t("chat.search_placeholder")}
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
                    <div className="grid size-[36px] min-w-[36px] place-items-center overflow-hidden rounded-full bg-gray-100">
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
                            t("chat.user")
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex w-full flex-col">
                      <h1 className="text-sm font-medium text-russianViolet">
                        {user.name ||
                          user.userB?.name ||
                          user.userA?.name ||
                          t("chat.user")}
                      </h1>
                      <p className="max-w-[190px] truncate text-xs leading-[17.5px] text-[#595C75]">
                        {(() => {
                          const messages = user.chatMeta?.messages || [];
                          const lastMessage = messages[messages.length - 1];
                          return lastMessage ? (
                            <>
                              {lastMessage.senderId === user.userAId && (
                                <span className="font-medium">
                                  {t("chat.you")}:{" "}
                                </span>
                              )}
                              <span
                                className={
                                  lastMessage.senderId !== user.userAId
                                    ? "font-medium text-moonstone"
                                    : ""
                                }
                              >
                                {lastMessage.content}
                              </span>
                            </>
                          ) : (
                            <span className="italic text-gray-400">
                              {t("chat.no_messages")}
                            </span>
                          );
                        })()}
                      </p>
                      <span className="text-end text-[10px] text-[#9799A8]">
                        {(() => {
                          const messages = user.chatMeta?.messages || [];
                          const lastMessage = messages[messages.length - 1];
                          return lastMessage && lastMessage.createdAt
                            ? new Date(lastMessage.createdAt).toLocaleString()
                            : "";
                        })()}
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
