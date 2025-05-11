export default function UploadSection() {
    return (
        <section className="section flex-row upload-row">
            <div className="text">
                <h2>클릭 한 번으로 간편한 업로드</h2>
                <p>
                    이미지나 PDF 형식의 근로계약서를 업로드하면<br />
                    별도의 양식 없이도 AI가 자동으로 분석을 시작합니다.
                </p>
            </div>
            <div className="image">
                <img src="/images/upload-example.png" alt="업로드 화면 예시" />
            </div>
        </section>
    );
}
