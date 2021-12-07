import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { authState, apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import RateCard from "./RateCard/RateCard.jsx";

import Pagination from "../Common/Pagination/Pagination.jsx";
import RateInputBar from "./RateInputBar/RateInputBar.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import { resetPopupMessage } from "../../../store/slices/apiSlice";
import { fetchRates } from "../../../store/actions/apiActions";
import { pageSize } from "../../../constants/constants";
import { messages } from "../../../constants/messages";
import useModal from "../../../hooks/useModal";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import styles from "./RateList.module.scss";

const RateList = () => {
    const dispatch = useDispatch();
    const popupMessageRef = useRef(null);
    const { push } = useHistory();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const { status, error, rates, rate } = useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardOpened, openCard] = useModal();
    const [isPopupOpened, togglePopup] = useModal();
    const [selectedCard, setSelectedCard] = useState();
    const [popupMessage, setPopupMessage] = useState("");

    useOnClickOutside(popupMessageRef, () => {
        if (isPopupOpened) {
            togglePopup();
            dispatch(resetPopupMessage());
            dispatch(fetchRates());
            setCurrentPage(1);
        }
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
                    <RateInputBar token={token} />

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
