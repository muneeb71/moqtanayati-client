import React from "react";

const ShimmeringCard = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#EDF3F7] p-4">
      {/* White Profile Card */}
      <div className="w-full max-w-md animate-pulse rounded-2xl bg-white p-6 shadow-md">
        {/* Profile Image */}
        <div className="mb-6 flex flex-col items-center">
          <div className="h-[100px] w-[100px] rounded-full bg-gray-300" />
          <div className="mt-4 h-4 w-32 rounded bg-gray-300" />
          <div className="mt-2 h-3 w-20 rounded bg-gray-200" />
        </div>

        {/* Fields */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md bg-[#F2F0FE] p-3"
            >
              <div className="flex w-full items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-300" />
                <div className="h-4 w-full rounded bg-gray-200" />
              </div>
              <div className="h-4 w-4 rounded bg-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button OUTSIDE of card */}
      <div className="mt-6 flex w-full justify-center">
        <div className="h-12 w-48 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default ShimmeringCard;
