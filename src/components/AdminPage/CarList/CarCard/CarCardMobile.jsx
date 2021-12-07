import React from "react";
import { useHistory } from "react-router";
import classNames from "classnames";
import crossButtonBlack from "../../../Common/UI/CrossButton/CrossButtonBlack.jsx";
import Button from "../../../Common/UI/Button.jsx";
import CarBlock from "./CarBlock/CarBlock.jsx";
import { imageUrl } from "../../../../constants/constants";
import { carFirstBlockArray, carSecondBlockArray } from "../../../../constants/carConstants";
import editButton from "../../../../images/admin/editIcon.svg";
import styles from "./CarCard.module.scss";

const OrderCardMobile = ({ car, isCardOpened, openCard, innerRef }) => {
    const { push } = useHistory();
    const orderClassName = classNames({
        [`${styles.orderMobile}`]: true,
        [`${styles.orderDisabled}`]: !isCardOpened,
    });

    const handleChange = () => {
        push(`/admin/carlist/${car.id}`);
        if (isCardOpened) {
            openCard();
        }
    };

    return car ? (
        <div className={orderClassName} ref={innerRef}>
            <div className={styles.orderContainerMobile}>
                <CarBlock
                    type="image"
                    className={styles.orderImageBlockMobile}
                    imageClassName={styles.cardImageMobile}
                    data={
                        // eslint-disable-next-line no-nested-ternary
                        car.thumbnail
                            ? car.thumbnail.path.includes("files")
                                ? imageUrl + car.thumbnail.path
                                : car.thumbnail.path
                            : ""
                    }
                />

                <div className={styles.carMobileInfo}>
                    <CarBlock
                        type="text"
                        className={styles.orderBlockMobile}
                        textClassName={styles.orderTextBlock}
                        data={carFirstBlockArray(car)}
                    />
                    <CarBlock
                        type="text"
                        className={styles.orderBlockMobile}
                        textClassName={styles.orderTextBlock}
                        data={carSecondBlockArray(car)}
                    />
                </div>

                <Button className={styles.buttonMobile} onClick={handleChange}>
                    <img src={editButton} className={styles.orderButtonImage} />
                    <p className={styles.orderButtonText}>Изменить</p>
                </Button>
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
