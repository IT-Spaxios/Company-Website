import React from 'react';
import '../../Css/Pagination.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TiMinus } from 'react-icons/ti';

const Pagination = ({ page, pages, changePage }) => {

    // Utility: create inclusive range of numbers
    const numberRange = (start, end) => {
        const length = Math.max(0, end - start + 1);
        return Array.from({ length }, (_, i) => i + start);
    };

    if (!pages || pages < 1) return null;

    let middlePagination = [];

    // Case 1: less than 6 pages, show all
    if (pages <= 5) {
        middlePagination = numberRange(1, pages).map((p) => (
            <button
                key={p}
                onClick={(e) => {
                    e.stopPropagation();
                    changePage(p);
                }}
                disabled={page === p}
                className={page === p ? "active-page" : ""}
            >
                {p}
            </button>
        ));
    } else {
        // Case 2: more than 5 pages, show ellipsis
        const startValue = Math.floor((page - 1) / 5) * 5 + 1;
        const endValue = Math.min(startValue + 4, pages);

        // First page and ellipsis if needed
        if (startValue > 1) {
            middlePagination.push(
                <button
                    key={1}
                    onClick={(e) => { e.stopPropagation(); changePage(1); }}
                >
                    1
                </button>
            );
            middlePagination.push(<span key="start-ellipsis">...</span>);
        }

        // Page buttons in the current block
        numberRange(startValue, endValue).forEach((p) => {
            middlePagination.push(
                <button
                    key={p}
                    onClick={(e) => { e.stopPropagation(); changePage(p); }}
                    disabled={page === p}
                    className={page === p ? "active-page" : ""}
                >
                    {p}
                </button>
            );
        });

        // Last page and ellipsis if needed
        if (endValue < pages) {
            middlePagination.push(<span key="end-ellipsis">...</span>);
            middlePagination.push(
                <button
                    key={pages}
                    onClick={(e) => { e.stopPropagation(); changePage(pages); }}
                >
                    {pages}
                </button>
            );
        }
    }

    return (
        pages > 1 && (
            <div className="pagination">
                {/* Previous */}
                <button
                    className="pagination__prev"
                    onClick={(e) => { e.stopPropagation(); changePage(page - 1); }}
                    disabled={page === 1}
                >
                    {page === 1 ? <TiMinus color="gray" /> : <FaChevronLeft />}
                </button>

                {/* Page numbers */}
                {middlePagination}

                {/* Next */}
                <button
                    className="pagination__next"
                    onClick={(e) => { e.stopPropagation(); changePage(page + 1); }}
                    disabled={page === pages}
                >
                    {page === pages ? <TiMinus color="gray" /> : <FaChevronRight />}
                </button>
            </div>
        )
    );
};

export default Pagination;
