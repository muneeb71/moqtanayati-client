import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import Image from "next/image";
import { BiSolidTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import formatDateTime from "@/utils/dateFormatter";
import ShimmerRow from "@/components/shimmer/shimmerRow";
import toast from "react-hot-toast";
import { deleteReportById } from "@/lib/api/admin/reports/deleteReportById";
import { useState } from "react";

const ReportTable = ({
  selectedRows,
  setSelectedRows,
  currentData,
  toggleRowSelection,
  onViewClick,
  role,
  loading,
}) => {
  const [viewLoading, setViewLoading] = useState(null);

  const isAllSelected =
    Array.isArray(currentData) &&
    selectedRows.length === currentData.length &&
    currentData.length > 0;

  const deleteReport = async (id) => {
    console.log("report id : ", id);
    try {
      await deleteReportById(id);
      toast.success("Report deleted");
    } catch {
      toast.error("Report not deleted. Try again!");
    }
  };

  const handleViewClick = async (userId) => {
    if (viewLoading) return; // prevent double clicks
    setViewLoading(userId);
    try {
      await onViewClick(userId);
      // Do not clear here; component will unmount on navigation
    } catch (error) {
      console.error("View error:", error);
      toast.error("Failed to load report details");
      setViewLoading(null);
    }
  };

  return (
    <table className="min-w-[1200px] rounded-lg">
      <thead className="sticky top-0 bg-white">
        <tr className="border-b border-gray-200 text-left">
          <th className="py-5 pl-8">
            <CustomCheckBox
              checked={isAllSelected}
              setChecked={(checked) =>
                setSelectedRows(
                  checked && Array.isArray(currentData)
                    ? currentData.map((user) => user.user.id)
                    : [],
                )
              }
            />
          </th>
          <th className="text-customeBlue py-5 font-semibold">Name</th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Registration Date
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            {role === "BUYER" ? "Orders Placed" : "Orders Dispatched"}
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            {role === "BUYER" ? "Total Spent" : "Payments Earned"}
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Loading State */}

        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <ShimmerRow key={idx} columns={6} />
          ))
        ) : Array.isArray(currentData) && currentData.length > 0 ? (
          currentData.map((report, index) => (
            <tr
              key={index}
              className={`border-b ${
                selectedRows.includes(report.user.id)
                  ? "bg-[#F9F9FC]"
                  : "bg-white"
              }`}
            >
              <td className="py-5 pl-8">
                <CustomCheckBox
                  checked={selectedRows.includes(report.user.id)}
                  setChecked={() => toggleRowSelection(report.user.id)}
                />
              </td>
              <td className="py-5">
                <div className="flex items-center gap-2">
                  {report.user.avatar ? (
                    <Image
                      src={report.user.avatar}
                      width={40}
                      height={40}
                      alt="User Avatar"
                      loading="lazy"
                      quality={100}
                      className="h-[34px] w-[34px] rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gray-200">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="text-[16px] font-semibold text-customBlue">
                      {report.user.name}
                    </p>
                    <p className="text-[14px] text-battleShipGray">
                      {report.user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5 pl-8 text-[16px] text-customGray">
                {formatDateTime.formatDate(report.user.createdAt)}
              </td>
              <td className="py-5 pl-8 text-[16px] text-customGray">
                {report.ordersDispatched}
              </td>
              <td className="py-5 pl-8 text-[16px] text-customGray">
                {report.paymentsEarned}
              </td>
              <td className="py-5 pl-8">
                <div className="flex flex-row gap-2">
                  {/* <MdEdit className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700" /> */}
                  {viewLoading === report.user.id ? (
                    <div className="flex h-5 w-5 items-center justify-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                    </div>
                  ) : (
                    <BsFillEyeFill
                      onClick={() => handleViewClick(report.user.id)}
                      className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700"
                    />
                  )}
                  {/* <BiSolidTrash
                    onClick={() => deleteReport(report.id)}
                    className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700"
                  /> */}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="py-10 text-center text-sm text-gray-500">
              No data found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReportTable;
