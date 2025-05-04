import React from "react";

export default function LoadingOverlay({ message = "분석 중..." }) {
    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    };

    const spinnerStyle = {
        width: 32,
        height: 32,
        border: "4px solid #cbd5e1",
        borderTop: "4px solid #0057b7",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    };

    const textStyle = {
        marginTop: 8,
        fontSize: 14,
        color: "#4b5563",
    };

    return (
        <div style={overlayStyle}>
            <div style={spinnerStyle} />
            <p style={textStyle}>{message}</p>
        </div>
    );
}
