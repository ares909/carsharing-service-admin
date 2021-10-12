import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import Button from "../../../Common/UI/Button.jsx";
import styles from "./FormSubmit.module.scss";

const FormSubmit = ({ children, price, onSubmit, buttonName, buttonClassName, isDisabled }) => {
    const stateForm = useSelector((state) => state.form);
    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);
    return city && point ? (
        <div className={styles.submitContainer}>
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
    ) : (
        <></>
    );
};

export default FormSubmit;
