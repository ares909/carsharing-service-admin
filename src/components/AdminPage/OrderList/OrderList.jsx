import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { authState, apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import OrderCard from "./OrderCard/OrderCard.jsx";
import styles from "./OrderList.module.scss";
import {
    fetchAllOrders,
    apiAction,
    fetchCars,
    fetchCities,
    fetchStatuses,
    resetOrder,
} from "../../../store/slices/apiSlice";
import { handleRefresh } from "../../../store/slices/authSlice";
import { pageSize } from "../../../constants/constants";

import Pagination from "../Common/Pagination/Pagination.jsx";
import FilterBar from "../Common/FilterBar/FilterBar.jsx";
import useModal from "../../../hooks/useModal";
import OrderCardMobile from "./OrderCard/OrderCardMobile.jsx";

const OrderList = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const refreshToken = JSON.parse(localStorage.getItem("token"));
    const { cars, ordersData, status, filteredOrders, error, apiFilters } = useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardOpened, openCard] = useModal();
    const [selectedCard, setSelectedCard] = useState();

    const wrapperClassName = classNames({
        [`${styles.formWrapper}`]: true,
        [`${styles.formWrapperActive}`]: isCardOpened,
    });

    // else if (token && ordersData.status === "idle") {
    //     dispatch(fetchAllOrders({ token, page: currentPage, limit: pageSize }));
    //     dispatch(handleRefresh(refreshToken));
    // }

    useEffect(() => {
        if (!token) {
            push("/");
        } else if (token && ordersData.status === "idle") {
            dispatch(fetchAllOrders({ token, filters: { page: 1, limit: pageSize, ...apiFilters.filters } }));
            dispatch(fetchCars());
            dispatch(fetchCities());
            dispatch(fetchStatuses());
            dispatch(handleRefresh(refreshToken));
        }
    }, [ordersData.status, token]);

    const changePage = (page) => {
        setCurrentPage(page);
        dispatch(fetchAllOrders({ token, filters: { page, limit: pageSize, ...apiFilters.filters } }));
    };

    useEffect(() => {
        if (error && status === "rejected") {
            push("/admin/error");
            dispatch(resetOrder());
        }
    }, [error, status]);

    const onClick = (order) => {
        if (!isCardOpened) {
            openCard();
            setSelectedCard(order);
        }
    };

    const handleClose = (e) => {
        if (isCardOpened && e.target.classList.length !== 0 && e.target.className.includes("formWrapper")) {
            openCard();
        }
    };

    return (
        <>
            <section className={styles.orderList}>
                <div className={styles.orderBox}>
                    <FilterBar token={token} limit={pageSize} setCurrentPage={setCurrentPage} />

                    <div className={styles.orderContainer}>
                        {status === "rejected" && <div className={styles.textMessage}>Ошибка сервера</div>}
                        {ordersData.status === "loading" && status !== "rejected" && <Preloader />}
                        {cars.status === "loading" && status !== "rejected" && <Preloader />}
                        {ordersData.data.length === 0 && apiFilters.status === "filtered" && (
                            <div className={styles.textMessage}>Ничего не найдено</div>
                        )}
                        {ordersData.data &&
                            ordersData.data.length > 0 &&
                            ordersData.data.map((order) => (
                                <OrderCard key={order.id} order={order} onClick={onClick} />
                            ))}
                    </div>
                    <Pagination
                        className={styles.paginationBar}
                        currentPage={currentPage}
                        totalCount={ordersData.count}
                        pageSize={pageSize}
                        onPageChange={changePage}
                    />
                </div>
            </section>
            <div className={wrapperClassName} onClick={handleClose}>
                <OrderCardMobile order={selectedCard} isCardOpened={isCardOpened} openCard={openCard} />
            </div>
        </>
    );
};

export default OrderList;
