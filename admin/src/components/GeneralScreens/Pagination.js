import React from 'react'
import '../../Css/Pagination.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { TiMinus } from 'react-icons/ti'

const Pagination = ({ page, pages, changePage }) => {
    function numberRange(start, end) {
        const length = Math.max(0, end - start + 1); // +1 so range is inclusive
  return Array.from({ length }, (_, i) => i + start);
    }

    let middlePagination;
    if (!pages || pages < 1) return null;


    if (pages <= 5) {
        middlePagination = [...Array(pages)].map((__, index) => (

            <button
                key={index + 1}
                 onClick={(e) => {
    e.stopPropagation(); // prevent clicks from bubbling to parent links
    changePage(index + 1);
  }} // prevent clicks from bubbling to parent links
                disabled={page === index + 1}
            >
                {index + 1}

            </button>

        ))
    }
    else {
        const startValue = Math.floor((page - 1) / 5) * 5

        middlePagination = (
            <>
                {numberRange(startValue, pages).map((__, index) => (
                    <button
                        key={startValue + index + 1}
                        onClick={() => changePage(startValue + index + 1)}
                        disabled={page === startValue + index + 1}
                    >
                        {startValue + index + 1}
                    </button>

                ))}
                <button>...</button>
                <button

                    onClick={() => changePage(pages)} disabled={page === pages}>
                    {pages}
                </button>
            </>
        );

        if (page > 5) {
            if (pages - page >= 5) {
                middlePagination = (
                    <>
                        <button onClick={() => changePage(1)}>1</button>
                        <button>...</button>
                        <button onClick={() => changePage(startValue)}>{startValue}</button>

                        {numberRange(startValue, pages).map((__, index) => (
                            <button
                                key={startValue + index + 1}
                                onClick={() => changePage(startValue + index + 1)}

                                disabled={page === startValue + index + 1}

                            >
                                {startValue + index + 1}
                            </button>

                        ))}
                        <button>...</button>
                        <button
                            onClick={() => changePage(pages)}>
                            {pages}
                        </button>
                    </>
                )
            }

            else {
                let amountLeft = Math.max(1, pages - 4);
                middlePagination = (
                    <>
                        <button onClick={() => changePage(1)}>1</button>
                        <button>...</button>
                        <button onClick={() => changePage(startValue)}>{startValue}</button>
                        {numberRange(amountLeft, pages).map((__, index) => (
                            <button
                                key={startValue + index + 1}
                                onClick={() => changePage(startValue + index + 1)}

                                disabled={page === startValue + index + 1}

                                style={pages < startValue + index + 1 ? { display: "none" } : null}
                            >
                                {startValue + index + 1}
                            </button>

                        ))}

                    </>
                )
            }
        }


    }



    return (

        pages > 1 && (


            <div className="pagination">

                <button className='pagination__prev'
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                >
                    {page === 1 ? <TiMinus color='gray' /> :
                        <FaChevronLeft />

                    }

                </button>

                {middlePagination}


                <button className='pagination__next'
                    onClick={() => changePage(page + 1)}
                    disabled={page === pages}
                >
                    {page === pages ? <TiMinus color='gray' /> :
                        <FaChevronRight />

                    }
                </button>

            </div>

        )

    );
}

export default Pagination