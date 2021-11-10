import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { authState, apiData } from "../../../store/selectors/selectors";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import OrderCard from "./OrderCard/OrderCard.jsx";
import styles from "./OrderList.module.scss";
import { fetchAllOrders } from "../../../store/slices/apiSlice";
import { pageSize } from "../../../constants/constants";
import Pagination from "../Common/Pagination/Pagination.jsx";
import FilterBar from "../Common/FilterBar/FilterBar.jsx";

const OrderList = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const refreshToken = JSON.parse(localStorage.getItem("token"));
    const { error, user } = useSelector(authState);
    const { ordersData, status } = useSelector(apiData);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!refreshToken) {
            push("/admin");
        } else if (refreshToken && ordersData.status === "idle") {
            dispatch(fetchAllOrders());
        }
    }, [refreshToken, ordersData.status]);
    // eslint-disable-next-line consistent-return
    const currentData = useMemo(() => {
        if (ordersData.data.length > 0) {
            const firstPageIndex = (currentPage - 1) * pageSize;
            const lastPageIndex = firstPageIndex + pageSize;
            return ordersData.data.slice(firstPageIndex, lastPageIndex);
        }
    }, [currentPage, ordersData]);

    return (
        <section className={styles.orderList}>
            <h1 className={styles.orderListTitle}>Заказы</h1>
            <div className={styles.orderBox}>
                <FilterBar />
                {status === "rejected" && <div>Ошибка сервера</div>}
                {ordersData.status === "loading" && status !== "rejected" && <Preloader />}
                {currentData &&
                    currentData.length > 0 &&
                    currentData.map((order) => <OrderCard key={order.id} order={order} />)}
                <Pagination
                    className={styles.paginationBar}
                    currentPage={currentPage}
                    totalCount={ordersData.data.length}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </section>
    );
};

export default OrderList;
