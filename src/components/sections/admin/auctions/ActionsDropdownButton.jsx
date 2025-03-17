"use client";

import { EllipsisVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ActionsDropdownButton = () => {
  const [actionsDropdown, setActionsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <button>Cancel Auction</button>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdownButton;
