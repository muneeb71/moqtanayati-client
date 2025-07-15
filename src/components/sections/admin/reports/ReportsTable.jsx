import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import Image from "next/image";
import { BiSolidTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import formatDateTime from "@/utils/dateFormatter";
import ShimmerRow from "@/components/shimmer/ShimmerRow";

const ReportTable = ({
  selectedRows,
  setSelectedRows,
  currentData,
  toggleRowSelection,
  onViewClick,
  role,
  loading,
}) => {
  const isAllSelected =
    Array.isArray(currentData) &&
    selectedRows.length === currentData.length &&
    currentData.length > 0;

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
            {role === "buyer" ? "Orders Placed" : "Orders Dispatched"}
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Payments Earned
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Loading State */}

        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <ShimmerRow key={idx} columns={7} />
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
                  <Image
                    src="/static/dummy-user/1.jpeg"
                    width={34}
                    height={34}
                    alt="Buyer"
                    loading="lazy"
                    quality={100}
                    className="rounded-full"
                  />
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
                  <MdEdit className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700" />
                  <BsFillEyeFill
                    onClick={() => onViewClick(report.user.id)}
                    className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700"
                  />
                  <BiSolidTrash className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700" />
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
