import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch, Switch, useParams } from "react-router-dom";
import classNames from "classnames";
import Header from "../../Common/Header/Header.jsx";
import NavBar from "../../Common/NavBar/NavBar.jsx";
import LocationStep from "../LocationStep/LocationStep.jsx";
import ModelStep from "../ModelStep/ModelStep.jsx";
import ExtraStep from "../ExtraStep/ExtraStep.jsx";
import TotalStep from "../TotalStep/TotalStep.jsx";
import Order from "../Order/Order.jsx";
import Button from "../../Common/UI/Button.jsx";
import { navButtonsForm } from "../../Common/NavBar/NavButtons.jsx";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import useModal from "../../../hooks/useModal";
import styles from "./Content.module.scss";

const Content = ({ toggle }) => {
    const validationState = useSelector((state) => state.validation);
    const [isFormOpened, openForm] = useModal();
    const handleModalClick = () => {
        if (!isFormOpened) openForm();
    };
    const modalButtonClassName = classNames({
        [`${styles.modalButton}`]: true,
        [`${styles.modalButtonDisabled}`]: !validationState.locationValid && !validationState.totalValid,
    });

    const wrapperClassName = classNames({
        [`${styles.formWrapper}`]: true,
        [`${styles.formWrapperActive}`]: isFormOpened,
    });

    const match = useRouteMatch();
    return (
        <div className={styles.content}>
            <div className={styles.topContainer}>
                <Header toggle={toggle} />
                <NavBar data={navButtonsForm} type="form" />
            </div>

            <div className={styles.formBox}>
                <Switch>
                    <Route exact path={`${match.url}`} component={LocationStep} />
                    <Route path={`${match.url}/model`} component={ModelStep} />
                    <Route path={`${match.url}/extra`} component={ExtraStep} />
                    <Route path={`${match.url}/total`} component={TotalStep} />
                    <Route path={`${match.url}/confirmed/:orderId?`} component={Order} />
                </Switch>
                <div className={wrapperClassName}>
                    <FormSubmit isFormOpened={isFormOpened} openForm={openForm} />
                </div>
                <Button
                    name="Ваши параметры"
                    type="button"
                    className={modalButtonClassName}
                    onClick={handleModalClick}
                />
            </div>
        </div>
    );
};

export default Content;
