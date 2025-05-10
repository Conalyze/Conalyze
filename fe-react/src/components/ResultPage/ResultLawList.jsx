import React from "react";
import LawSection from "./LawSection";

export default function ResultLawList({ laws }) {
    return (
        <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 20, marginBottom: 20, fontWeight: 600 }}>법령 분석 결과</h2>
            {laws.map((law, index) => (
                <LawSection key={index} law={law} />
            ))}
        </section>
    );
}
