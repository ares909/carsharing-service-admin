import React from "react";
import Main from "../../components/Main/Main.jsx";
import PopupMenu from "../../components/PopupMenu/PopupMenu.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import Slider from "../../components/Slider/Slider.jsx";
import useModal from "../../hooks/useModal";

function MainPage() {
    const [isOpened, toggle] = useModal();
    return (
        <>
            <section className="main-page">
                <PopupMenu isOpened={isOpened} toggle={toggle} />
                <SideBar isOpened={isOpened} toggle={toggle} />
                <Main isOpened={isOpened} />
                <Slider />
            </section>
        </>
    );
}

export default MainPage;
