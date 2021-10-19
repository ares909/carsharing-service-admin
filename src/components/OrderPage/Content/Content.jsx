import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Header from "../../Common/Header/Header.jsx";
import NavBar from "../../Common/NavBar/NavBar.jsx";
import LocationStep from "../LocationStep/LocationStep.jsx";
import ModelStep from "../ModelStep/ModelStep.jsx";
import AdditionalStep from "../AdditionalStep/AdditionalStep.jsx";
import TotalStep from "../TotalStep/TotalStep.jsx";

import { navButtonsForm } from "../../Common/NavBar/NavButtons.jsx";
import styles from "./Content.module.scss";

const Content = ({ toggle }) => {
    const match = useRouteMatch();
    return (
        <div className={styles.content}>
            <Header toggle={toggle} />
            <NavBar data={navButtonsForm} type="form" />
            <Route exact path={`${match.url}`} component={LocationStep} />
            <Route path={`${match.url}/model`} component={ModelStep} />
            <Route path={`${match.url}/extra`} component={AdditionalStep} />
            <Route path={`${match.url}/total`} component={TotalStep} />
            <Route path={`${match.url}/:orderId`} />
        </div>
    );
};

export default Content;
