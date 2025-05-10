import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>Conalyze</div>
            <ul style={styles.menu}>
                <li><Link to="/" style={styles.link}>홈</Link></li>
                <li><Link to="/upload" style={styles.link}>계약서 업로드</Link></li>
            </ul>
        </nav>
    );
}
const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        backgroundColor: "#38bdf8", // sky-400
        color: "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 999,
    },
    logo: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    menu: {
        listStyle: "none",
        display: "flex",
        gap: "24px",
        margin: 0,
        padding: 0,
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: 500,
    },
};
