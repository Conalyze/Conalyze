import React, { useRef, useState } from "react";
import styles from "../../styles/contractUploadStyles";
import LoadingOverlay from "../LoadingOverlay";

export default function ContractUpload() {
    const fileInputRef = useRef(null);
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

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await fetch("/upload", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                console.log("업로드 성공");
            } else {
                console.error("업로드 실패");
            }
        } catch (err) {
            console.error("에러 발생:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.pageWrapper}>
            {isLoading && <LoadingOverlay message="분석 중..." />}

            <div style={isLoading ? styles.blurredContent : {}}>
                <h1 style={styles.title}>근로계약서 업로드</h1>

                <div
                    style={isDragOver ? styles.uploadBoxDragOver : styles.uploadBox}
                    onClick={handleUploadClick}
                    onDragEnter={(e) => {
                        if (e.target === e.currentTarget) setIsDragOver(true);
                    }}
                    onDragLeave={(e) => {
                        if (e.target === e.currentTarget) setIsDragOver(false);
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOver(false);
                        handleFileChange(e);
                    }}
                    onDragOver={(e) => e.preventDefault()}
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
