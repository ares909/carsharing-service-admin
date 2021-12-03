import React from "react";
import styles from "./OrderImageBlock.module.scss";

const OrderImageBlock = ({ data, className }) => <img className={className} src={data} alt="нет фото" />;

export default OrderImageBlock;
