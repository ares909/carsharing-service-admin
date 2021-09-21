import React from "react";
import Router from "../../routes/Router.jsx";
import styles from "./App.module.scss";

const App = () => (
    <div className={styles.app}>
        <Router />
    </div>
);

export default App;
