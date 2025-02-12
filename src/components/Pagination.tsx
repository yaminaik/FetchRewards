// src/components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalResults: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalResults }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-8">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-6 py-2 rounded-lg font-semibold transition-all ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"
        }`}
      >
        ← Previous
      </button>

      <span className="px-4 py-2 bg-white shadow rounded-lg text-lg font-semibold">
        Page {currentPage}
      </span>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage * 10 >= totalResults}
        className={`px-6 py-2 rounded-lg font-semibold transition-all ${
          currentPage * 10 >= totalResults ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
