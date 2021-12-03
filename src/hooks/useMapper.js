import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiData } from "../store/selectors/selectors";
import useNumberFormat from "./useNumberFormat";
import useConbertToBase64 from "./useConvertBase64";

const useMapper = () => {
    const { orderPrice } = useSelector(apiData);
    const [convertNumber, convertCarNumber] = useNumberFormat();

    const mapObject = ({ data, dataType }) => {
        let values;
        switch (dataType) {
            case "orderDefaultValues":
                values = {
                    city: data.cityId
                        ? {
                              value: data.cityId.name,
                              label: data.cityId.name,
                              id: data.cityId.id,
                          }
                        : "",
                    address: data.pointId
                        ? {
                              value: data.pointId.address,
                              label: data.pointId.address,
                              id: data.pointId.id,
                          }
                        : "",

                    car: data.carId
                        ? {
                              value: data.carId.name,
                              label: data.carId.name,
                              id: data.carId.id,
                          }
                        : "",

                    color: data
                        ? {
                              value: data.color,
                              label: data.color,
                              id: data.color,
                          }
                        : "",
                    rate: data.rateId
                        ? {
                              value: data.rateId.rateTypeId ? data.rateId.rateTypeId.name : "",
                              label: data.rateId.rateTypeId ? data.rateId.rateTypeId.name : "",
                              id: data.rateId.id,
                              price: data.rateId.price,
                          }
                        : "",
                    status: data.orderStatusId
                        ? {
                              value: data.orderStatusId.name,
                              label: data.orderStatusId.name,
                              id: data.orderStatusId.id,
                          }
                        : "",
                    price: data.price
                        ? {
                              value: data.price,
                              label: data.price,
                              id: data.price,
                          }
                        : "",
                    isFullTank: {
                        value: data.isFullTank,
                        label: data.isFullTank === true ? "Да" : "Нет",
                    },

                    isNeedChildChair: {
                        value: data.isNeedChildChair,
                        label: data.isNeedChildChair === true ? "Да" : "Нет",
                    },

                    isRightWheel: {
                        value: data.isRightWheel,
                        label: data.isRightWheel === true ? "Да" : "Нет",
                    },
                };
                break;
            case "order":
                values = {
                    orderStatusId: data.status.id,
                    cityId: data.city.id,
                    pointId: data.address.id,
                    carId: data.car.id,
                    color: data.color.value,
                    rateId: data.rate.id,
                    price: orderPrice,
                    isFullTank: data.isFullTank.value,
                    isNeedChildChair: data.isNeedChildChair.value,
                    isRightWheel: data.isRightWheel.value,
                };

                break;

            case "selectedCarDefaulValues":
                values = {
                    name: data.name ? data.name : "",
                    number: data.number ? data.number : "",
                    category: data.categoryId
                        ? {
                              value: data.categoryId,
                              label: data.categoryId.name,
                              id: data.categoryId.id,
                          }
                        : "",
                    priceMin: data.priceMin ? convertNumber(data.priceMin) : "",
                    priceMax: data.priceMax ? convertNumber(data.priceMax) : "",
                    tank: data.tank ? data.tank : "",
                    description: data.description ? data.description : "",
                    colors: data.colors.length > 0 ? data.colors : [],
                };

                break;
            case "carFormData":
                values = {
                    priceMax: data.priceMax,
                    priceMin: data.priceMin,
                    name: data.name,
                    number: data.number,
                    colors: data.colors,
                    tank: data.tank,
                    thumbnail: data.image.length && {
                        size: data.image[0].size,
                        originalname: data.image[0].name,
                        mimetype: data.image[0].type,
                        path: data.path,
                    },

                    description: data.description,
                    categoryId: data.category.id,
                };

                break;

            case "rateData": {
                values = {
                    name: data.tariff,
                    unit: data.unit,
                    price: data.tariffPrice,
                };
                break;
            }

            default:
                break;
        }
        return values;
    };
    return mapObject;
};

export default useMapper;
