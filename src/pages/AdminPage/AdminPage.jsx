import React from "react";
import AdminContent from "../../components/AdminPage/AdminContent/AdminContent.jsx";
import styles from "./AdminPage.module.scss";

const AdminPage = () => {
    return (
        <section className={styles.adminPage}>
            <AdminContent />
        </section>
    );
};

export default AdminPage;
