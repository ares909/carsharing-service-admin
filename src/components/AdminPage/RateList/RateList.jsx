import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import classNames from "classnames";
import { authState, apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import RateCard from "./RateCard/RateCard.jsx";

import Pagination from "../Common/Pagination/Pagination.jsx";
import FilterBar from "../Common/FilterBar/FilterBar.jsx";
import CarFilter from "../Common/FilterBar/CarFilter.jsx";
import RateInputBar from "./RateInputBar/RateInputBar.jsx";
// import OrderCardMobile from "./CarCa/OrderCardMobile.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import {
    fetchAllOrders,
    resetSingleOrder,
    fetchCars,
    fetchCities,
    fetchStatuses,
    resetOrder,
    resetError,
    fetchRates,
    resetPopupMessage,
    fetchCategories,
    resetFilteredCars,
    fetchPoints,
    createCity,
    createPoint,
} from "../../../store/slices/apiSlice";
import { messages, pageSize } from "../../../constants/constants";
import { handleRefresh } from "../../../store/slices/authSlice";
import useModal from "../../../hooks/useModal";
import styles from "./RateList.module.scss";

const RateList = () => {
    const dispatch = useDispatch();
    const { cityId } = useParams();
    const { push } = useHistory();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const refreshToken = JSON.parse(localStorage.getItem("token"));
    const {
        cars,
        cities,
        status,
        deletedOrder,
        error,
        apiFilters,
        singleOrder,
        statuses,
        categories,
        filteredCars,
        city,
        points,
        point,
        rates,
        rate,
    } = useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardOpened, openCard] = useModal();
    const [isPopupOpened, togglePopup] = useModal();
    const [selectedCard, setSelectedCard] = useState();
    const [popupMessage, setPopupMessage] = useState("");

    const wrapperClassName = classNames({
        [`${styles.formWrapper}`]: true,
        [`${styles.formWrapperActive}`]: isCardOpened,
    });

    useEffect(() => {
        if (!token) {
            push("/");
        } else if (token && rates.status === "idle") {
            dispatch(fetchRates());
        }
    }, [token, rates.status]);

    useEffect(() => {
        if (error) {
            push("/admin/error");
            // dispatch(resetOrder());
        }
    }, [error]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return rates.data.length > 0 && rates.data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, rates.data]);

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

    useEffect(() => {
        if (rate.statusCode === 200 && rate.postStatus === "posted") {
            if (!isPopupOpened) {
                setPopupMessage(messages.ratePosted);
                togglePopup();
            }
        } else if (rate.postStatus === "deleted") {
            if (!isPopupOpened) {
                setPopupMessage(messages.rateRemoved);
                togglePopup();
            }
        }
    }, [rate.statusCode, rate.postStatus]);

    const outSideClick = (e) => {
        if (isPopupOpened && e.target.classList.length !== 0 && !e.target.className.includes("successPopup")) {
            togglePopup();
            dispatch(resetPopupMessage());
            dispatch(fetchRates());
            setCurrentPage(1);
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
                <SuccessPopup isPopupOpened={isPopupOpened} togglePopup={togglePopup} popupMessage={popupMessage} />
                <div className={styles.orderBox}>
                    <RateInputBar />

                    <div className={styles.orderContainer}>
                        {status === "rejected" && <div className={styles.textMessage}>Ошибка сервера</div>}
                        {rates.status === "loading" && status !== "rejected" && <Preloader />}

                        {currentTableData.length > 0 &&
                            currentTableData.map((item) => (
                                <RateCard key={item.id} rate={item} onClick={onClick} token={token} />
                            ))}
                    </div>
                    <Pagination
                        className={styles.paginationBar}
                        currentPage={currentPage}
                        totalCount={rates.data.length}
                        pageSize={pageSize}
                        onPageChange={changePage}
                    />
                </div>
            </section>
        </>
    );
};

export default RateList;
