import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import Header from "../../Common/Header/Header.jsx";
import NavBar from "../../Common/NavBar/NavBar.jsx";
import LocationStep from "../LocationStep/LocationStep.jsx";
import ModelStep from "../ModelStep/ModelStep.jsx";
import ExtraStep from "../ExtraStep/ExtraStep.jsx";
import TotalStep from "../TotalStep/TotalStep.jsx";

import { navButtonsForm } from "../../Common/NavBar/NavButtons.jsx";
import styles from "./Content.module.scss";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";

const Content = ({ toggle }) => {
    const orderId = useSelector((state) => state.api.order.data.id);
    const match = useRouteMatch();
    return (
        <div className={styles.content}>
            <div className={styles.topContainer}>
                <Header toggle={toggle} />
                <NavBar data={navButtonsForm} type="form" />
            </div>
            <div className={styles.formBox}>
                <Route exact path={`${match.url}`} component={LocationStep} />
                <Route path={`${match.url}/model`} component={ModelStep} />
                <Route path={`${match.url}/extra`} component={ExtraStep} />
                <Route path={`${match.url}/total`} component={TotalStep} />
                <Route path={`${match.url}/:orderId`} />
                <FormSubmit />
            </div>
        </div>
    );
};

export default Content;
