import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import classNames from "classnames";
import notificationIcon from "../../../../images/admin/notificationIcon.svg";
import avatarImage from "../../../../images/admin/avatarImage.jpg";
import dropdown from "../../../../images/admin/dropdownIcon.svg";
import styles from "./AdminHeader.module.scss";
import Button from "../../../Common/UI/Button.jsx";
import burgerMenuButton from "./burgerMenuButton.jsx";
import useModal from "../../../../hooks/useModal";

const AdminHeader = ({ onClick, isOpened, toggle }) => {
    const { push } = useHistory();
    // const [isOpened, toggle] = useModal();
    // const handleOpenModal = () => {
    //     if (!isOpened) {
    //         toggle();
    //     }
    // };
    // const handleCloseModal = () => {
    //     if (isOpened) {
    //         toggle();
    //     }
    // };

    const dropDownClassName = classNames({
        [`${styles.dropdownСontent}`]: true,
        [`${styles.dropdownСontentActive}`]: isOpened,
    });

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        toggle();
        push("/");
    };
    const location = useLocation();
    let title;
    switch (location.pathname) {
        case "/admin/orderlist":
            title = "Заказы";
            break;

        case "/admin/carlist":
            title = "Автомобили";
            break;

        default:
            title = "";
            break;
    }

    return (
        location.pathname !== "/admin" && (
            <header className={styles.adminHeader}>
                <Button className={styles.button} onClick={onClick}>
                    <div className={styles.buttonImage}>{burgerMenuButton}</div>
                </Button>
                <div className={styles.titleBar}>
                    <h1 className={styles.listTitle}>{title}</h1>
                </div>
                <div className={styles.notifications}>
                    <img className={styles.notificationImage} src={notificationIcon} />
                    <div className={styles.notoficationCount}>{12}</div>
                </div>
                <div className={styles.profile}>
                    <img className={styles.avatar} src={avatarImage} />
                    <p className={styles.profileName}>Admin</p>
                    <div className={styles.dropdown}>
                        <Button className={styles.dropdownButton} onClick={toggle}>
                            <img src={dropdown} className={styles.profileButtonImage} />
                        </Button>
                        <div className={dropDownClassName}>
                            <Button name="Профиль" className={styles.profileButton} onClick={toggle} />
                            <Button name="Выйти" className={styles.profileButton} onClick={logout} />
                        </div>
                    </div>

                    {/* <select>
                        <option >
                            Выйти
                        </option>
                    </select> */}
                </div>
            </header>
        )
    );
};

export default AdminHeader;
