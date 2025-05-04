from fastapi import APIRouter, UploadFile, File
import os
import shutil
router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1].lower()

    if ext != ".pdf":
        return {
            "success": False,
            "message": "Not found."
        }

    file_path = os.path.join(UPLOAD_DIR, file.filename) #파일 저장
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "success": True,
        "filename": file.filename,
        "message": "success"
    }
