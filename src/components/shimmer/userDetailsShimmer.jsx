import React from "react";

const UserDetailsShimmer = () => {
  return (
    <div className="flex h-full max-h-full animate-pulse flex-col gap-10 pb-10">
      <div className="flex flex-row justify-between rounded-xl bg-white px-5 py-5 lg:px-10">
        <div className="flex flex-row items-center gap-5">
          <div className="h-[100px] w-[100px] rounded-full bg-gray-200 lg:h-[150px] lg:w-[150px]" />
          <div className="flex flex-col gap-4">
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-4 w-48 rounded bg-gray-200" />
          </div>
        </div>
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
      </div>

      <div className="grid h-full w-full gap-4 xl:grid-cols-[1fr_331px]">
        <div className="flex max-h-[calc(100vh-150px)] flex-col gap-5 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-3 lg:gap-5 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col rounded-xl bg-white px-4 pb-4 pt-4 xl:pb-8"
              >
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="mt-2 h-6 w-20 rounded bg-gray-300" />
              </div>
            ))}
          </div>

          <div className="flex h-full flex-col gap-4 pb-2">
            <div className="h-5 w-60 rounded bg-gray-200" />
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[270px] w-[280px] rounded-lg bg-white p-4 shadow"
                >
                  <div className="h-[200px] w-full rounded bg-gray-200" />
                  <div className="mt-4 h-4 w-40 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-24 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-fit flex-col gap-5 rounded-xl bg-white px-5 py-10">
          <div className="h-5 w-60 rounded bg-gray-200" />
          <div className="flex flex-col gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-24 rounded bg-gray-100" />
                <div className="mt-2 h-4 w-48 rounded bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6">
        <div className="mb-4 h-5 w-40 rounded bg-gray-200" />
        <div className="h-6 w-full rounded bg-gray-200" />
        <div className="mt-2 h-6 w-full rounded bg-gray-100" />
      </div>
    </div>
  );
};

export default UserDetailsShimmer;
