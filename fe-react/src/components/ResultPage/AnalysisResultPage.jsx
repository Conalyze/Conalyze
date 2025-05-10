import React from "react";
import SummaryBox from "./SummaryBox";
import LawSection from "./LawSection";
import NoticeBox from "./NoticeBox";

export default function AnalysisResultPage({ data }) {
    const { 총평, 법령분석, 기타유의사항, 위반여부 } = data;
    const isViolated = 위반여부 === "예";

    return (
        <div style={styles.container}>
            {/* ✅ 위반 여부 알림 박스 */}
            <div style={isViolated ? styles.alertBoxRed : styles.alertBoxGreen}>
                {isViolated
                    ? "⚠️ 위반 항목이 발견되었습니다. 아래 내용을 확인해주세요."
                    : "✅ 위반 없이 적절한 계약서입니다."}
            </div>

            <section style={styles.section}>
                <h2 style={styles.heading}>총평</h2>
                <SummaryBox summary={총평} isViolated={!isViolated} />
            </section>

            <hr style={styles.divider} />

            <section style={styles.section}>
                <h2 style={styles.heading}>법령 분석 결과</h2>
                {법령분석.map((law, index) => (
                    <LawSection key={index} law={law} />
                ))}
            </section>

            <hr style={styles.divider} />

            {기타유의사항?.length > 0 && (
                <section style={styles.section}>
                    <h2 style={styles.heading}>기타 유의사항</h2>
                    <NoticeBox notices={기타유의사항} />
                </section>
            )}
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "Pretendard, sans-serif",
        maxWidth: 800,
        margin: "40px auto",
        padding: "0 20px",
        lineHeight: 1.6,
    },

    // ✅ alertBox: 깔끔하게 왼쪽 강조선만 있음
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

    section: {
        marginBottom: 56,
    },
    heading: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 600,
    },
    divider: {
        marginTop: 32,
        marginBottom: 16,
        border: 0,
        borderTop: "1px solid #e5e7eb",
    },
};
