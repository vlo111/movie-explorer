function Pagination({ page, totalPages, onPageChange }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
            <button
                className="btn"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Previous
            </button>

            <span style={{ color: 'white', padding: '15px' }}>
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
