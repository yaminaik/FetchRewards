import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalResults: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalResults }: PaginationProps) => {
  const totalPages = useMemo(() => Math.ceil(totalResults / 10), [totalResults]);

  return (
    <div className="flex justify-center items-center gap-6 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-6 py-2 rounded-lg font-semibold transition-all ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"
        }`}
      >
        ← Previous
      </button>

      {/* Page Indicator */}
      <span className="px-4 py-2 bg-white shadow rounded-lg text-lg font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-6 py-2 rounded-lg font-semibold transition-all ${
          currentPage >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
