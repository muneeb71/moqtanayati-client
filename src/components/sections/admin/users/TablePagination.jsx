import React from 'react'

const TablePagination = () => {
  return (
    <div className="flex items-center justify-between bg-white py-5 pl-8">
    <p className="text-[14px] text-customGray">
      Showing {1 + (currentPage - 1) * rowsPerPage} -{" "}
      {Math.min(currentPage * rowsPerPage, usersData.length)} from{" "}
      {usersData.length}
    </p>

    <div className="mr-10 flex items-center gap-2">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-lightBlue/20 text-moonstone hover:bg-moonstone/40 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ◀
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
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-[14px] font-semibold ${
                currentPage === i + 1
                  ? "bg-moonstone text-white"
                  : "text-moonstone hover:bg-moonstone/20"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          );
        } else if (i === 1 || i === totalPages - 2) {
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
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        ▶
      </button>
    </div>
  </div>
  )
}

export default TablePagination