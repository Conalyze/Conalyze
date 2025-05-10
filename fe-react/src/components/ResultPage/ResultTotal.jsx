import React from "react";

export default function ResultTotal({ summary }) {
    const boxStyle = {
        backgroundColor: "#f1f5f9",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "16px 20px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        color: "#1f2937",
        fontSize: 14,
        lineHeight: 1.7,
        marginBottom: 40,
    };

    return (
        <section>
            <h2 style={{ fontSize: 20, marginBottom: 20, fontWeight: 600 }}>총평</h2>
            <div style={boxStyle}>{summary}</div>
        </section>
    );
}
