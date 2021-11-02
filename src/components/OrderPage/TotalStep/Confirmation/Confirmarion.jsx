import React from "react";
import classNames from "classnames";
import { useLocation, useHistory } from "react-router";
import Button from "../../../Common/UI/Button.jsx";
import styles from "./Confirmation.module.scss";

const Confirmation = ({ toggle, isOpened, onSubmit, address }) => {
    const location = useLocation();
    const { push } = useHistory();
    const className = classNames({
        [`${styles.popupMenu}`]: true,
        [`${styles.active}`]: isOpened,
    });

    const wrapper = classNames({
        [`${styles.wrapper}`]: true,
        [`${styles.wrapperOrder}`]: location.pathname !== "/",
    });

    const handleClose = () => {
        toggle();
    };

    const handleSubmit = () => {
        if (isOpened) toggle();
        onSubmit();
        push(address);
    };

    return (
        <section className={className}>
            <div className={wrapper}>
                <div className={styles.container}>
                    <h2 className={styles.containerTitle}>Подтвердить заказ</h2>
                    <div className={styles.buttonContainer}>
                        <Button className={styles.confirmButton} name="Подтвердить" onClick={handleSubmit} />
                        <Button className={styles.cancelButton} name="Вернуться" onClick={handleClose} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Confirmation;
