import React, { useRef, useState } from "react";
import styles from "../../styles/contractUploadStyles";
import LoadingOverlay from "../LoadingOverlay";

export default function ContractUpload() {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
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
                <div style={styles.uploadBox} onClick={handleUploadClick}>
                    {selectedFile ? (
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
                <button style={styles.button} onClick={handleSubmit}>
                    분석 시작
                </button>
            </div>
        </div>
    );
}
