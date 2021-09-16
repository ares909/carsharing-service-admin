import React from "react";
import letftArrow from "../../../images/slider/left-arrow.svg";
import rightArrow from "../../../images/slider/right-arrow.svg";

function Arrow(props) {
    const { position, ...rest } = props;
    return (
        <button className={`slider__arrow slider__arrow_${position === "left" ? "left" : "right"}`} {...rest}>
            <img className="slider__arrow-image" src={position === "left" ? letftArrow : rightArrow} alt="стрелка" />
        </button>
    );
}

export default Arrow;
