import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleAuth, handleRefresh } from "../../store/slices/authSlice";
import Main from "../../components/MainPage/Main/Main.jsx";
import PopupMenu from "../../components/Common/PopupMenu/PopupMenu.jsx";
import SideBar from "../../components/Common/SideBar/SideBar.jsx";
import Slider from "../../components/MainPage/Slider/Slider.jsx";
import useModal from "../../hooks/useModal";
import styles from "./MainPage.module.scss";

const MainPage = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    const refreshToken = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        if (authStatus === "idle" && !refreshToken) {
            dispatch(handleAuth());
        } else if (authStatus === "idle" && refreshToken) {
            dispatch(handleRefresh(refreshToken));
        }
    }, [authStatus, dispatch, refreshToken]);

    const [isOpened, toggle] = useModal();

    return (
        <section className={styles.mainPage}>
            <PopupMenu isOpened={isOpened} toggle={toggle} />
            <SideBar toggle={toggle} />
            <Main toggle={toggle} />
            <Slider />
        </section>
    );
};

export default MainPage;
