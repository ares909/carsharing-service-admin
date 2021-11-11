import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../../../hooks/usePagination";
import styles from "./Pagination.module.scss";

const Pagination = (props) => {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className={classnames([`${styles.paginationContainer}`], { [className]: className })}>
            <li
                className={classnames([`${styles.paginationItem}`], {
                    [`${styles.disabled}`]: currentPage === 1,
                })}
                onClick={onPrevious}
            >
                <div className={classnames([`${styles.arrow}`], [`${styles.left}`])} />
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return (
                        <li key={index} className={classnames([`${styles.paginationItem}`], [`${styles.dots}`])}>
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={index}
                        className={classnames([`${styles.paginationItem}`], {
                            [`${styles.selected}`]: pageNumber === currentPage,
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames([`${styles.paginationItem}`], {
                    [`${styles.disabled}`]: currentPage === lastPage,
                })}
                onClick={onNext}
            >
                <div className={classnames([`${styles.arrow}`], [`${styles.right}`])} />
            </li>
        </ul>
    );
};

export default Pagination;
