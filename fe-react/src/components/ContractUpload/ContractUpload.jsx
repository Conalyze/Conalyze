import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동용
import styles from "../../styles/contractUploadStyles";
import LoadingOverlay from "../LoadingOverlay";

export default function ContractUpload() {
    const fileInputRef = useRef(null);
    const dropZoneRef = useRef(null);
    const navigate = useNavigate(); // ✅ useNavigate 훅

    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileChange = (e) => {
        const file = e.dataTransfer?.files?.[0] || e.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file:", file.name);
        }
    };

    const isInsideDropZone = (e) => {
        const box = dropZoneRef.current.getBoundingClientRect();
        return (
            e.clientX >= box.left &&
            e.clientX <= box.right &&
            e.clientY >= box.top &&
            e.clientY <= box.bottom
        );
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await fetch("http://211.188.59.152:8000/ocr/file", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                console.log("✅ 분석 결과 수신:", data);

                if (data.success) {
                    // ✅ 결과 페이지로 이동 + 데이터 전달
                    navigate("/result", { state: data.ai_result });
                } else {
                    // ❌ 분석 실패 → 경고창 띄우기
                    alert("❌ 분석에 실패했습니다: " + (data.error || "알 수 없는 오류"));
                }
            } else {
                console.error("❌ 업로드 실패");
                alert("서버 오류로 업로드에 실패했습니다.");
            }

        } catch (err) {
            console.error("🚨 에러 발생:", err);
        } finally {
            alert("서버 오류로 업로드에 실패했습니다.");
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.pageWrapper}>
            {isLoading && <LoadingOverlay message="분석 중..." />}

            <div style={isLoading ? styles.blurredContent : {}}>
                <h1 style={styles.title}>근로계약서 업로드</h1>

                <div
                    ref={dropZoneRef}
                    style={isDragOver ? styles.uploadBoxDragOver : styles.uploadBox}
                    onClick={handleUploadClick}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={(e) => {
                        if (!isInsideDropZone(e)) setIsDragOver(false);
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOver(false);
                        handleFileChange(e);
                    }}
                >
                    {isDragOver ? (
                        <>
                            <div style={styles.fileIcon}>📂</div>
                            <p style={styles.fileName}>파일을 여기에 놓아주세요</p>
                        </>
                    ) : selectedFile ? (
                        <>
                            <div style={styles.fileIcon}>📄</div>
                            <p style={styles.fileName}>{selectedFile.name}</p>
                        </>
                    ) : (
                        <p style={styles.uploadText}>PDF 또는 이미지 파일을 업로드하세요</p>
                    )}

                    <input
                        type="file"
                        accept=".pdf,image/png,image/jpeg,image/jpg"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                <p style={styles.disclaimer}>
                    ※ 본 서비스는 AI를 활용한 자동 분석 도구이며, 법적 효력이나 구속력을 가지는 법률 자문이 아닙니다.<br />
                    정확한 법적 판단이 필요한 경우 노동청 또는 법률 전문가와 상담하시기 바랍니다.
                </p>

                <button style={styles.button} onClick={handleSubmit}>
                    분석 시작
                </button>
            </div>
        </div>
    );
}
