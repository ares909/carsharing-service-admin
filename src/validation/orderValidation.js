import * as yup from "yup";

const orderValidationSchema = yup.object().shape({
    city: yup.object().nullable().required("Поле не должно быть пустым"),
    address: yup.object().nullable().required("Поле не должно быть пустым"),
    car: yup.object().nullable().required("Поле не должно быть пустым"),
    color: yup.object().nullable().required("Поле не должно быть пустым"),
    rate: yup.object().nullable().required("Поле не должно быть пустым"),
    status: yup.object().nullable().required("Поле не должно быть пустым"),
    price: yup.object().nullable().required("Поле не должно быть пустым"),
});

export default orderValidationSchema;
