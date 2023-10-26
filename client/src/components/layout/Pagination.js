import React, { useState } from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const [pageNumber, setPageNumber] = useState(currentPage);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (page) => {
        setPageNumber(page);
        onPageChange(page);
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    disabled={i === pageNumber}
                    className={`btn ${i === pageNumber ? 'btn-light' : 'btn-active'}`}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    return <div>{renderPaginationButtons()}</div>;
};

export default Pagination;