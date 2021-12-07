import React from "react";
import styles from "./CarImageBlock.module.scss";

const CarImageBlock = ({ data, className }) => <img className={className} src={data} alt="нет фото" />;

export default CarImageBlock;
