import React from "react";

export default function NoticeBox({ notices }) {
    const boxStyle = {
        backgroundColor: "#fef9c3",
        border: "1px solid #facc15",
        borderRadius: 8,
        padding: "16px 20px",
        marginTop: 32,
        marginBottom: 40,
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
    };

    const listStyle = {
        margin: 0,
        paddingLeft: "1.2em",
    };

    const itemStyle = {
        marginBottom: 8,
        fontSize: 15,
        color: "#444",
    };

    return (
        <div style={boxStyle}>
            <ul style={listStyle}>
                {notices.map((notice, idx) => (
                    <li key={idx} style={itemStyle}>💡 {notice}</li>
                ))}
            </ul>
        </div>
    );
}
