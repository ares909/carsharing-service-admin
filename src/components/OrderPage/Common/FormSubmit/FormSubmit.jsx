import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import Button from "../../../Common/UI/Button.jsx";
import styles from "./FormSubmit.module.scss";

const FormSubmit = ({ children, price, onSubmit, buttonName, buttonClassName }) => {
    const stateForm = useSelector((state) => state.form);
    return (
        <div className={styles.submitContainer}>
            <h3 className={styles.submitContainerHeader}>Ваш заказ:</h3>
            {stateForm.city && stateForm.point ? (
                <>
                    {children}
                    {/* <div className={styles.pointContainer}>
                        <span className={styles.point}>Пункт выдачи</span>
                        <span className={styles.dots}></span>
                        <div className={styles.text}>
                            <p className={styles.textPart}>{`${stateForm.city},`}</p>
                            <p className={styles.textPart}>{stateForm.point}</p>
                        </div>
                    </div> */}
                    <div className={styles.priceContainer}>
                        <p className={styles.priceTitle}>Цена: </p>
                        <span className={styles.price}>{price}</span>
                    </div>
                </>
            ) : (
                <></>
            )}

            <Button
                disabled={!stateForm.locationValid}
                className={buttonClassName}
                type="button"
                name={buttonName}
                onClick={onSubmit}
            />
        </div>
    );
};

export default FormSubmit;
