import React from "react";
import SummaryBox from "./SummaryBox";
import LawSection from "./LawSection";
import NoticeBox from "./NoticeBox";

export default function AnalysisResultPage({ data }) {
    const { 총평, 법령분석, 기타유의사항, 위반여부 } = data;

    return (
        <div style={styles.container}>
            <section style={styles.section}>
                <h2 style={styles.heading}>총평</h2>
                <SummaryBox summary={총평} isViolated={위반여부 !== "예"} />
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
