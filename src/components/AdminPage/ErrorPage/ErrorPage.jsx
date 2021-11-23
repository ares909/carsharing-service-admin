import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { apiData } from "../../../store/selectors/selectors";
import { resetOrder, resetError, apiAction } from "../../../store/slices/apiSlice";
import styles from "./ErrorPage.module.scss";
import Button from "../../Common/UI/Button.jsx";

const ErrorPage = () => {
    const { error } = useSelector(apiData);
    const [errorStatus, setErrorStatus] = useState({ code: "", message: "", title: "" });
    const dispatch = useDispatch();

    const location = useLocation();
    const { goBack } = useHistory();

    const handleClick = () => {
        dispatch(resetError());
        goBack();
    };

    useEffect(() => {
        if (error !== "") {
            switch (error) {
                case "Network Error":
                    setErrorStatus({
                        code: 502,
                        message: "Произошла ошибка при получении данных с сервера. Попробуйте перезагрузить страницу",
                        title: "Что-то пошло не так :(",
                    });
                    break;

                case "Unauthorized":
                    setErrorStatus({
                        code: 401,
                        message: "Ошибка при авторизации пользователя",
                        title: "Что-то пошло не так :(",
                    });
                    break;
                case "Request failed with status code 401":
                    setErrorStatus({
                        code: 401,
                        message: "Ошибка при авторизации пользователя",
                        title: "Что-то пошло не так :(",
                    });
                    break;
                case "Request failed with status code 404":
                    setErrorStatus({
                        code: 404,
                        message: "Указанный путь не найден на сервере",
                        title: "Что-то пошло не так :(",
                    });
                    break;

                case "Cannot read property 'table' of undefined":
                    setErrorStatus({
                        code: 500,
                        message: "Указанаая база данных не найдена на сервере",
                        title: "Что-то пошло не так :(",
                    });
                    break;
                default:
                    setErrorStatus({ code: 404, message: "Страница не найдена", title: "Что-то пошло не так :(" });
            }
        } else {
            setErrorStatus({ code: 404, message: "Страница не найдена", title: "Что-то пошло не так :(" });
        }
    }, [error]);

    return (
        errorStatus.code && (
            <section className={styles.errorPage}>
                <div className={styles.errorContainer}>
                    <div className={styles.errorMessageContainer}>
                        <h2 className={styles.code}>{errorStatus.code}</h2>
                        <h1 className={styles.title}>{errorStatus.title}</h1>
                        <p className={styles.message}>{errorStatus.message}</p>
                    </div>
                    <Button name="Назад" onClick={handleClick} className={styles.button} />
                </div>
            </section>
        )
    );
};

export default ErrorPage;
