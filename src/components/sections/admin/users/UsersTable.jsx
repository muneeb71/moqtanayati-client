import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import formatDateTime from "@/utils/dateFormatter";
import Image from "next/image";

import { BiSolidTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import ShimmerRow from "@/components/shimmer/shimmerRow";

const UsersTable = ({
  selectedRows,
  setSelectedRows,
  currentData,
  toggleRowSelection,
  onViewClick,
  loading,
}) => {
  return (
    <table className="min-w-[1200px] rounded-lg">
      <thead className="sticky top-0 bg-white">
        <tr className="border-b border-gray-200 text-left">
          <th className="py-5 pl-8">
            <CustomCheckBox
              checked={
                selectedRows.length === currentData.length &&
                currentData.length > 0
              }
              setChecked={(checked) =>
                setSelectedRows(
                  checked ? currentData.map((user) => user.email) : [],
                )
              }
            />
          </th>
          <th className="text-customeBlue py-5 font-semibold">Name</th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">Role</th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Account Status
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Verification Status
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Registration Date
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          Array(5)
            .fill(0)
            .map((_, idx) => <ShimmerRow key={idx} />)
        ) : currentData.length === 0 ? (
          <tr>
            <td colSpan={7} className="py-10 text-center text-sm text-gray-500">
              No users found.
            </td>
          </tr>
        ) : (
          currentData.map((user, index) => (
            <tr
              key={index}
              className={`border-b ${
                selectedRows.includes(user.email) ? "bg-[#F9F9FC]" : "bg-white"
              }`}
            >
              <td className="py-5 pl-8">
                <CustomCheckBox
                  checked={selectedRows.includes(user.email)}
                  setChecked={() => toggleRowSelection(user.email)}
                />
              </td>
              <td className="py-5">
                <div className="flex items-center gap-2">
                  <Image
                    src={user.avatar || "/static/dummy-user/1.jpeg"}
                    width={50}
                    height={50}
                    alt="Profile Image"
                    loading="lazy"
                    quality={100}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-[16px] font-semibold text-customBlue">
                      {user.name}
                    </p>
                    <p className="text-[14px] text-battleShipGray">
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5 pl-8 text-[16px] text-customGray">
                {user.role}
              </td>
              <td className="py-5 pl-8">
                <span
                  className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                    user.accountStatus === "DISABLED"
                      ? "bg-faluRed/10 text-faluRed"
                      : "bg-customGreen/10 text-customGreen"
                  }`}
                >
                  {user.accountStatus}
                </span>
              </td>
              <td className="py-5 pl-8">
                <span
                  className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                    user.verification_status === "Approved"
                      ? "bg-customGreen/10 text-customGreen"
                      : "bg-lightBlue/10 text-lightBlue"
                  }`}
                >
                  {user.verificationStatus}
                </span>
              </td>
              <td className="py-5 pl-8 text-[16px] text-customGray">
                {formatDateTime.formatDateTime(user.registrationDate)}
              </td>
              <td className="py-5 pl-8">
                <div className="flex flex-row gap-2">
                  <MdEdit className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700" />
                  <BsFillEyeFill
                    onClick={() => onViewClick(user.id)}
                    className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700"
                  />
                  <BiSolidTrash className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700" />
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;
