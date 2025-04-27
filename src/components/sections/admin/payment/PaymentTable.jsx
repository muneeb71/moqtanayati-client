import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import Image from "next/image";
import React from "react";
import { BiSolidTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const PaymentTable = ({
  selectedRows,
  setSelectedRows,
  currentData,
  toggleRowSelection,
  onViewClick,
}) => {
    console.log(currentData);
    
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
                  checked ? currentData.map((user) => user.orderId) : [],
                )
              }
            />
          </th>
          <th className="text-customeBlue py-5 font-semibold px-3">Order ID</th>
          <th className="text-customeBlue py-5 font-semibold">Seller</th>
          {currentData[0].paymentGateway !== "Cash on Delivery" && <th className="text-customeBlue py-5 pl-8 font-semibold">Payment Gateway</th>}
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Amount
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Collection
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Confirmation Date
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">
            Payment Status
          </th>
          <th className="text-customeBlue py-5 pl-8 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((user, index) => (
          <tr
            key={index}
            className={`border-b ${
              selectedRows.includes(user.orderId) ? "bg-[#F9F9FC]" : "bg-white"
            }`}
          >
            <td className="py-5 pl-8">
              <CustomCheckBox
                checked={selectedRows.includes(user.orderId)}
                setChecked={() => toggleRowSelection(user.orderId)}
              />
            </td>
            <td className="py-5 px-3 text-[16px] text-customGray">
              {user.orderId}
            </td>
            <td className="py-5">
              <div className="flex items-center gap-2">
                <Image
                  src={user.seller.avatar}
                  width={50}
                  height={50}
                  alt="Profile Image"
                  loading="lazy"
                  quality={100}
                  className="rounded-full"
                />
                <div>
                  <p className="text-[16px] font-semibold text-customBlue">
                    {user.seller.name}
                  </p>
                  <p className="text-[14px] text-battleShipGray">
                    {user.seller.email}
                  </p>
                </div>
              </div>
            </td>
            {user.paymentGateway !== "Cash on Delivery" && <td className="py-5 pl-8 text-[16px] text-customGray">
              {user.paymentGateway}
            </td>}
            <td className="py-5 pl-8 text-[16px] text-customGray">
              {user.amount}
            </td>
            <td className="py-5 pl-8 text-[16px] text-customGray">
              {user.collection}
            </td>
            <td className="py-5 pl-8 text-[16px] text-customGray">
              {user.confirmationDate}
            </td>
            <td className="py-5 pl-8">
              <span
                className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                  user.paymentStatus === "Completed"
                    ? "bg-customGreen/10 text-customGreen"
                    : "bg-[#0770AD]/10 text-[#0770AD]"
                }`}
              >
                {user.paymentStatus}
              </span>
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

export default PaymentTable;
