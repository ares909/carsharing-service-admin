import * as yup from "yup";
import { supprotedFormats } from "../constants/constants";

const carCardValidationSchema = yup.object().shape({
    name: yup.string().required("Поле не должно быть пустым"),
    number: yup.string().required("Поле не должно быть пустым"),
    category: yup.object().nullable().required("Поле не должно быть пустым"),
    priceMin: yup.number().typeError("Пожалуйста введите число").required("Поле не должно быть пустым"),
    priceMax: yup
        .number()
        .typeError("Пожалуйста введите число")
        .required("Поле не должно быть пустым")
        // eslint-disable-next-line consistent-return
        .when("priceMin", (priceMin) => {
            if (priceMin) {
                return yup.number().min(priceMin, "Цена должна быть выше минимальной");
            }
        }),
    description: yup.string().required("Поле не должно быть пустым"),
    tank: yup.string().required("Поле не должно быть пустым"),
    image: yup
        .mixed()
        .required("Поле не должно быть пустым")
        .test("image", "Недопустимый формат файла", (value) => value[0] && supprotedFormats.includes(value[0].type)),
});

export default carCardValidationSchema;
