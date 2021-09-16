import React from "react";

function Dot({ active }) {
    return <span className={`slider__dot ${active ? "slider__dot_active" : ""}`}></span>;
}

function Dots({ slides, activeSlide }) {
    return (
        <div className="slider__dots-container">
            {slides.map((slide, i) => (
                <Dot key={slide.title} active={activeSlide === i} />
            ))}
        </div>
    );
}

export default Dots;
