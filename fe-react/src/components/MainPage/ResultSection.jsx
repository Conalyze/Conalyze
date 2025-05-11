export default function ResultSection() {
    return (
        <section className="section flex-row reverse">
            <div className="text">
                <h2>한눈에 보기 쉬운 분석 결과</h2>
                <p>
                    분석 결과는 위반 여부를 색상과 아이콘으로 즉시 표시하며,<br />
                    관련 법령과 위반 조항 설명을 함께 제공합니다.
                </p>
            </div>
            <div className="image">
                <img src="/images/result-example.png" alt="결과 화면 예시" />
            </div>
        </section>
    );
}
