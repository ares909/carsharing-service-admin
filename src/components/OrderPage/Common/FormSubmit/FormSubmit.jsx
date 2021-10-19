import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import Button from "../../../Common/UI/Button.jsx";
import crossButtoBlack from "../../../Common/UI/CrossButton/CrossButtonBlack.jsx";
import styles from "./FormSubmit.module.scss";

const FormSubmit = ({
    children,
    onSubmit,
    buttonName,
    buttonClassName,
    isDisabled,
    isOpened,

    toggle,
}) => {
    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);

    const className = classNames({
        [`${styles.submitContainer}`]: true,
        [`${styles.submitMobile}`]: true,
        [`${styles.submitMobileActive}`]: isOpened,
    });

    return (
        city &&
        point && (
            <div className={className}>
                <Button type="button" toggle={toggle} className={styles.crossButton}>
                    {crossButtoBlack}
                </Button>
                <h3 className={styles.submitContainerHeader}>Ваш заказ:</h3>
                {children}

                <Button
                    disabled={isDisabled}
                    className={buttonClassName}
                    type="button"
                    name={buttonName}
                    onClick={onSubmit}
                />
            </div>
        )
    );
};

export default FormSubmit;
