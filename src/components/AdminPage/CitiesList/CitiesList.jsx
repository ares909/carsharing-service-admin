import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { authState, apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import CityCard from "./CityCard/CityCard.jsx";
// import CarCardMobile from "./CarCard/CarCardMobile.jsx.js";
import Pagination from "../Common/Pagination/Pagination.jsx";
import FilterBar from "../Common/FilterBar/FilterBar.jsx";
import CarFilter from "../Common/FilterBar/CarFilter.jsx";
import CityInputBar from "./CityInputBar/CityInputBar.jsx";
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
    createCity,
} from "../../../store/slices/apiSlice";
import { messages, pageSize } from "../../../constants/constants";
import { handleRefresh } from "../../../store/slices/authSlice";
import useModal from "../../../hooks/useModal";
import styles from "./CitiesList.module.scss";

const CitiesList = () => {
    const dispatch = useDispatch();
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
        } else if (token && cities.status === "idle") {
            dispatch(fetchCities());
            dispatch(fetchCategories());
        }
    }, [token, cars.status]);

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

        return cities.data.length > 0 && cities.data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, cities.data, filteredCars]);

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
        if (city.statusCode === 200 && city.postStatus === "posted") {
            if (!isPopupOpened) {
                setPopupMessage(messages.cityPosted);
                togglePopup();
            }
        }
    }, [city.statusCode, city.postStatus]);

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
                <SuccessPopup isPopupOpened={isPopupOpened} togglePopup={togglePopup} popupMessage={popupMessage} />
                <div className={styles.orderBox}>
                    <CityInputBar />

                    <div className={styles.orderContainer}>
                        {status === "rejected" && <div className={styles.textMessage}>Ошибка сервера</div>}
                        {cities.status === "loading" && status !== "rejected" && <Preloader />}

                        {currentTableData.length > 0 &&
                            currentTableData.map((item) => (
                                <CityCard key={item.id} city={item} onClick={onClick} token={token} />
                            ))}
                    </div>
                    <Pagination
                        className={styles.paginationBar}
                        currentPage={currentPage}
                        totalCount={cities.data.length}
                        pageSize={pageSize}
                        onPageChange={changePage}
                    />
                </div>
            </section>
        </>
    );
};

export default CitiesList;
