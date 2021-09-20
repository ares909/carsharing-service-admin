import React from "react";
import Main from "../../components/MainPage/Main/Main.jsx";
import PopupMenu from "../../components/PopupMenu/PopupMenu.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import Slider from "../../components/MainPage/Slider/Slider.jsx";
import useModal from "../../hooks/useModal";
import styles from "./MainPage.module.scss";

const MainPage = () => {
    const [isOpened, toggle] = useModal();
    return (
        <>
            <section className={styles.mainPage}>
                <PopupMenu isOpened={isOpened} toggle={toggle} />
                <SideBar isOpened={isOpened} toggle={toggle} />
                <Main isOpened={isOpened} toggle={toggle} />
                <Slider />
            </section>
        </>
    );
};

export default MainPage;
