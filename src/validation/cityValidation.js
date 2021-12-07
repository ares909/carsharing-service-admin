import * as yup from "yup";

const cityValidationSchema = yup.object().shape({
    сityName: yup
        .string()
        .required("Поле не должно быть пустым")
        .when("$cities", (cities, schema) => {
            return schema.test(
                "сityName",
                "Данный город уже существует",
                (value) => value && !cities.data.map((item) => item.name).includes(value),
            );
        }),
});

export default cityValidationSchema;
