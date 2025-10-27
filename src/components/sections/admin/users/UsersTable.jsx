import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import formatDateTime from "@/utils/dateFormatter";
import Image from "next/image";
import { BiSolidTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import ShimmerRow from "@/components/shimmer/shimmerRow";
import useUserStore from "@/stores/useUserStore";

const UsersTable = ({ onViewClick, currentData, loading }) => {
  const {
    selectedRows,
    toggleRowSelection,
    setSelectedRows,
    editingUserId,
    setEditingUserId,
    editValues,
    setEditValues,
    handleSave,
    deleteUser,
  } = useUserStore();

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
            .map((_, idx) => <ShimmerRow key={idx} columns={7} />)
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
              className={`border-b ${selectedRows.includes(user.email) ? "bg-[#F9F9FC]" : "bg-white"}`}
            >
              <td className="py-5 pl-8">
                <CustomCheckBox
                  checked={selectedRows.includes(user.email)}
                  setChecked={() => toggleRowSelection(user.email)}
                />
              </td>
              <td className="py-5">
                <div className="flex items-center gap-2">
                  {user.avatar || user.profileImage || user.profile_image ? (
                    <Image
                      src={
                        user.avatar || user.profileImage || user.profile_image
                      }
                      width={50}
                      height={50}
                      alt="Profile Image"
                      className="h-[50px] w-[50px] rounded-full object-cover"
                      onError={(e) => {
                        console.log("User avatar load error, using fallback");
                        e.target.src = "/static/user.svg";
                      }}
                    />
                  ) : (
                    <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-200">
                      <svg
                        className="h-7 w-7 text-gray-500"
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
                {editingUserId === user.id ? (
                  <select
                    value={editValues.accountStatus}
                    onChange={(e) =>
                      setEditValues({ accountStatus: e.target.value })
                    }
                    className="rounded-lg border px-2 py-1 text-sm"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DISABLED">DISABLED</option>
                  </select>
                ) : (
                  <span
                    className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                      user.accountStatus === "DISABLED"
                        ? "bg-faluRed/10 text-faluRed"
                        : "bg-customGreen/10 text-customGreen"
                    }`}
                  >
                    {user.accountStatus}
                  </span>
                )}
              </td>
              <td className="py-5 pl-8">
                {editingUserId === user.id ? (
                  <select
                    value={editValues.verificationStatus}
                    onChange={(e) =>
                      setEditValues({ verificationStatus: e.target.value })
                    }
                    className="rounded-lg border px-2 py-1 text-sm"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                ) : (
                  <span
                    className={`rounded-lg px-5 py-1 text-[14px] font-semibold ${
                      user.verificationStatus === "APPROVED"
                        ? "bg-customGreen/10 text-customGreen"
                        : "bg-lightBlue/10 text-lightBlue"
                    }`}
                  >
                    {user.verificationStatus}
                  </span>
                )}
              </td>
              <td className="py-5 pl-8 text-[16px] text-customGray">
                {formatDateTime.formatDateTime(user.registrationDate)}
              </td>
              <td className="py-5 pl-8">
                <div className="flex flex-row gap-2">
                  {editingUserId === user.id ? (
                    <>
                      <button
                        onClick={() => handleSave(user.id)}
                        className="text-sm text-green-600 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <MdEdit
                      className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700"
                      onClick={() => {
                        setEditingUserId(user.id);
                        setEditValues({
                          accountStatus: user.accountStatus,
                          verificationStatus: user.verificationStatus,
                        });
                      }}
                    />
                  )}
                  <BsFillEyeFill
                    onClick={() => onViewClick(user.id)}
                    className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700"
                  />
                  <BiSolidTrash
                    onClick={() => deleteUser(user.id)}
                    className="cursor-pointer text-[20px] text-iconGray hover:text-gray-700"
                  />
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
