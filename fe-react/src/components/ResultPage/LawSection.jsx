import React, { useState } from "react";

export default function LawSection({ law }) {
    const [open, setOpen] = useState(false);
    const isViolated = law.위반여부 === "예";

    const boxStyle = {
        border: `2px solid ${isViolated ? "#fca5a5" : "#bbf7d0"}`,
        borderRadius: 10,
        padding: "14px 18px",
        marginBottom: 14,
        cursor: "pointer",
        backgroundColor: "white",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        fontWeight: 600,
        fontSize: 16,
    };

    const detailStyle = {
        marginTop: 10,
        display: open ? "block" : "none",
        fontSize: 14,
        color: "#374151",
        lineHeight: 1.7,
    };

    return (
        <div style={boxStyle} onClick={() => setOpen(!open)}>
            <div style={headerStyle}>
                <span>{law.법령명} {law.관련법조항}</span>
                <span>{open ? "▲" : "▼"}</span>
            </div>
            <div style={detailStyle}>
                <p><strong>조문내용:</strong> {law.조문내용}</p>
                {law.위반사항및법적해석 && <p><strong>위반사항 및 해석:</strong> {law.위반사항및법적해석}</p>}
                <p><strong>상세분석:</strong> {law.상세분석}</p>
            </div>
        </div>
    );
}

