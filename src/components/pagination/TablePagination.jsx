const TablePagination = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
}) => {
  const start = 1 + (currentPage - 1) * rowsPerPage;
  const end = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between bg-white py-5 pl-8">
      <p className="text-[14px] text-customGray">
        Showing {start} - {end} from {totalItems}
      </p>

      <div className="mr-10 flex items-center gap-2">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-lightBlue/20 text-moonstone hover:bg-moonstone/40 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
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
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
