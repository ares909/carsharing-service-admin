import * as yup from "yup";

const pointValidationSchema = yup.object().shape({
    pointAddress: yup
        .string()
        .required("Поле не должно быть пустым")
        .when("$points", (points, schema) => {
            return schema.test(
                "pointAddress",
                "Данный адрес уже существует",
                (value) => value && !points.data.map((item) => item.address).includes(value),
            );
        }),

    pointName: yup.string().required("Поле не должно быть пустым"),
});

export default pointValidationSchema;
