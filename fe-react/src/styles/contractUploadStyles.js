
const styles = {
    container: {
        fontFamily: "Pretendard, sans-serif",
        backgroundColor: "#f5f6fa",
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
        background: "white",
        border: "2px dashed #cbd5e1",
        borderRadius: 12,
        width: 400,
        height: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    uploadText: {
        color: "#6b7280",
        fontSize: 16,
    },
    fileIcon: { fontSize: 40, marginBottom: 8 },
    fileName: { fontSize: 14, color: "#374151", textAlign: "center" },
    button: {
        marginTop: 24,
        backgroundColor: "#0057b7",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: 8,
        fontSize: 16,
        cursor: "pointer",
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



};

export default styles;
