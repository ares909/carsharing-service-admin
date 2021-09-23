import React from "react";
import PopupMenu from "../../components/Common/PopupMenu/PopupMenu.jsx";
import SideBar from "../../components/Common/SideBar/SideBar.jsx";
import Content from "../../components/OrderPage/Content/Content.jsx";
import useModal from "../../hooks/useModal";
import styles from "./OrderPage.module.scss";

const orderPage = () => {
    const [isOpened, toggle] = useModal();
    return (
        <section className={styles.orderPage}>
            <PopupMenu isOpened={isOpened} toggle={toggle} />
            <SideBar toggle={toggle} />
            <Content toggle={toggle} />
        </section>
    );
};

export default orderPage;
