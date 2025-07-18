import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Profile section */}
      <div className="flex flex-row justify-between rounded-xl bg-white px-5 py-5 lg:px-10">
        <div className="flex flex-row items-center gap-5">
          <Skeleton circle height={100} width={100} />
          <div className="flex flex-col gap-2">
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={16} />
            <Skeleton width={200} height={16} />
          </div>
        </div>
        <Skeleton width={120} height={40} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-white px-4 pb-4 pt-4">
            <Skeleton width={80} height={16} />
            <Skeleton width={50} height={20} />
          </div>
        ))}
      </div>

      {/* Table Skeletons */}
      <div className="flex flex-col gap-6">
        {[...Array(2)].map((_, sectionIndex) => (
          <div key={sectionIndex}>
            <Skeleton width={200} height={24} />
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    {[...Array(4)].map((_, i) => (
                      <th key={i} className="py-2 pl-8">
                        <Skeleton width={100} height={16} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(3)].map((_, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-200">
                      {[...Array(4)].map((_, cellIndex) => (
                        <td key={cellIndex} className="py-4 pl-8">
                          <Skeleton width={80} height={16} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSkeleton;
