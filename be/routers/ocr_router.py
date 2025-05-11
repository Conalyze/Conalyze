from fastapi import APIRouter, UploadFile, File
import os
from services.ocr_service import naver_ocr

router = APIRouter()

@router.post("/ocr")
async def ocr_image(file: UploadFile = File(...)):
    try:
        upload_folder = "uploads"
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, file.filename)

        # 파일 저장
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)

        # OCR 수행
        result = naver_ocr(file_path)

        # 결과 텍스트 저장
        result_txt_path = f"{file_path}_ocr.txt"
        with open(result_txt_path, "w", encoding="utf-8") as f:
            f.write(result["text"])

        return {
            "filename": file.filename,
            "ocr_result_path": result_txt_path,
            "text": result["text"],
            "raw": result["raw"]
        }

    except Exception as e:
        return {
            "error": str(e),
            "type": type(e).__name__
        }
