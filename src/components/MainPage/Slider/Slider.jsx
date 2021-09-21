import React from "react";
import SliderCard from "./SliderCard/SliderCard.jsx";
import SliderContent from "./SliderContent/SliderContent.jsx";
import Arrow from "./Arrow/Arrow.jsx";
import Dots from "./Dots/Dots.jsx";
import useSlider from "../../../hooks/useSlider";
import slides from "./slides";
import styles from "./Slider.module.scss";

const Slider = () => {
    const { translate, transition, getWidth, activeSlide, nextSlide, prevSlide, slidesToRender } = useSlider(slides);
    return (
        <div className={styles.slider}>
            <SliderContent translate={translate} transition={transition} width={getWidth() * slidesToRender.length}>
                {slidesToRender.map((slide) => {
                    return <SliderCard key={slide.title} content={slide} width={getWidth()} />;
                })}
            </SliderContent>
            <Dots slides={slides} activeSlide={activeSlide} />
            <Arrow onClick={prevSlide} position="left" />
            <Arrow onClick={nextSlide} position="right" />
        </div>
    );
};

export default Slider;
