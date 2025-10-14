import { useState, useEffect } from "react";

function Pagination({ totalItems = 0, itemsPerPage = 10, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    useEffect(() => {
        onPageChange(currentPage);
    }, [currentPage]);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center mt-8">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400 transition hover:bg-indigo-700"
            >
                Previous
            </button>

            <span className="text-sm lg:text-lg my-2 lg:my-0">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400 transition hover:bg-indigo-700"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
