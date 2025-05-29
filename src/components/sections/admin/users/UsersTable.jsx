import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import Image from "next/image";
import React from "react";
import { BiSolidTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const UsersTable = ({
  selectedRows,
  setSelectedRows,
  currentData,
  toggleRowSelection,
  onViewClick,
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
        {currentData.map((user, index) => (
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
                  src={user.image}
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
                  user.account_status === "Active"
                    ? "bg-customGreen/10 text-customGreen"
                    : "bg-faluRed/10 text-faluRed"
                }`}
              >
                {user.account_status}
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
                {user.verification_status}
              </span>
            </td>
            <td className="py-5 pl-8 text-[16px] text-customGray">
              {user.registration_date}
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
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
