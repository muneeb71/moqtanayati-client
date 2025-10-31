"use client";
import useTranslation from "@/hooks/useTranslation";
const TablePagination = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const safePage = Math.max(1, Number(currentPage) || 1);
  const safeRows = Number(rowsPerPage) || 0;
  const safeTotal = Number(totalItems) || 0;
  const start = safeTotal === 0 ? 0 : 1 + (safePage - 1) * safeRows;
  const end = Math.min(safePage * safeRows, safeTotal);

  return (
    <div className="flex items-center justify-between bg-white py-5 pl-8">
      <p className="text-[14px] text-customGray">
        {t("admin.pagination.showing")
          .replace("{start}", String(start))
          .replace("{end}", String(end))
          .replace("{total}", String(totalItems))}
      </p>

      <div className="mr-10 flex items-center gap-2">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-lightBlue/20 text-moonstone hover:bg-moonstone/40 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label={t("admin.pagination.prev")}
        >
          ◀
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
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-[14px] font-semibold ${
                  currentPage === pageNum
                    ? "bg-moonstone text-white"
                    : "text-moonstone hover:bg-moonstone/20"
                }`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          } else if (
            (i === 1 && currentPage > 3) ||
            (i === totalPages - 2 && currentPage < totalPages - 2)
          ) {
            return (
              <span key={i} className="px-2 text-[14px] text-gray-400">
                ...
              </span>
            );
          }
        })}

        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-lightBlue/20 text-moonstone hover:bg-moonstone/40 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label={t("admin.pagination.next")}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
