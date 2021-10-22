import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { formAction } from "../../../../store/slices/formSlice";
import useDateFormat from "../../../../hooks/useDateFormat";
import "react-datepicker/src/stylesheets/datepicker.scss";
import "./DatePickerClass.scss";
import styles from "./DatePickerInput.module.scss";

const DatePickerInput = () => {
    const dispatch = useDispatch();
    const isFullTank = useSelector((state) => state.form.isFullTank);
    const isNeedChildChair = useSelector((state) => state.form.isNeedChildChair);
    const isRightWheel = useSelector((state) => state.form.isRightWheel);
    const formLength = useSelector((state) => state.form.formLength);
    registerLocale("ru", ru);
    const [startDate, setStartDate] = useState(formLength.start);
    const [endDate, setEndDate] = useState(formLength.end);
    const datePickerClassName = classNames({
        [`react-datepicker`]: true,
        [`react-datepicker_disabled`]: !startDate,
    });

    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours] = useDateFormat();

    useEffect(() => {
        if (startDate && endDate) {
            const start = convertDateToSeconds(startDate);
            const end = convertDateToSeconds(endDate);
            dispatch(
                formAction({
                    formLength: {
                        timeSec: end - start,
                        timeDate: secondsToDhms(end - start),
                        hours: secondsToHours(end - start),
                        minutes: secondsToMinutes(end - start),
                        start: startDate,
                        end: endDate,
                    },
                }),
            );
        }
    }, [startDate, endDate]);

    const filterPassedTime = (time) => {
        const currentDate = startDate;
        const selectedDate = new Date(time);

        return currentDate < selectedDate.getTime();
    };

    const filterPrevTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const resetDate = (e) => {
        if (e.target.name === "start") {
            setStartDate("");
            setEndDate("");
            dispatch(formAction({ formLength: "" }));
            dispatch(formAction({ price: "" }));
            dispatch(
                formAction({
                    isFullTank: {
                        value: "false",
                        name: isFullTank.name,
                        id: isFullTank.id,
                        price: isFullTank.price,
                        form: "Нет",
                    },
                }),
            );
            dispatch(
                formAction({
                    isNeedChildChair: {
                        value: "false",
                        name: isNeedChildChair.name,
                        id: isNeedChildChair.id,
                        price: isNeedChildChair.price,
                        form: "Нет",
                    },
                }),
            );
            dispatch(
                formAction({
                    isRightWheel: {
                        value: "false",
                        name: isRightWheel.name,
                        id: isRightWheel.id,
                        price: isRightWheel.price,
                        form: "Нет",
                    },
                }),
            );
        } else {
            setEndDate("");
            dispatch(formAction({ formLength: "" }));
            dispatch(formAction({ price: "" }));
            dispatch(
                formAction({
                    isFullTank: {
                        value: "false",
                        name: isFullTank.name,
                        id: isFullTank.id,
                        price: isFullTank.price,
                        form: "Нет",
                    },
                }),
            );
            dispatch(
                formAction({
                    isNeedChildChair: {
                        value: "false",
                        name: isNeedChildChair.name,
                        id: isNeedChildChair.id,
                        price: isNeedChildChair.price,
                        form: "Нет",
                    },
                }),
            );
            dispatch(
                formAction({
                    isRightWheel: {
                        value: "false",
                        name: isRightWheel.name,
                        id: isRightWheel.id,
                        price: isRightWheel.price,
                        form: "Нет",
                    },
                }),
            );
        }
    };

    return (
        <div>
            <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>C</label>

                <DatePicker
                    locale="ru"
                    className="react-datepicker"
                    selected={startDate}
                    startDate={new Date()}
                    endDate={endDate}
                    minDate={new Date()}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    selectsStart
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Время"
                    dateFormat="dd.MM.yyyy HH:mm"
                    placeholderText={`Введите дату и время`}
                    filterTime={filterPrevTime}
                    showPopperArrow={false}
                    name="start"
                    autoComplete="off"
                />

                <button name="start" onClick={resetDate} className={styles.inputCrossButton} type="button"></button>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>По</label>
                <DatePicker
                    className={datePickerClassName}
                    locale="ru"
                    selected={endDate}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    selectsEnd
                    minDate={startDate}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Время"
                    dateFormat="dd.MM.yyyy HH:mm"
                    placeholderText={`Введите дату и время`}
                    filterTime={filterPassedTime}
                    showPopperArrow={false}
                    name="end"
                    autoComplete="off"
                    disabled={!startDate}
                    style={{ backgroundColor: !startDate ? "#eeeeee" : "white" }}
                />
                <button name="end" type="button" onClick={resetDate} className={styles.inputCrossButton}></button>
            </div>
        </div>
    );
};

export default DatePickerInput;
