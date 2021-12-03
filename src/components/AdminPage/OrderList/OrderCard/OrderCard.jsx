import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import ButtonBar from "./ButtonBar/ButtonBar.jsx";
import OrderBlock from "./OrderBlock/OrderBlock.jsx";
import { imageUrl } from "../../../../constants/constants";

import {
    orderFirstBlockArray,
    orderSecondBlockArray,
    orderThirdBlockArray,
} from "../../../../constants/orderConstants";

import styles from "./OrderCard.module.scss";

const OrderCard = ({ order, onClick, token }) => {
    const handleOpenCard = () => {
        onClick(order);
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            <div className={styles.orderTitle}>
                <p className={styles.orderText}>
                    Заказ № <span className={styles.orderTextBold}>{order.id}</span>
                </p>
                <p className={styles.orderText}>
                    Статус:{" "}
                    <span className={styles.orderTextBold}>
                        {order.orderStatusId ? order.orderStatusId.name : "нет данных"}
                    </span>
                </p>
            </div>
            <div className={styles.orderContainer}>
                <OrderBlock
                    className={styles.orderImageBlock}
                    imageClassName={styles.cardImage}
                    data={
                        // eslint-disable-next-line no-nested-ternary
                        order.carId
                            ? order.carId.thumbnail.path.includes("files")
                                ? imageUrl + order.carId.thumbnail.path
                                : order.carId.thumbnail.path
                            : ""
                    }
                    type="image"
                />
                <OrderBlock
                    className={styles.orderCarBlock}
                    textClassName={styles.orderTextBlock}
                    data={orderFirstBlockArray(order)}
                    type="text"
                />
                <OrderBlock
                    className={styles.orderExtraBlock}
                    data={orderSecondBlockArray(order)}
                    textClassName={styles.orderTextBlock}
                    type="text"
                />
                <OrderBlock className={styles.orderCheckBoxBlock} data={orderThirdBlockArray(order)} type="checkbox" />
                <ButtonBar order={order} token={token} className={styles.buttonContainer} />
            </div>
        </div>
    );
};
export default OrderCard;
