"use client";
import { reportData } from "@/lib/report-data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReportTable from "./ReportsTable";
import { leftChipIcon, rightChipIcon } from "@/assets/icons/admin-icons";
import { getReport } from "@/lib/api/admin/reports/getReport";

const Reports = ({ role }) => {
  const [detail, setDetail] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  const roleData = reportData.filter((user) => user.role === role);
  const totalPages = Math.ceil(roleData.length / rowsPerPage);

  const currentData = roleData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const onViewClick = (id) => {
    router.push(`/admin/reports/${id}`);
  };

  async function fetchReportData() {
    try {
      setIsDetailLoading(true);
      const res = await getReport(role);
      console.log("report 1 : ", res.data);

      const fetchReport = res.data || [];
      console.log("report  2 : ", fetchReport);
      setDetail(fetchReport);
    } catch (error) {
      setDetail([]);
    } finally {
      setIsDetailLoading(false);
    }
  }

  useEffect(() => {
    fetchReportData();
  }, [role]);

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden py-6">
      <div className="flex flex-col gap-3 pb-5">
        <p className="text-[24px] font-semibold leading-none text-russianViolet">
          Reports
        </p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-5">
            <p className="text-[18px] font-normal text-davyGray">
              All {role == "buyer" ? "Buyers" : "Sellers"}
            </p>
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
          currentData={detail}
          toggleRowSelection={toggleRowSelection}
          onViewClick={onViewClick}
          role={role}
          loading={isDetailLoading}
        />
      </div>
      <div className="flex flex-col justify-between gap-1 bg-white py-5 pl-8 md:h-20 md:flex-row md:items-center">
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
