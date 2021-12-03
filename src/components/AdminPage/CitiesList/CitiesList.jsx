import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import CityCard from "./CityCard/CityCard.jsx";
import Pagination from "../Common/Pagination/Pagination.jsx";
import CityInputBar from "./CityInputBar/CityInputBar.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import { resetPopupMessage } from "../../../store/slices/apiSlice";
import { fetchCities, fetchCategories } from "../../../store/actions/apiActions";
import { pageSize } from "../../../constants/constants";
import { messages } from "../../../constants/messages";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import useModal from "../../../hooks/useModal";
import styles from "./CitiesList.module.scss";

const CitiesList = () => {
    const dispatch = useDispatch();
    const popupMessageRef = useRef(null);
    const { push } = useHistory();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const { cars, cities, status, error, city } = useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardOpened, openCard] = useModal();
    const [isPopupOpened, togglePopup] = useModal();
    const [selectedCard, setSelectedCard] = useState();
    const [popupMessage, setPopupMessage] = useState("");

    useOnClickOutside(popupMessageRef, () => {
        if (isPopupOpened) {
            togglePopup();
            dispatch(resetPopupMessage());
            dispatch(fetchCities());
        }
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
        }
    }, [error]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return cities.data.length > 0 && cities.data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, cities.data]);

    const onClick = (card) => {
        if (!isCardOpened) {
            openCard();
            setSelectedCard(card);
        }
    };

    useEffect(() => {
        if (city.statusCode === 200 && city.postStatus === "posted") {
            if (!isPopupOpened) {
                setPopupMessage(messages.cityPosted);
                togglePopup();
            }
        } else if (city.postStatus === "deleted") {
            if (!isPopupOpened) {
                setPopupMessage(messages.cityRemoved);
                togglePopup();
            }
        }
    }, [city.statusCode, city.postStatus]);

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
                    <CityInputBar token={token} />

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
