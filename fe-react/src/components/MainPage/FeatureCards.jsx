import React from "react";

export default function FeatureCards() {
    return (
        <section className="card-section">
            <div className="card">
                <div className="icon">📄</div>
                <h3>계약서 분석</h3>
                <p>불법 조항을 AI가 자동으로 탐지합니다</p>
            </div>
            <div className="card">
                <div className="icon">📊</div>
                <h3>분석 리포트</h3>
                <p>위반 여부와 개선 사항을 요약해드립니다</p>
            </div>
        </section>
    );
}
