import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { authState, apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import CarCard from "./CarCard/CarCard.jsx";
import CarCardMobile from "./CarCard/CarCardMobile.jsx";
import Pagination from "../Common/Pagination/Pagination.jsx";
import FilterBar from "../Common/FilterBar/FilterBar.jsx";
import CarFilter from "../Common/FilterBar/CarFilter.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import { fetchCars, resetPopupMessage, fetchCategories } from "../../../store/slices/apiSlice";
import { messages, pageSize } from "../../../constants/constants";
import useModal from "../../../hooks/useModal";
import styles from "./CarList.module.scss";

const CarList = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const { cars, status, error, apiFilters, filteredCars } = useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardOpened, openCard] = useModal();
    const [isPopupOpened, togglePopup] = useModal();
    const [selectedCard, setSelectedCard] = useState();

    const wrapperClassName = classNames({
        [`${styles.formWrapper}`]: true,
        [`${styles.formWrapperActive}`]: isCardOpened,
    });

    useEffect(() => {
        if (!token) {
            push("/");
        } else if (token && cars.status === "idle") {
            dispatch(fetchCars());
            dispatch(fetchCategories());
        }
    }, [token, cars.status]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        if (apiFilters.status === "succeeded") {
            return filteredCars.slice(firstPageIndex, lastPageIndex);
        }
        return cars.data.length > 0 && cars.data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, cars.data, filteredCars]);

    useEffect(() => {
        if (error) {
            push("/admin/error");
        }
    }, [error]);

    const onClick = (card) => {
        if (!isCardOpened) {
            openCard();
            setSelectedCard(card);
        }
    };

    const handleClose = (e) => {
        if (isCardOpened && e.target.classList.length !== 0 && e.target.className.includes("formWrapper")) {
            openCard();
        }
    };

    const outSideClick = (e) => {
        if (isPopupOpened && e.target.classList.length !== 0 && !e.target.className.includes("successPopup")) {
            togglePopup();
            dispatch(resetPopupMessage());
        }
    };
    useEffect(() => {
        document.addEventListener("click", outSideClick);
        document.addEventListener("click", handleClose);

        return () => {
            document.removeEventListener("click", outSideClick);
            document.removeEventListener("click", handleClose);
        };
    });

    return (
        <>
            <section className={styles.orderList}>
                <div className={styles.orderBox}>
                    <CarFilter setCurrentPage={setCurrentPage} />

                    <div className={styles.orderContainer}>
                        {status === "rejected" && <div className={styles.textMessage}>Ошибка сервера</div>}
                        {cars.status === "loading" && status !== "rejected" && <Preloader />}
                        {currentTableData.length === 0 && apiFilters.status === "succeeded" && (
                            <div className={styles.textMessage}>Ничего не найдено</div>
                        )}
                        {currentTableData.length > 0 &&
                            currentTableData.map((car) => (
                                <CarCard key={car.id} car={car} onClick={onClick} token={token} />
                            ))}
                    </div>
                    <Pagination
                        className={styles.paginationBar}
                        currentPage={currentPage}
                        totalCount={filteredCars.length > 0 ? filteredCars.length : cars.count}
                        pageSize={pageSize}
                        onPageChange={changePage}
                    />
                </div>
            </section>
            <div className={wrapperClassName} onClick={handleClose}>
                <CarCardMobile car={selectedCard} isCardOpened={isCardOpened} openCard={openCard} />
            </div>
        </>
    );
};

export default CarList;
