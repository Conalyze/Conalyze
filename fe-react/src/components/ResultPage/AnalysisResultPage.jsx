import React from "react";
import ResultSummary from "./ResultSummary";
import ResultTotal from "./ResultTotal";
import ResultLawList from "./ResultLawList";
import ResultNoticeBox from "./ResultNoticeBox";

export default function AnalysisResultPage({ data }) {
    const { 총평, 법령분석, 기타유의사항, 위반여부 } = data;

    return (
        <div style={styles.container}>
            <ResultSummary isViolated={위반여부 === "예"} />

            <ResultTotal summary={총평} />

            <hr style={styles.divider} />

            <ResultLawList laws={법령분석} />

            {기타유의사항?.length > 0 && (
                <>
                    <hr style={styles.divider} />
                    <ResultNoticeBox notices={기타유의사항} />
                </>
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
    divider: {
        marginTop: 32,
        marginBottom: 16,
        border: 0,
        borderTop: "1px solid #e5e7eb",
    },
};
