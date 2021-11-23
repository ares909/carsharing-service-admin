import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import crossButton from "../CrossButton/CrossButton.jsx";
import Button from "../Button.jsx";
import { resetPopupMessage } from "../../../../store/slices/apiSlice";
import approveButtonWhite from "../../../../images/admin/approveButtonWhite.svg";
import styles from "./SuccessPopup.module.scss";

const SuccessPopup = ({ isPopupOpened, togglePopup, popupMessage }) => {
    const dispatch = useDispatch();
    const popupClassName = classNames({
        [`${styles.successPopup}`]: true,
        [`${styles.successPopupActive}`]: isPopupOpened,
    });

    const resetState = () => {
        dispatch(resetPopupMessage());
        togglePopup();
    };
    return (
        <div className={popupClassName}>
            <div className={styles.messageBox}>
                <img src={approveButtonWhite} className={styles.image} />
                <p className={styles.text}>{popupMessage}</p>
            </div>
            <Button className={styles.closeButton} onClick={resetState}>
                {" "}
                {crossButton}
            </Button>
        </div>
    );
};

export default SuccessPopup;
