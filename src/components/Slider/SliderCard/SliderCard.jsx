import React from "react";
import Button from "../../UI/Button.jsx";

function SliderCard({ content, width }) {
    return (
        // <div className="slider__card-cover">
        <div
            className="slider__card"
            style={{
                width: `${width}px`,
                backgroundImage: `url(${content.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div className="slider__card-container">
                <h3 className="slider__card-title">{content.title}</h3>
                <p className="slider__card-text">{content.text}</p>
                <Button className="slider__card-button" style={{ background: content.color }} name="Подробнее" />
            </div>
        </div>
        // </div>
    );
}

export default SliderCard;
