const styles = {
    container: {
        fontFamily: "Pretendard, sans-serif",
        backgroundColor: "#f5fafe",
        margin: 0,
        paddingTop: "20px",
        paddingBottom: "0px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    title: {
        color: "#1f2937",
        marginBottom: 16,
    },

    uploadBox: {
        background: "#ffffff",
        border: "2px dashed #bae6fd",
        borderRadius: 12,
        width: 400,
        height: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },

    uploadBoxDragOver: {
        background: "#e0f2fe",
        border: "2px solid #38bdf8",
        boxShadow: "inset 0 0 10px rgba(56, 189, 248, 0.3)",
        width: 400,
        height: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
    },

    uploadText: {
        color: "#6b7280",
        fontSize: 16,
    },

    fileIcon: {
        fontSize: 40,
        marginBottom: 8,
    },

    fileName: {
        fontSize: 14,
        color: "#374151",
        textAlign: "center",
    },

    button: {
        marginTop: 24,
        backgroundColor: "#38bdf8",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 500,
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        transition: "background 0.2s ease",
    },

    pageWrapper: {
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px",
    },

    blurredContent: {
        filter: "blur(2px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    disclaimer: {
        marginTop: 40,
        fontSize: 12,
        color: "#6b7280",
        lineHeight: 1.5,
        textAlign: "center",
    },
};

export default styles;
