import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import classNames from "classnames";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import CarCard from "./CarCard/CarCard.jsx";
import CarCardMobile from "./CarCard/CarCardMobile.jsx";
import Pagination from "../Common/Pagination/Pagination.jsx";
import CarFilter from "../Common/FilterBar/CarFilter.jsx";
import { resetPopupMessage, resetApiFilters } from "../../../store/slices/apiSlice";
import { fetchCars, fetchCategories, fetchAllOrders } from "../../../store/actions/apiActions";
import { pageSize } from "../../../constants/constants";
import { messages } from "../../../constants/messages";
import useModal from "../../../hooks/useModal";
import { authState, apiData } from "../../../store/selectors/selectors";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import styles from "./CarList.module.scss";

const CarList = () => {
    const cardRef = useRef(null);
    const dispatch = useDispatch();
    const { push } = useHistory();
    const { pathname } = useLocation();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const { cars, status, error, apiFilters, filteredCars } = useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardOpened, openCard] = useModal();
    const [selectedCard, setSelectedCard] = useState();

    const wrapperClassName = classNames({
        [`${styles.formWrapper}`]: true,
        [`${styles.formWrapperActive}`]: isCardOpened,
    });

    useOnClickOutside(cardRef, () => {
        if (isCardOpened) {
            openCard();
        }
    });

    useEffect(() => {
        if (apiFilters.status === "ordersFiltered") {
            dispatch(resetApiFilters());
            dispatch(fetchAllOrders({ token, filters: { page: 1, limit: pageSize } }));
        }
    }, [apiFilters.status]);

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
        if (apiFilters.status === "carsFiltered") {
            return filteredCars.slice(firstPageIndex, lastPageIndex);
        }
        return cars.data.length > 0 && cars.data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, cars.data, filteredCars, apiFilters.status]);

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

    return (
        <>
            <section className={styles.orderList}>
                <div className={styles.orderBox}>
                    <CarFilter setCurrentPage={setCurrentPage} />

                    <div className={styles.orderContainer}>
                        {status === "rejected" && <div className={styles.textMessage}>Ошибка сервера</div>}
                        {cars.status === "loading" && status !== "rejected" && <Preloader />}
                        {currentTableData.length === 0 && apiFilters.status === "carsFiltered" && (
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
            <div className={wrapperClassName}>
                <CarCardMobile car={selectedCard} isCardOpened={isCardOpened} openCard={openCard} innerRef={cardRef} />
            </div>
        </>
    );
};

export default CarList;
