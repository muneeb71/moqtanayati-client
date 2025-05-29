import PageHeading from "@/components/headings/PageHeading";

const ChatLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center px-3">
      <PageHeading>Chats</PageHeading>
      {children}
    </div>
  );
};

export default ChatLayout;
