import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
    username: yup
        .string()
        .required("Поле не должно быть пустым")
        .matches(/[a-zA-Z]/, "Логин должен использовать латинские буквы."),

    password: yup
        .string()
        .required("Поле не должно быть пустым")
        .min(8, "Пароль должен содержать не менее 8 символов.")
        .matches(/[a-zA-Z]/, "Пароль должен использовать латинские буквы."),
});

export default loginValidationSchema;
