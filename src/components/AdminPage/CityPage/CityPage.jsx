import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import PointCard from "./PointCard/PointCard.jsx";
import Pagination from "../Common/Pagination/Pagination.jsx";
import PointInputBar from "./PointInputBar/PointInputBar.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import { resetPopupMessage, fetchPoints } from "../../../store/slices/apiSlice";
import { messages, pageSize } from "../../../constants/constants";
import useModal from "../../../hooks/useModal";
import styles from "./CityPage.module.scss";

const CityPage = () => {
    const dispatch = useDispatch();
    const { cityId } = useParams();
    const { push } = useHistory();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const { status, error, points, point } = useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardOpened, openCard] = useModal();
    const [isPopupOpened, togglePopup] = useModal();
    const [selectedCard, setSelectedCard] = useState();
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        if (!token) {
            push("/");
        }
    }, [token]);

    useEffect(() => {
        if (cityId) {
            dispatch(fetchPoints(cityId));
        }
    }, [cityId]);

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

        return points.data.length > 0 && points.data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, points.data]);

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
        if (point.statusCode === 200 && point.postStatus === "posted") {
            if (!isPopupOpened) {
                setPopupMessage(messages.pointPosted);
                togglePopup();
            }
        } else if (point.postStatus === "deleted") {
            if (!isPopupOpened) {
                dispatch(fetchPoints(cityId));
                setPopupMessage(messages.pointDeleted);
                togglePopup();
            }
        }
    }, [point.statusCode, point.postStatus]);

    const outSideClick = (e) => {
        if (isPopupOpened && e.target.classList.length !== 0 && !e.target.className.includes("successPopup")) {
            togglePopup();
            dispatch(resetPopupMessage());
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
                    <PointInputBar cityId={cityId} />

                    <div className={styles.orderContainer}>
                        {status === "rejected" && <div className={styles.textMessage}>Ошибка сервера</div>}
                        {points.status === "loading" && status !== "rejected" && <Preloader />}

                        {currentTableData.length > 0 &&
                            currentTableData.map((item) => (
                                <PointCard key={item.id} point={item} onClick={onClick} token={token} cityId={cityId} />
                            ))}
                    </div>
                    <Pagination
                        className={styles.paginationBar}
                        currentPage={currentPage}
                        totalCount={points.data.length}
                        pageSize={pageSize}
                        onPageChange={changePage}
                    />
                </div>
            </section>
        </>
    );
};

export default CityPage;
