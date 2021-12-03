import React from "react";
import Checkbox from "../../../../Common/UI/Checkbox/Checkbox.jsx";
import CarTextBlock from "../CarTextBlock/CarTextBlock.jsx";
import CarImageBlock from "../CarImageBlock/CarImageBlock.jsx";
import styles from "./CarBlock.module.scss";

const CarBlock = ({ data, className, imageClassName, textClassName, type, descriptionClassName }) => {
    let render;
    switch (type) {
        case "text":
            render = (
                <div className={className}>
                    {data.map((item, index) => (
                        <CarTextBlock key={index} label={item.label} data={item.data} className={textClassName} />
                    ))}
                </div>
            );
            break;
        case "description":
            render = (
                <div className={className}>
                    {data.map((item, index) => (
                        <CarTextBlock
                            key={index}
                            label={item.label}
                            data={item.data}
                            className={textClassName}
                            descriptionClassName={descriptionClassName}
                        />
                    ))}
                </div>
            );
            break;

        case "image":
            render = (
                <div className={className}>
                    <CarImageBlock data={data} className={imageClassName} />
                </div>
            );
            break;

        default:
            render = <></>;
            break;
    }

    return render;
};

export default CarBlock;
