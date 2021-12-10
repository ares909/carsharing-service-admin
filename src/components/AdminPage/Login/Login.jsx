import React, { useEffect } from "react";
import classNames from "classnames";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Common/UI/Input/Input.jsx";
import Button from "../../Common/UI/Button.jsx";
import loginValidationSchema from "../../../validation/loginValidation";
import { resetAuthState } from "../../../store/slices/authSlice";
import { handleAuth, handleRegister, handleRefresh } from "../../../store/actions/authActions";
import { authState } from "../../../store/selectors/selectors";
import logo from "../../../images/admin/adminLogo.svg";
import styles from "./Login.module.scss";

const Login = () => {
    const dispatch = useDispatch();
    const refreshToken = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : undefined;
    const { push } = useHistory();
    const { status, error, user } = useSelector(authState);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(loginValidationSchema),
        mode: "onSubmit",
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
            push("/admin/orderlist");
        } else if (status === "idle" && refreshToken && !error) {
            push("/admin/orderlist");
        }
    }, [status, refreshToken, error]);

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
                            label="Логин"
                            type="text"
                            register={register}
                            errors={errors}
                            isValid={isValid}
                            onFocus={(e) => dispatch(resetAuthState())}
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
                            onFocus={(e) => dispatch(resetAuthState())}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button
                            name="Запросить доступ"
                            className={styles.registerButton}
                            type="button"
                            // disabled={!isValid}
                            onClick={handleSubmit(handleRegisterUser)}
                        />
                        <Button
                            name="Войти"
                            className={styles.loginButton}
                            type="submit"
                            // disabled={!isValid}
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
