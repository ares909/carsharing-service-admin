import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    apiAction,
    changeOrder,
    removeOrder,
    resetSingleOrder,
    resetDeletedOrder,
    resetPopupMessage,
} from "../../../../../store/slices/apiSlice";
import { apiData } from "../../../../../store/selectors/selectors";
import Button from "../../../../Common/UI/Button.jsx";
import approveButton from "../../../../../images/admin/approveButton.svg";
import cancelButton from "../../../../../images/admin/cancelButton.svg";
import editButton from "../../../../../images/admin/editIcon.svg";
import styles from "./ButtonBar.module.scss";

const ButtonBar = ({ order, token, className, isCardOpened, openCard }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const { statuses } = useSelector(apiData);
    const [approvedStatusId, setApprovedStatusId] = useState();
    const handleApprove = () => {
        dispatch(resetPopupMessage());
        dispatch(changeOrder({ orderId: order.id, statusId: approvedStatusId }));
        if (isCardOpened) {
            openCard();
        }
    };

    const handleDelete = () => {
        dispatch(resetPopupMessage());
        dispatch(removeOrder({ token, orderId: order.id }));
        if (isCardOpened) {
            openCard();
        }
    };

    const handleChange = () => {
        push(`/admin/orderlist/${order.id}`);
        if (isCardOpened) {
            openCard();
        }
    };

    const approveButtonClassName = classNames({
        [`${styles.orderButton}`]: true,
        [`${styles.orderButtonDisabled}`]:
            !order.cityId || !order.pointId || order.orderStatusId.name === "Подтвержденные",
    });

    useEffect(() => {
        if (statuses.data) {
            setApprovedStatusId(statuses.data[1].id);
        }
    }, [statuses.data]);
    return (
        <div className={className}>
            <Button
                className={approveButtonClassName}
                disabled={!order.cityId || !order.pointId || order.orderStatusId.name === "Подтвержденные"}
                onClick={handleApprove}
            >
                <img src={approveButton} className={styles.orderButtonImage} />
                <p className={styles.orderButtonText}> Готово</p>
            </Button>
            <Button className={styles.orderButton} onClick={handleDelete}>
                <img src={cancelButton} className={styles.orderButtonImage} />
                <p className={styles.orderButtonText}>Отмена</p>
            </Button>
            <Button className={styles.orderButton} onClick={handleChange}>
                <img src={editButton} className={styles.orderButtonImage} />
                <p className={styles.orderButtonText}>Изменить</p>
            </Button>
        </div>
    );
};

export default ButtonBar;
