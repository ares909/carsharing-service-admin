import React from "react";
import classNames from "classnames";
import Checkbox from "../../../Common/UI/Checkbox/Checkbox.jsx";
import crossButtonBlack from "../../../Common/UI/CrossButton/CrossButtonBlack.jsx";
import ButtonBar from "./ButtonBar/ButtonBar.jsx";
import Button from "../../../Common/UI/Button.jsx";
import OrderBlock from "./OrderBlock/OrderBlock.jsx";
import { imageUrl } from "../../../../constants/constants";
import {
    orderFirstBlockArray,
    orderSecondBlockArray,
    orderThirdBlockArray,
} from "../../../../constants/orderConstants";
import styles from "./OrderCard.module.scss";

const OrderCardMobile = ({ order, onClick, isCardOpened, openCard, token, innerRef }) => {
    const orderClassName = classNames({
        [`${styles.orderMobile}`]: true,
        [`${styles.orderDisabled}`]: !isCardOpened,
    });

    return order ? (
        <div className={orderClassName} ref={innerRef}>
            <div className={styles.orderTitleMobile}>
                <p className={styles.orderText}>
                    Заказ № <span className={styles.orderTextBoldMobile}>{order.id}</span>
                </p>
                <p className={styles.orderText}>
                    Статус:{" "}
                    <span className={styles.orderTextBoldMobile}>
                        {order.orderStatusId ? order.orderStatusId.name : "нет данных"}
                    </span>
                </p>
            </div>
            <div className={styles.orderContainerMobile}>
                <OrderBlock
                    className={styles.orderBlockMobile}
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
                    className={styles.orderBlockMobile}
                    textClassName={styles.orderTextBlock}
                    data={orderFirstBlockArray(order)}
                    type="text"
                />
                <OrderBlock
                    className={styles.orderBlockMobile}
                    textClassName={styles.orderTextBlock}
                    data={orderSecondBlockArray(order)}
                    type="text"
                />
                <OrderBlock className={styles.orderBlockMobile} data={orderThirdBlockArray(order)} type="checkbox" />
                <ButtonBar
                    order={order}
                    token={token}
                    isCardOpened={isCardOpened}
                    openCard={openCard}
                    className={styles.buttonContainerMobile}
                />
            </div>
            <Button type="button" onClick={openCard} className={styles.crossButton}>
                {crossButtonBlack}
            </Button>
        </div>
    ) : (
        <></>
    );
};
export default OrderCardMobile;
