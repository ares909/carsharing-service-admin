import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { authState, apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import OrderCard from "./OrderCard/OrderCard.jsx";
import Pagination from "../Common/Pagination/Pagination.jsx";
import FilterBar from "../Common/FilterBar/FilterBar.jsx";
import OrderCardMobile from "./OrderCard/OrderCardMobile.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import {
    resetSingleOrder,
    resetOrder,
    apiAction,
    resetPopupMessage,
    resetApiFilters,
} from "../../../store/slices/apiSlice";
import {
    fetchCities,
    fetchCategories,
    fetchAllOrders,
    fetchCars,
    fetchStatuses,
    fetchRates,
} from "../../../store/actions/apiActions";
import { pageSize } from "../../../constants/constants";
import { messages } from "../../../constants/messages";
import { handleRefresh } from "../../../store/actions/authActions";
import useModal from "../../../hooks/useModal";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import styles from "./OrderList.module.scss";

const OrderList = () => {
    const dispatch = useDispatch();
    const cardRef = useRef(null);
    const popupMessageRef = useRef(null);

    const { push } = useHistory();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const refreshToken = JSON.parse(localStorage.getItem("token"));
    const { cars, ordersData, status, deletedOrder, error, apiFilters, singleOrder, filteredCars } =
        useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardOpened, openCard] = useModal();
    const [isPopupOpened, togglePopup] = useModal();
    const [selectedCard, setSelectedCard] = useState();
    const [popupMessage, setPopupMessage] = useState("");

    const wrapperClassName = classNames({
        [`${styles.formWrapper}`]: true,
        [`${styles.formWrapperActive}`]: isCardOpened,
    });

    useOnClickOutside(cardRef, () => {
        if (isCardOpened) {
            openCard();
        }
    });
    useOnClickOutside(popupMessageRef, () => {
        if (isPopupOpened) {
            togglePopup();
            dispatch(resetPopupMessage());
        }
    });
    useEffect(() => {
        if (apiFilters.status === "carsFiltered") {
            dispatch(resetApiFilters());
            setCurrentPage(1);
            dispatch(fetchAllOrders({ token, filters: { page: currentPage - 1, limit: pageSize } }));
            dispatch(apiAction({ filteredCars: [] }));
        }
    }, [apiFilters.status, filteredCars.length]);

    useEffect(() => {
        if (!token) {
            push("/");
        } else if (token && ordersData.status === "idle") {
            dispatch(
                fetchAllOrders({ token, filters: { page: currentPage - 1, limit: pageSize, ...apiFilters.filters } }),
            );
            dispatch(fetchCars());
            dispatch(fetchCities());
            dispatch(fetchStatuses());
            dispatch(fetchRates());
            dispatch(fetchCategories());
            dispatch(handleRefresh(refreshToken));
        }
    }, [ordersData.status, token]);

    const changePage = (page) => {
        setCurrentPage(page);
        dispatch(fetchAllOrders({ token, filters: { page: page - 1, limit: pageSize, ...apiFilters.filters } }));
    };

    useEffect(() => {
        if (error) {
            push("/admin/error");
            dispatch(resetOrder());
        }
    }, [error]);

    const onClick = (order) => {
        if (!isCardOpened) {
            openCard();
            setSelectedCard(order);
        }
    };

    useEffect(() => {
        if (singleOrder.statusCode === 200 && singleOrder.status === "approved") {
            if (!isPopupOpened) {
                setPopupMessage(messages.orderConfirmed);
                togglePopup();
            }
            dispatch(
                fetchAllOrders({ token, filters: { page: currentPage - 1, limit: pageSize, ...apiFilters.filters } }),
            );
        }
    }, [singleOrder.statusCode, singleOrder.data.id]);

    useEffect(() => {
        if (deletedOrder.statusCode === 200 && deletedOrder.status === "deleted") {
            if (!isPopupOpened) {
                setPopupMessage(messages.orderRemoved);
                togglePopup();
            }
            dispatch(
                fetchAllOrders({
                    token,
                    filters: { page: currentPage - 1, limit: pageSize, ...apiFilters.filters },
                }),
            );
        }
    }, [deletedOrder.statusCode]);

    return (
        <>
            <section className={styles.orderList}>
                <SuccessPopup
                    isPopupOpened={isPopupOpened}
                    togglePopup={togglePopup}
                    popupMessage={popupMessage}
                    innerRef={popupMessageRef}
                />
                <div className={styles.orderBox}>
                    <FilterBar token={token} limit={pageSize} setCurrentPage={setCurrentPage} />

                    <div className={styles.orderContainer}>
                        {status === "rejected" && <div className={styles.textMessage}>Ошибка сервера</div>}
                        {ordersData.status === "loading" && status !== "rejected" && <Preloader />}
                        {cars.status === "loading" && status !== "rejected" && <Preloader />}
                        {ordersData.data.length === 0 && apiFilters.status === "ordersFiltered" && (
                            <div className={styles.textMessage}>Ничего не найдено</div>
                        )}
                        {ordersData.data &&
                            ordersData.data.length > 0 &&
                            ordersData.data.map((order) => (
                                <OrderCard key={order.id} order={order} onClick={onClick} token={token} />
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
            <div className={wrapperClassName}>
                <OrderCardMobile
                    order={selectedCard}
                    isCardOpened={isCardOpened}
                    openCard={openCard}
                    token={token}
                    innerRef={cardRef}
                />
            </div>
        </>
    );
};

export default OrderList;
