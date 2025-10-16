import { sellerChatIcon } from "@/assets/icons/common-icons";
import Image from "next/image";
import Link from "next/link";

const CustomerDetailsCard = ({ order }) => {
  if (!order) return null;
  const user = order.user || {};
  const avatar =
    typeof user.avatar === "string" && user.avatar.trim() !== ""
      ? user.avatar
      : "";
  const name = user.name || "Customer";
  const address = user.address || "No address provided";
  const userId = order?.user?.id;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-[#F8F7FB] p-4">
      <div className="flex items-center gap-2">
        {avatar ? (
          <Image
            src={avatar}
            width={48}
            height={48}
            alt="user"
            className="rounded-full object-cover"
            quality={100}
            loading="lazy"
          />
        ) : (
          <div className="grid size-12 place-items-center rounded-full bg-black/10">
            <span className="text-black/40">🧑</span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-black/50">Customer</span>
          <span className="text-sm font-medium text-black/70">{name}</span>
        </div>
      </div>
      <div className="flex w-full justify-between gap-5">
        <Link
          href={`/seller/chats?id=${userId}`}
          className="flex items-center gap-1 rounded-lg bg-moonstone/10 px-3 py-1"
        >
          {sellerChatIcon}{" "}
          <span className="text-xs text-moonstone">Chat with Customer</span>
        </Link>
        {/* <button className="flex items-center gap-1 rounded-lg bg-moonstone/10 px-4 py-1">
          <span className="text-xs text-moonstone">View Profile</span>
        </button> */}
      </div>
      <div className="mt-2 text-xs text-black/50">{address}</div>
    </div>
  );
};

export default CustomerDetailsCard;
