import React from "react";
import Checkbox from "../../../../Common/UI/Checkbox/Checkbox.jsx";
import OrderTextBlock from "../OrderTextBlock/OrderTextBlock.jsx";
import OrderImageBlock from "../OrderImageBlock/OrderImageBlock.jsx";
import styles from "./OrderBlock.module.scss";

const OrderBlock = ({ data, className, imageClassName, textClassName, type }) => {
    let render;
    switch (type) {
        case "text":
            render = (
                <div className={className}>
                    {data.map((item, index) => (
                        <OrderTextBlock key={index} label={item.label} data={item.data} className={textClassName} />
                    ))}
                </div>
            );
            break;
        case "checkbox":
            render = (
                <div className={className}>
                    {data.map((item, index) => (
                        <Checkbox
                            key={index}
                            name={item.name}
                            value={item.value}
                            checked={item.value === true}
                            onChange={() => {}}
                        />
                    ))}
                </div>
            );
            break;

        case "image":
            render = (
                <div className={className}>
                    <OrderImageBlock data={data} className={imageClassName} />
                </div>
            );
            break;

        default:
            return null;
    }

    return render;
};

export default OrderBlock;
