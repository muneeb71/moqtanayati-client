"use client";
import { reportData } from "@/lib/report-data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReportTable from "./ReportsTable";
import { leftChipIcon, rightChipIcon } from "@/assets/icons/admin-icons";

const Reports = ({ role }) => { 
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;
  const roleData = reportData.filter(user => user.role === role)
  const totalPages = Math.ceil(roleData.length / rowsPerPage);
  
  const currentData = roleData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const toggleRowSelection = (email) => {
    setSelectedRows((prev) =>
      prev.includes(email)
        ? prev.filter((item) => item !== email)
        : [...prev, email],
    );
  };

  const onViewClick = (id) => {
    router.push(`/admin/reports/${role}/${id}`);
  };
  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden py-6">
      <div className="flex flex-col gap-3 pb-5">
        <p className="text-[24px] font-semibold leading-none text-russianViolet">
          Reports
        </p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-5">
            <p className="text-[18px] font-normal text-davyGray">All {role == "buyer" ? "Buyers" : "Sellers"}</p>
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
        <ReportTable
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          currentData={currentData}
          toggleRowSelection={toggleRowSelection}
          onViewClick={onViewClick}
          role={role}
        />
      </div>
      <div className="flex md:h-20 flex-col md:flex-row md:items-center gap-1 justify-between bg-white py-5 pl-8">
        <p className="text-sm text-customGray">
          Showing {1 + (currentPage - 1) * rowsPerPage} -{" "}
          {Math.min(currentPage * rowsPerPage, roleData.length)} from{" "}
          {roleData.length}
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
            if (
              i === 0 ||
              i === totalPages - 1 ||
              Math.abs(currentPage - (i + 1)) <= 1
            ) {
              return (
                <button
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold ${
                    currentPage === i + 1
                      ? "bg-moonstone text-white"
                      : "bg-moonstone/10 text-moonstone hover:bg-moonstone/20"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
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

export default Reports;
