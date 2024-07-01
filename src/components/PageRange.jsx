import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

function PageRange(props) {
  const { page, pagination, setSearchParams } = props;

  function renderPageNumbers() {
    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(
        <p
          key={i}
          className={`mx-2 ${
            i === page ? "text-blue-500 font-bold" : "text-gray-500"
          }`}
        >
          {i}
        </p>
      );
    }
    return pageNumbers;
  }

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setSearchParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        className={`border-2 border-gray-300 px-3 py-1 rounded-lg mr-2 ${
          page === 1 ? "text-gray-500 cursor-not-allowed" : "text-black"
        }`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft size={28} />
      </button>
      {renderPageNumbers()}
      <button
        className={`border-2 border-gray-300 px-3 py-1 rounded-lg mr-2 ${
          page === pagination.totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "text-black"
        }`}
        disabled={page === pagination.totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

export default PageRange;
