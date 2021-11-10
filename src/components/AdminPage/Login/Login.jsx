import React, { useEffect } from "react";
import classNames from "classnames";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { handleAuth, handleRegister, resetAuthState, handleRefresh } from "../../../store/slices/authSlice";
import { authState } from "../../../store/selectors/selectors";
import Input from "../../Common/UI/Input/Input.jsx";
import Button from "../../Common/UI/Button.jsx";
import logo from "../../../images/admin/adminLogo.svg";
import styles from "./Login.module.scss";

const Login = () => {
    const dispatch = useDispatch();
    const refreshToken = JSON.parse(localStorage.getItem("token"));
    const { push } = useHistory();
    const { status, error, user } = useSelector(authState);

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .matches(/[a-zA-Z]/, "Логин должен использовать латинские буквы.")
            .required("Поле не должно быть пустым"),
        password: yup
            .string()
            .required("Поле не должно быть пустым")
            .min(8, "Пароль должен содержать не менее 8 символов.")
            .matches(/[a-zA-Z]/, "Пароль должен использовать латинские буквы."),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    const handleLogin = (data) => {
        dispatch(handleAuth(data));
        reset();
    };

    const handleRegisterUser = (data) => {
        dispatch(handleRegister(data));
        reset();
    };

    useEffect(() => {
        if (status === "authorized" && refreshToken) {
            push("./admin/orderlist");
        } else if (status === "idle" && refreshToken && !error) {
            dispatch(handleRefresh(refreshToken));
            push("./admin/orderlist");
        }
    }, [status, refreshToken]);

    // useEffect(() => {
    //     push("./admin/orderlist");
    // }, []);

    const loginButtonClass = classNames({
        [styles.loginButton]: true,
        [styles.loginButtonDisabled]: !isValid,
    });

    const registerButtonClass = classNames({
        [styles.registerButton]: true,
        [styles.registerButtonDisabled]: !isValid,
    });

    return (
        <section className={styles.login}>
            <div className={styles.loginFormContainer}>
                <div className={styles.loginHeader}>
                    <div className={styles.logoBox}>
                        <img className={styles.logoImage} src={logo} />
                    </div>
                    <h2 className={styles.logoTitle}>Need for drive</h2>
                </div>
                <form className={styles.loginForm}>
                    <h3 className={styles.loginFormHeader}>Вход</h3>
                    <div className={styles.inputsBox}>
                        <Input
                            name="username"
                            id="username"
                            placeholder="Введите логин"
                            label="Почта"
                            type="text"
                            register={register}
                            errors={errors}
                            isValid={isValid}
                        />

                        <Input
                            name="password"
                            id="password"
                            placeholder="Введите пароль"
                            label="Пароль"
                            type="password"
                            register={register}
                            errors={errors}
                            isValid={isValid}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button
                            name="Запросить доступ"
                            className={registerButtonClass}
                            type="submit"
                            disabled={!isValid}
                            onClick={handleSubmit(handleRegisterUser)}
                        />
                        <Button
                            name="Войти"
                            className={loginButtonClass}
                            type="submit"
                            disabled={!isValid}
                            onClick={handleSubmit(handleLogin)}
                        />
                    </div>
                    {error && <span className={styles.apiErrorMessage}>Неправильный логин или пароль</span>}
                    {user.id && <span className={styles.successMessage}>Запрос на регистрацию принят</span>}
                </form>
            </div>
        </section>
    );
};

export default Login;
