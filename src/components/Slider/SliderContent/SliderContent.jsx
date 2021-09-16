import React from "react";

function SliderContent({ translate, transition, width, children }) {
    return (
        <div
            className="slider__content"
            style={{
                transform: `translateX(-${translate}px)`,
                transition: `transform ease-out ${transition}s`,
                width: `${width}px`,
            }}
        >
            {children}
        </div>
    );
}

export default SliderContent;
