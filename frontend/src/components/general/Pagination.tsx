import React from 'react';
import {IPaginationProps} from "../../types/components";

const Pagination: React.FC<IPaginationProps> = ({ page, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <button
                className="btn"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Previous
            </button>

            <span className="pagination-info">
                Page {page} of {totalPages}
            </span>

            <button
                className="btn"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
