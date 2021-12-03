import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Checkbox from "../../../Common/UI/Checkbox/Checkbox.jsx";
import Button from "../../../Common/UI/Button.jsx";
import plusButton from "../../../../images/admin/plusButton.svg";
import styles from "./CarColorInput.module.scss";

const CarColorInput = ({ onChange, onClick, colors, colorOption, handleDeleteColor }) => {
    const [disabledState, setDisabledState] = useState(false);
    useEffect(() => {
        if (!colorOption) {
            setDisabledState(true);
        } else if (colorOption) {
            const i = colors.findIndex((v) => v.toLowerCase().includes(colorOption.toLowerCase()));
            if (i > -1) {
                setDisabledState(true);
            } else {
                setDisabledState(false);
            }
        } else setDisabledState(false);
    }, [colorOption, colors]);

    const buttonClassName = classNames({
        [`${styles.button}`]: true,
        [`${styles.buttonDisabled}`]: disabledState,
    });

    return (
        <div className={styles.carColorInput}>
            <label className={styles.inputLabel}>Цвет</label>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    type="text"
                    label="Доступные цвета"
                    placeholder="Цвет"
                    name="color"
                    id="color"
                    onChange={onChange}
                />
                <Button onClick={onClick} type="button" className={buttonClassName} disabled={disabledState}>
                    <img src={plusButton} className={styles.image} />
                </Button>
            </div>
            {colors.length > 0 &&
                colors.map((color, index) => (
                    <Checkbox key={index} name={color} value={color} checked={true} onChange={handleDeleteColor} />
                ))}
        </div>
    );
};
export default CarColorInput;
