"use client";

import { EllipsisVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useAuctionStore from "@/stores/useAuctionStore";
import toast from "react-hot-toast";

const ActionsDropdownButton = ({ auctionId, status }) => {
  const [actionsDropdown, setActionsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const { cancelAuction } = useAuctionStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setActionsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCancelAuction = async () => {
    if (status === "ENDED") {
      toast("It's already ENDED", { icon: "⚠️" });
      setActionsDropdown(false);
      return;
    }
    try {
      await cancelAuction(auctionId);
      toast.success("Auction cancelled");
    } catch (e) {
      toast.error("Failed to cancel auction");
    } finally {
      setActionsDropdown(false);
    }
  };

  return (
    <div className="relative flex max-w-[100px] justify-end px-5 py-4">
      <button
        ref={buttonRef}
        className="px-2"
        onClick={() => setActionsDropdown(!actionsDropdown)}
      >
        <EllipsisVertical />
      </button>

      {actionsDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-12 min-w-full text-nowrap rounded-[10px_0px_10px_10px] bg-white px-3 py-2 text-sm font-medium text-faluRed shadow-[0px_0px_25px_2px_#0000001A]"
        >
          <button onClick={handleCancelAuction}>Cancel Auction</button>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdownButton;
