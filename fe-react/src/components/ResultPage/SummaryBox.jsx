import React from "react";

export default function SummaryBox({ summary, isViolated }) {
    const boxStyle = {
        display: "flex",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 32,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.04)",
        color: "#1e293b",
    };

    const leftStyle = {
        backgroundColor: isViolated ? "#dbeafe" : "#fee2e2",
        width: "100%",
        padding: 20,
        fontSize: 15,
    };

    return (
        <div style={boxStyle}>
            <div style={leftStyle}>{summary}</div>
        </div>
    );
}
