import * as yup from "yup";

const rateValidationSchema = yup.object().shape({
    tariff: yup
        .string()
        .required("Поле не должно быть пустым")
        .when("$rates", (rates, schema) => {
            return schema.test(
                "tariff",
                "Данный тариф уже существует",
                (value) => value && !rates.data.map((item) => item.rateTypeId.name).includes(value),
            );
        }),

    unit: yup.string().required("Поле не должно быть пустым"),
    tariffPrice: yup.number().required("Поле не должно быть пустым").typeError("Пожалуйста, введите число"),
});

export default rateValidationSchema;
