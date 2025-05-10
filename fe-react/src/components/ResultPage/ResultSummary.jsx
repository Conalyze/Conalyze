import React from "react";

export default function ResultSummary({ isViolated }) {
    const style = isViolated ? styles.alertBoxRed : styles.alertBoxGreen;
    return (
        <div style={style}>
            {isViolated
                ? "⚠️ 위반 항목이 발견되었습니다. 아래 내용을 확인해주세요."
                : "✅ 위반 없이 적절한 계약서입니다."}
        </div>
    );
}

const styles = {
    alertBoxRed: {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        padding: "14px 18px",
        borderLeft: "6px solid #f87171",
        borderRadius: "6px",
        fontWeight: 600,
        fontSize: 15,
        marginBottom: 32,
    },
    alertBoxGreen: {
        backgroundColor: "#dcfce7",
        color: "#15803d",
        padding: "14px 18px",
        borderLeft: "6px solid #4ade80",
        borderRadius: "6px",
        fontWeight: 600,
        fontSize: 15,
        marginBottom: 32,
    },
};
