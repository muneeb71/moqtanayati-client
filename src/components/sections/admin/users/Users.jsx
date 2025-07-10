"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UsersTable from "./UsersTable";
import { leftChipIcon, rightChipIcon } from "@/assets/icons/admin-icons";
import { getAllUsers } from "@/lib/api/admin/users/getAllUsers";

const Users = () => {
  console.log("Users component rendered");

  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const toggleRowSelection = (email) => {
    setSelectedRows((prev) =>
      prev.includes(email)
        ? prev.filter((item) => item !== email)
        : [...prev, email]
    );
  };

  const onViewClick = (id) => {
    router.push(`/admin/users/${id}`);
  };

  async function fetchUsers() {
    try {

      console.log('in fetch function');
      const res = await getAllUsers();
            console.log('sfter fetch function ', res);
      const fetchedUsers = res?.data?.users || [];
      const pagination = res?.data?.pagination || {};

      setUsers(fetchedUsers);
      setCurrentPage(pagination.page || 1);
      setRowsPerPage(pagination.limit || 10);
      setTotalPages(pagination.pages || 1);
      setTotalUsers(pagination.total || fetchedUsers.length);
    } catch (e) {
      setUsers([]);
    }
  }

  useEffect(() => {
     console.log("useEffect called, page:", currentPage);
    fetchUsers();
  }, [currentPage]);

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden py-6">
      <div className="flex flex-col gap-3 pb-5">
        <p className="text-[24px] font-semibold leading-none text-russianViolet">
          Users
        </p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-5">
            <p className="text-[18px] font-normal text-davyGray">All Users</p>
            {selectedRows.length > 0 && (
              <p className="text-[13px] font-normal text-davyGray">
                ({selectedRows.length}{" "}
                {selectedRows.length === 1 ? "row" : "rows"} selected)
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="no-scrollbar flex h-full max-h-full w-full max-w-full flex-col overflow-auto rounded-lg">
        <UsersTable
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          currentData={users}
          toggleRowSelection={toggleRowSelection}
          onViewClick={onViewClick}
        />
      </div>

      <div className="flex md:h-20 flex-col md:flex-row md:items-center gap-1 justify-between bg-white py-5 pl-8">
        <p className="text-sm text-customGray">
          Showing {1 + (currentPage - 1) * rowsPerPage} -{" "}
          {Math.min(currentPage * rowsPerPage, totalUsers)} from {totalUsers}
        </p>

        <div className="mr-10 flex items-center gap-2">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-lightBlue/20 text-moonstone hover:bg-moonstone/40 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {leftChipIcon}
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const pageNum = i + 1;
            if (
              i === 0 ||
              i === totalPages - 1 ||
              Math.abs(currentPage - pageNum) <= 1
            ) {
              return (
                <button
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold ${
                    currentPage === pageNum
                      ? "bg-moonstone text-white"
                      : "bg-moonstone/10 text-moonstone hover:bg-moonstone/20"
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            } else if (
              (i === 1 && currentPage > 3) ||
              (i === totalPages - 2 && currentPage < totalPages - 2)
            ) {
              return (
                <span
                  key={i}
                  className="flex size-8 items-end justify-center rounded-lg bg-moonstone/10 pb-2 text-sm text-moonstone"
                >
                  ...
                </span>
              );
            }
          })}

          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-moonstone/10 text-moonstone hover:bg-moonstone/40 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {rightChipIcon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
